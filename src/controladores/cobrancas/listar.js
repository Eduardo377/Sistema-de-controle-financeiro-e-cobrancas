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
       
    const mes = new Date().getMonth();
    const dia = new Date().getDate();
    const ano = new Date().getFullYear();

    const listaComNomesEStatus = listaComNomes.map((cobranca) => {
      cobranca.status = "Paga";
      if (!cobranca.paga) {
        if (
          +new Date(cobranca.data_vencimento) <
          +new Date(ano, mes, dia)
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
