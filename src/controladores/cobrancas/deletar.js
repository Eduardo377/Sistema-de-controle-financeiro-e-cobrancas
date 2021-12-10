const knex = require('../../conexao');

const deletarCobrancas = async(req, res) => {
    const data = +new Date();
    const { id } = req.params;
    try {
        const cobrancaPaga = await knex('cobrancas').where({ id }).select('paga', 'data_vencimento').first();

        if (cobrancaPaga.paga) {
            return res.status(400).json({ message: 'Conbraças pagas não podem ser deletadas.' });
        }
        if (1000 * 60 * 60 * 24 + (+new Date(cobrancaPaga.data_vencimento)) < data) {
            return res.status(400).json({ message: 'Conbraças vencidas não podem ser deletadas.' });
        }
        await knex('cobrancas').where({ id }).del();
        return res.status(200).json({ message: 'Excluido com sucesso.' });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = { deletarCobrancas };