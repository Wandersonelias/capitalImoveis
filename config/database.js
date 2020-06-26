const Sequelize = require('sequelize');

        const db = new Sequelize(
            'database', //banco de dados
            'user',//usuario mysql
            'password',{ //senha
            host: 'localhost',//maquina onde o banco esta
            dialect: 'mysql'
        });
        db.authenticate().then(()=>{
            console.log("Conectado com sucesso");
            
        }).catch((e)=>{
            console.log("Erro: " + e);
        });
        /*
        const db = new Sequelize(
            'capital', //capital
            'wanderson',//wandersonelias
            'regina',{ //regina10
            host: 'localhost', // 'mysql669.umbler.com', //'localhost',
            dialect: 'mysql'
        });
        db.authenticate().then(()=>{
            console.log("Conectado com sucesso");
            
        }).catch((e)=>{
            console.log("Erro: " + e);
        });
        */





module.exports = { db: db, Sequelize: Sequelize };
