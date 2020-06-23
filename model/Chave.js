const banco = require("../config/database");
const TipoImovel = require('../model/TipoImovel');
const Bairro = require('../model/Bairro');

const Chave = banco.db.define('chave',{
    endereco: {
        type: banco.Sequelize.STRING,
    },
    qtdchavescomuns: {
        type: banco.Sequelize.INTEGER,
    },
    qtdchavestetras: {
        type: banco.Sequelize.INTEGER,
    },
    qtdcontroles: {
        type: banco.Sequelize.INTEGER,
    },
    situacao: {
        type: banco.Sequelize.ENUM('Disponível','Indisponível'),
    },
    gerar_etiqueta: {
        type: banco.Sequelize.BOOLEAN,
    }
});
//Relacionamentos entre tabelas 

Chave.belongsTo(Bairro);
Bairro.hasMany(Chave, {
    foreignKey: 'bairroId'
});
Chave.belongsTo(TipoImovel);
TipoImovel.hasMany(Chave, {
    foreignKey: 'tipoimovelId'
});



Chave.sync({force: false});


module.exports = Chave;

