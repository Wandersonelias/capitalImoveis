const Sequelize = require('sequelize');

        const db = new Sequelize(
            'capital',
            'wandersonelias',
            'regina10',{
            host: 'mysql669.umbler.com',
            dialect: 'mysql'
        });
        db.authenticate().then(()=>{
            console.log("Conectado com sucesso");
            
        }).catch((e)=>{
            console.log("Erro: " + e);
        });





module.exports = { db: db, Sequelize: Sequelize };