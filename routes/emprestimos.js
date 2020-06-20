const express = require('express');
const router = express.Router();
const Emprestimo = require('../model/Emprestimo');
const Chave = require('../model/Chave');
const { Sequelize } = require('../config/database');
const Bairro = require('../model/Bairro');
const User = require('../model/User');
const session = require('express-session');


router.get('/emprestimos',(req,res)=>{
    Emprestimo.findAll({
        attributes: [
            'id',
            'tipo',
            'devolucao',
            [Sequelize.fn('date_format', Sequelize.col('emprestimo.createdAt'), '%d/%m/%Y ás %T'), 'createdAt']
        ],
        include:[{
            model: Chave,
            where: { chaveId: Sequelize.col('chave.id')}
        }],

    }).then(emprestimo => {
        
        res.render("emprestimos/index", {emprestimo: emprestimo, user: req.session.user});
    });
    

    /*console.log(req.session.user);
    User.findOne({where: {login: login}}).then(user =>{
        req.session.user = {
            id: user.id,
            login: user.login
        };
        console.log("OK");

    });
    */

});
router.get('/emprestimos/retirar/:id',(req,res)=>{
    var chaveId = req.params.id;
    var tipo = 'Visita';
    var obs = "Em visita";
    var devolucao = 'Não';
    Emprestimo.create(
        { tipo: tipo, obs: obs, devolucao: devolucao, chaveId: chaveId }
        
        ).then(()=>{
            Chave.update(
                    {situacao: 'Indisponível'},
                    {where: {
                        id: chaveId
                    }}
            )},
            res.redirect("/emprestimos"));
});
router.get('/emprestimos/devolver/:id',(req,res)=>{
    var chaveId = req.params.id;
    var tipo = 'Visita';
    var obs = "";
    var devolucao = 'Sim';
    Emprestimo.create(
        { tipo: tipo, obs: obs, devolucao: devolucao,chaveId: chaveId }
        
        ).then(()=>{
            Chave.update(
                    {situacao: 'Disponivel'},
                    {where: {
                        id: chaveId
                    }}
            )},
            res.redirect("/devolucoes"));
});
module.exports = router;