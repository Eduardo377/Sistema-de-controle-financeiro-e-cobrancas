const knex = require('../../conexao');

const listarClientes = async(req, res) => {
    const clientes = await knex('clientes').returning('*');
    return res.status(200).json(clientes);
}

module.exports = { listarClientes };