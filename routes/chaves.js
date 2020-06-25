var express = require('express');
var router = express.Router();
var TipoImovel = require('../model/TipoImovel');
var Bairro = require('../model/Bairro');
var Emprestimo = require('../model/Emprestimo');
const Chave = require('../model/Chave');
const { Sequelize } = require('../config/database');
const { render } = require('ejs');


const Op = Sequelize.Op;

router.get('/',(req,res)=>{
    Chave.findAll({
        include:[{
            model: Bairro,
            where: {bairroId: Sequelize.col('bairro.id')}
        },{
            model: TipoImovel,
            where: {tipoimovelId: Sequelize.col('tipoimovel.id')}
        }]
    }).then(chaves =>{
        
        res.render("chaves/index",{chaves: chaves,user: req.session.user});
        
    });
});

router.post('/buscar',(req,res)=>{
    var query = req.body.query;
    console.log(query);
    Chave.findAll({
        where: {endereco: {[Op.like]: "%"+query+"%"}},
        include:[{
            model: Bairro,
            where: {bairroId: Sequelize.col('bairro.id')}
        },{
            model: TipoImovel,
            where: {tipoimovelId: Sequelize.col('tipoimovel.id')}
        }]
    }).then(chaves => {
        res.render("chaves/busca",{chaves: chaves,user: req.session.user});
    });
});


router.get('/new',(req,res)=>{
    TipoImovel.findAll({}).then((tipos)=>{
    Bairro.findAll({}).then((bairros)=>{
            res.render("chaves/new",{title: "Novas",tipos: tipos, bairros: bairros,user: req.session.user}); 
        });
    });
    
    
});

router.post('/salvar_chave',(req,res)=>{
    var endereco = req.body.endereco;
    var tipoimovel = req.body.tipoimovel;
    var bairro = req.body.bairro;
    var chavescomuns = req.body.chavescomuns;
    var chavestetra = req.body.chavestetra;
    var controles = req.body.controles;
    var situacao = 'Disponível';

    Chave.create({
        endereco: endereco, 
        qtdchavescomuns: chavescomuns, 
        qtdchavestetras: chavestetra,
        qtdcontroles: controles,
        situacao: situacao,
        tipoimovelId: tipoimovel,
        bairroId: bairro
    })
    .then(()=>{
       res.redirect("/chaves"); 
    });
});

//Editar chaves

router.get('/edit/:id',(req,res)=>{
    var id = req.params.id;
    Chave.findOne({
        where: {id: id},
        include:[{
            model: Bairro,
            where: {bairroId: Sequelize.col('bairro.id')}
        },{
            model: TipoImovel,
            where: {tipoimovelId: Sequelize.col('tipoimovel.id')}
        }]
    }).then((chave) =>{ 
        TipoImovel.findAll({}).then(tipos =>{
            Bairro.findAll({}).then(bairros =>{
                res.render("chaves/edit",{chave: chave,tipos: tipos, bairros: bairros,user: req.session.user});
            });

        });
    });
});


router.get('/devolver_chave/:id',(req, res)=>{
    var id = req.params.id;
    Emprestimo.update({ devolucao: "Sim", userId: parseInt(req.session.user.id) },
                {where: {chaveId: id}})
                .then((emprestimo) =>{
                    Chave.update({situacao: 'Disponível'},
                        {where: {
                            id: id
                        }}).then(()=>{

                        })
                res.redirect("/chaves");
    });
    
});

router.post('/atualizar/:id',(req, res)=>{
    var id = req.params.id;
    var endereco = req.body.endereco;
    var tipoimovel = req.body.tipoimovel;
    var bairro = req.body.bairro;
    var chavescomuns = req.body.chavescomuns;
    var chavestetra = req.body.chavestetra;
    var controles = req.body.controles;
    Chave.update({
        endereco: endereco, 
        qtdchavescomuns: chavescomuns, 
        qtdchavestetras: chavestetra,
        qtdcontroles: controles,
        tipoimovelId: tipoimovel,
        bairroId: bairro
    }, {where:{id: id}}).then(()=>{
        res.redirect("/chaves");
    });
});

router.get('/delete/:id',(req,res) =>{
    var id = req.params.id;

    Chave.destroy({where: {id: id}}).then(()=>{
        res.redirect('/chaves');
    });
});

module.exports = router;