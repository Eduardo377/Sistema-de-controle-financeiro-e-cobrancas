const knex = require("../../../conexao");

const listarCobrancasCliente = async (req, res) => {
  const { clienteid } = req.params;

  try {
    const cobrancasCliente = await knex("cobrancas").where({
      cliente_id: clienteid,
    });

    if (cobrancasCliente.length === 0) {
      return res.status(200).json(cobrancasCliente);
    }

    const mes = new Date().getMonth() + 1;
    const dia = new Date().getDate().toString().padStart(2, "0");
    const ano = new Date().getFullYear();

    const listaComStatus = cobrancasCliente.map((cobranca) => {
      cobranca.status = "paga";
      if (!cobranca.paga) {
        if (
          +new Date(cobranca.data_vencimento) <
          +new Date(`${ano}-${mes}-${dia}`)
        ) {
          return { ...cobranca, status: "vencida" };
        }
        return { ...cobranca, status: "pendente" };
      }
      return { ...cobranca };
    });
    return res.status(200).json(listaComStatus);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = listarCobrancasCliente;
