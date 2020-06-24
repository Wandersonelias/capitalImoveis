const banco = require('../config/database');
const Chave = require('../model/Chave');
const User = require('../model/User');
const Emprestimo = banco.db.define('emprestimo',{
    tipo: {
        type: banco.Sequelize.ENUM('Visita', 'Serviço', 'Locatario','Propritario')
    },
    obs:{
        type: banco.Sequelize.STRING 
    },
    devolucao: {
        type: banco.Sequelize.ENUM('Sim','Não')
    }
    
});


Emprestimo.belongsTo(Chave);
Chave.hasMany(Emprestimo,
    {foreign: 'chaveId'
});

Emprestimo.belongsTo(User);
User.hasMany(Emprestimo,{
     foreign: 'userId'
});






Emprestimo.sync({force: false});


module.exports = Emprestimo;




