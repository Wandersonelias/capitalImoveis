const banco = require('../config/database');
//const Chave = require('../model/Chave'); 

const Bairro = banco.db.define('bairro',{
    
    descricao: {
        type: banco.Sequelize.STRING,
    }
    
});
//Bairro.hasMany(Chave);
//Chave.belongsTo(Bairro);

Bairro.sync({force: false});


module.exports = Bairro;