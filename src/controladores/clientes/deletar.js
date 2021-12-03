const knex = require('../../conexao');

const deletarCliente = async(req, res) => {
    const { id } = req.params;
    try {
        await knex('cobrancas').where({ cliente_id: id }).delete();
        await knex('clientes').where({ id }).delete();
        return res.sendStatus(204);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = { deletarCliente };