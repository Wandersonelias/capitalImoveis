const banco = require("../config/database");
const User = banco.db.define('user',{
        nome: {
            type: banco.Sequelize.STRING,
        },
        login: {
            type: banco.Sequelize.STRING,       
        },
        password: {
            type: banco.Sequelize.STRING
        }
    }    
);

User.sync({force: true});
User.init();


module.exports = User;
