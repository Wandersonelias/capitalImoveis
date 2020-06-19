const express = require('express');
const router = express.Router();
const Bairro = require('../model/Bairro');


router.get('/bairros',(req, res)=>{
    Bairro.findAll({}).then((bairros)=>{
        res.render("bairros/index",{bairros: bairros});
    });

});
router.get('/bairros/new',(req,res)=>{
    res.render("bairros/new");
});
router.post('/salvarbairro',(req,res)=>{
    var descricao = req.body.descricao;
    Bairro.create({descricao: descricao}).then(()=>{
        res.redirect("/bairros");
    });
});



module.exports = router;
