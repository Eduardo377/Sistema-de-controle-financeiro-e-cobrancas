const cadastrarCobrancasSchema = require("../../validacoes/cadastrarCobrancasSchema");
const knex = require("../../conexao");

const cadastrarCobrancas = async function (req, res) {
  const { cliente_id, descricao, paga, valor, data_vencimento } = req.body;

  try {
    await cadastrarCobrancasSchema.validate(req.body);
    const dia = Number(data_vencimento.slice(8,10))
    const mes = Number(data_vencimento.slice(5,7))-1
    const ano = Number(data_vencimento.slice(0,4))

    const cobrancaCadastrada = await knex("cobrancas")
      .insert({
        cliente_id: cliente_id,
        descricao: descricao,
        paga: paga,
        valor: valor * 100,
        data_vencimento: new Date(ano, mes, dia),
      })
      .returning("*");

    return res.status(201 ).json(cobrancaCadastrada[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { cadastrarCobrancas };
