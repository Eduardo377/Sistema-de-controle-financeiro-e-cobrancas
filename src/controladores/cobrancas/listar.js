const knex = require('../../conexao');

const listarCobrancas = async(req, res) => {
    try {
        const listarCobrancas = await knex('cobrancas').returning('*');
        return res.status(200).json(listarCobrancas);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { listarCobrancas };