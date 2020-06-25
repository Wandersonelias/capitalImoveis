const express = require('express');
const router = express.Router();
const Chave = require('../model/Chave');
var TipoImovel = require('../model/TipoImovel');
var Bairro = require('../model/Bairro');
const {Sequelize} = require('sequelize');
const pdf = require('html-pdf');
const ejs = require('ejs');
let path = require("path");
const fs = require('fs');
const { on } = require('process');
router.get('/etiquetas',(req, res)=>{

    Chave.findAll({
        
        include:[{
            model: Bairro,
            where: {bairroId: Sequelize.col('bairro.id')}
        },{
            model: TipoImovel,
            where: {tipoimovelId: Sequelize.col('tipoimovel.id')}
        }]
    }).then(chaves =>{

        res.render("etiquetas/index", {chaves: chaves,user: req.session.user} );
    });
});

router.get('/etiquetas/imprimir',(req,res)=> {
    
    var config = {
        "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        "orientation": "portrait", // portrait or landscape
        "border": {
            "top": "1cm",            // default is 0, units: mm, cm, in, px
            "right": "0.8cm",
            "bottom": "1cm",
            "left": "0.8cm"
          },
    }
    
    
    Chave.findAll({
        where:{gerar_etiqueta: 1},
        include:[{
            model: Bairro,
            where: {bairroId: Sequelize.col('bairro.id')}
        },
        {
            model: TipoImovel,
            where: {tipoimovelId: Sequelize.col('tipoimovel.id')}
        }]
    })
    .then((chaves) =>{

        ejs.renderFile(path.join(__dirname, '../views/imprimir', "template.ejs"), {chaves: chaves}, (err, data) => {
            if(err) return res.send(err);
            var arquivo = 'tmp/etiquetas.pdf'; 
            pdf.create(data,config).toFile(arquivo,function(err, data){
                if(err) return res.send(err);
                res.type("application/pdf");
                var stream = fs.createReadStream(arquivo);
                stream.on("end",() => fs.unlink(arquivo,()=> console.log("Arquivo removido")));
                stream.pipe(res);    
                
            });    
        });
        
    

        
    }); 
});


router.get('/etiquetas/gerar/:id',(req,res)=>{
    var id = req.params.id;

    Chave.update({gerar_etiqueta: 1},{
        where: {id: id}
    }).then(()=>{
        res.redirect("/etiquetas")
        //{chaves: chaves,user: req.session.user});
    });

});
router.get('/etiquetas/remover/:id',(req,res)=>{
    var id = req.params.id;

    Chave.update({gerar_etiqueta: 0},{
        where: {id: id}
    }).then(()=>{
        res.redirect("/etiquetas")
        //{chaves: chaves,user: req.session.user});
    });

});



module.exports = router;