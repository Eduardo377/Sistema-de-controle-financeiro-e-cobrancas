const knex = require("../../conexao");

const listarClientes = async (req, res) => {
  try {
    const clientes = await knex("clientes");
    const cobrancas = await knex("cobrancas");

    const clientesComCobrancas = clientes.map((cliente) => {
      cliente.inadimplente = false;
      cobrancas.forEach((item) => {
        if (item.cliente_id === cliente.id) {
          if (!item.paga) {
            if (
              +new Date(item.data_vencimento) + 86400000 <
              +new Date()
            ) {
              return (cliente.inadimplente = true);
            }
          }
        }
      });
      return cliente;
    });

    return res.status(200).json(clientesComCobrancas);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { listarClientes };
