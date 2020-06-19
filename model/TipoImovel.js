const banco = require('../config/database');
//const Chave = require('../model/Chave');
const TipoImovel = banco.db.define('tipoimovel',{
    descricao: {
        type: banco.Sequelize.STRING
    }
});



TipoImovel.sync({force: false});


module.exports = TipoImovel;