const knex = require('../../conexao');

const obterUsuario = async(req, res) => {
    return res.status(200).json(req.usuario);
};

module.exports = { obterUsuario };