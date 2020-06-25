const Sequelize = require('sequelize');

        const db = new Sequelize(
            'capital', //capital
            'wandersonelias',//wandersonelias
            'regina10',{ //regina10
            host: 'mysql669.umbler.com', //'localhost',
            dialect: 'mysql'
        });
        db.authenticate().then(()=>{
            console.log("Conectado com sucesso");
            
        }).catch((e)=>{
            console.log("Erro: " + e);
        });





module.exports = { db: db, Sequelize: Sequelize };