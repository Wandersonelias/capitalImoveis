const banco = require('../config/database');
const Chave = require('../model/Chave');
const User = require('../model/User');
const moment = require('moment');


const Emprestimo = banco.db.define('emprestimo',{
    tipo: {
        type: banco.Sequelize.ENUM('Visita', 'Serviço', 'Locatario','Propritario')
    },
    obs:{
        type: banco.Sequelize.STRING 
    },
    devolucao: {
        type: banco.Sequelize.ENUM('Sim','Não')
    },
    createdAt: {
        allowNull: false,
        type: banco.Sequelize.DATE,
        defaultValue: banco.Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: banco.Sequelize.literal('CURRENT_TIMESTAMP')
        
      },
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




