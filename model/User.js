const banco = require("../config/database");
const Emprestimo = require('../model/Emprestimo');
const User = banco.db.define('user',{
        login: {
            type: banco.Sequelize.STRING,       
        },
        password: {
            type: banco.Sequelize.STRING
        }
    }    
);




User.sync({force: false});

module.exports = User;
