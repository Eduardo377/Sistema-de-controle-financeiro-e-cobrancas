const knex = require('../../conexao');

const listarClientes = async (req, res) => {
    try {

        const clientes = await knex('clientes');
        const cobrancas = await knex('cobrancas');

        const clientesComCobrancas = clientes.map((cliente) => {
            cliente.inadimplente = false;
            cobrancas.forEach(item => {
                if (item.cliente_id === cliente.id) {
                    if (!item.paga) {
                        const mes = new Date().getMonth() + 1;
                        const dia = new Date().getDate().toString().padStart(2, '0');
                        const ano = new Date().getFullYear();
    
                        if (+new Date(item.data_vencimento) < +new Date(`${ano}-${mes}-${dia}`)) {
                            return cliente.inadimplente = true;
                        }
                    }
                }
            });

            cliente.cobrancas = cobrancas.filter(({ cliente_id }) => cliente_id === cliente.id);
            return cliente;
        });

        return res.status(200).json(clientesComCobrancas);
    } catch (error) {
        return res.status(404).json(error.message);
    }
}

module.exports = { listarClientes };