const express = require('express');
const TipoImovel = require('../model/TipoImovel');
const router = express.Router();


router.get('/tiposimoveis',(req, res)=>{
    TipoImovel.findAll({}).then((tipoimovel)=>{
        res.render("tiposimoveis/index",{tipoimovel: tipoimovel,user: req.session.user});
    });
});
router.get('/tiposimoveis/new',(req, res)=>{
    res.render('tiposimoveis/new',{user: req.session.user});
});
router.post('/salvar',(req,res)=>{
    var descricao = req.body.descricao;
    TipoImovel.create({descricao: descricao}).then(()=>{
        res.redirect("/tiposimoveis");
    });
});

module.exports = router;