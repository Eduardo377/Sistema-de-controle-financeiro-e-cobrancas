const knex = require("../../conexao");

const listarCobrancas = async (req, res) => {
  try {
    const listaComNomes = await knex
      .select(
        "nome",
        "cobrancas.id",
        "valor",
        "data_vencimento",
        "descricao",
        "paga"
      )
      .from("cobrancas")
      .leftJoin("clientes", "cobrancas.cliente_id", "clientes.id");

    const listaComNomesEStatus = listaComNomes.map((cobranca) => {
      cobranca.status = "Paga";
      if (!cobranca.paga) {
        if (
          +new Date(cobranca.data_vencimento) + 86400000 <
          +new Date()
        ) {
          return { ...cobranca, status: "Vencida" };
        }
        return { ...cobranca, status: "Pendente" };
      }
      return { ...cobranca };
    });
    return res.status(200).json(listaComNomesEStatus);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { listarCobrancas };
