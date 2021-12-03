const editarClienteSchema = require("../../validacoes/editarClienteSchema");
const knex = require("../../conexao");


const editarCliente = async (req, res) => {
  const { id } = req.params;
  const idCliente = Number(id);
  const { email, cpf, ...body } = req.body;

  try {
    await editarClienteSchema.validate(req.body);


    const verificaEmail = await knex("clientes").where({ email }).first();

    if (verificaEmail && verificaEmail.id !== idCliente) {
      return res.status(400).json({
        message: "E-mail já cadastrado",
        field: "email",
      });
    }

    const verificaCPF = await knex("clientes").where({ cpf }).first();

    if (verificaCPF && verificaCPF.id !== idCliente) {
      return res.status(400).json({
        message: "CPF já cadastrado",
        field: "cpf",
      });
    }

    const clienteAtualizado = await knex("clientes")
      .where({ id: idCliente })
      .update({
        email,
        cpf,
        ...body,
      })
      .returning("*");

    res.status(200).json(clienteAtualizado[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  editarCliente,
};

