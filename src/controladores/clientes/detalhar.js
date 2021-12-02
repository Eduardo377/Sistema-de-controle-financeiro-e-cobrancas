const knex = require('../../conexao');

const detalharCliente = async(req, res) => {
    const { id } = req.params;
    try {
        const existeId = await knex('clientes').where({ id }).first();
        if (existeId) {
            return res.status(200).json(existeId);
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = { detalharCliente };