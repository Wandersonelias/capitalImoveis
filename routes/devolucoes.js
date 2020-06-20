const express = require('express');
const router = express.Router();
const Emprestimo = require('../model/Emprestimo');
const Chave = require('../model/Chave');
const { Sequelize } = require('../config/database');
const Bairro = require('../model/Bairro');


router.get('/devolucoes',(req,res)=>{
    Emprestimo.findAll({
        attributes: [
            'id',
            'tipo',
            'devolucao',
            [Sequelize.fn('date_format', Sequelize.col('emprestimo.createdAt'), '%d/%m/%Y ás %T'), 'createdAt'],
            [Sequelize.fn('date_format', Sequelize.col('emprestimo.updatedAt'), '%d/%m/%Y ás %T'), 'updatedAt']
            
        ],
        include:[{
            model: Chave,
            where: { chaveId: Sequelize.col('chave.id')}
        }],

    }).then(emprestimo => {
        
        res.render("devolucoes/index", {emprestimo: emprestimo, user: req.session.user});
    });
});

module.exports = router;