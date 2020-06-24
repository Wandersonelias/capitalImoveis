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
//Rota edit

router.get('/tiposimoveis/edit/:id',(req,res)=>{
    var id = req.params.id;
    TipoImovel.findOne({where: {id: id}}).then((tipoimovel)=>{
        res.render("tiposimoveis/edit",{tipoimovel: tipoimovel,user: req.session.user});
    });

});
router.post('/tiposimoveis/atualizar/:id',(req,res) => {
    var id = req.params.id;
    var descricao = req.body.descricao;
    TipoImovel.update({descricao: descricao}, {where: {id: id}}).then(()=>{
        res.redirect("/tiposimoveis");
    });
});

router.get('/tiposimoveis/delete/:id',(req,res)=>{
    var id = req.params.id;
    TipoImovel.destroy({where:{
        id: id
    }}).then(()=>{
        res.redirect("/tiposimoveis");
    })
});

module.exports = router;