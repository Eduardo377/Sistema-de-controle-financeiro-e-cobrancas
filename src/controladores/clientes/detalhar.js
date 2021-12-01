const knex = require('../../conexao');

const detalharClientes = async (req, res) => {
    const clientes = await knex('clientes').returning('*');
    return res.status(200).json(clientes);
}

module.exports = { detalharClientes };