const cadastrarCobrancasSchema = require("../../validacoes/cadastrarCobrancasSchema");
const knex = require("../../conexao");

const cadastrarCobrancas = async function (req, res) {
  const { cliente_id, descricao, paga, valor, data_vencimento } = req.body;

  try {
    await cadastrarCobrancasSchema.validate(req.body);

    const cobrancaCadastrada = await knex("cobrancas")
      .insert({
        cliente_id: cliente_id,
        descricao: descricao,
        paga: paga,
        valor: valor * 100,
        data_vencimento: new Date(data_vencimento),
      })
      .returning("*");

    return res.status(201).json(cobrancaCadastrada[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { cadastrarCobrancas };
