const banco = require("../config/database");
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
