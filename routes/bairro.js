const express = require('express');
const router = express.Router();
const Bairro = require('../model/Bairro');


router.get('/bairros',(req, res)=>{
    Bairro.findAll({}).then((bairros)=>{
        res.render("bairros/index",{bairros: bairros,user: req.session.user});
    });

});
router.get('/bairros/new',(req,res)=>{
    res.render("bairros/new",{user: req.session.user});
});
router.post('/salvarbairro',(req,res)=>{
    var descricao = req.body.descricao;
    Bairro.create({descricao: descricao}).then(()=>{
        res.redirect("/bairros");
    });
});

router.get('/bairros/edit/:id',(req,res)=>{
    var id = req.params.id;
    Bairro.findOne({where: {id: id}}).then((bairro)=>{
        res.render("bairros/edit",{bairro: bairro,user: req.session.user});     
    });
});
router.post('/bairros/atualizar/:id',(req,res)=>{
    var id = req.params.id;
    var descricao = req.body.descricao;
    Bairro.update({descricao: descricao},{where: {
        id: id
    }}).then(()=>{
        res.redirect('/bairros');
    });
})

router.get('/bairros/delete/:id',(req,res)=>{
    var id = req.params.id;
    Bairro.destroy({where: {id: id}}).then(()=>{
        res.redirect('/bairros');
    })
});

module.exports = router;
