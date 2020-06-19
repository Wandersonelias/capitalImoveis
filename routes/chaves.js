var express = require('express');
var router = express.Router();
var TipoImovel = require('../model/TipoImovel');
var Bairro = require('../model/Bairro');
const Chave = require('../model/Chave');
const { Sequelize } = require('../config/database');
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
        res.render("chaves/index",{chaves: chaves});
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
        res.render("chaves/busca",{chaves: chaves});
    });
});


router.get('/new',(req,res)=>{
    TipoImovel.findAll({}).then((tipos)=>{
    Bairro.findAll({}).then((bairros)=>{
            res.render("chaves/new",{title: "Novas",tipos: tipos, bairros: bairros}); 
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


module.exports = router;