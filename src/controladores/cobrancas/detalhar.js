const knex = require('../../conexao');

const detalharCobranca = async(req, res) => {
    const { id } = req.params;
    try {
        const existeId = await knex('cobrancas').where({ id }).first();

        if (existeId) {
            return res.status(200).json(existeId);
        } else {
            return res.status(401).json({ mensagem: 'Cobrança não encontrada'})
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = { detalharCobranca };