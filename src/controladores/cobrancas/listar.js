const knex = require('../../conexao');

const listarCobrancas = async(req, res) => {
    const listarCobrancas = await knex('cobrancas').returning('*');
    return res.status(200).json(listarCobrancas);
}

module.exports = { listarCobrancas };