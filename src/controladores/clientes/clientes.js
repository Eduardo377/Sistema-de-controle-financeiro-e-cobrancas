const knex = require('../conexao');
const cadastroClienteSchema = require('../validacoes/cadastrarClienteSchema');

const cadastrarClientes = async function (req, res) {
    const {
        nome,
        cpf,
        telefone,
        email,
        endereco,
        complemento,
        cep,
        bairro,
        cidade,
        uf
    } = req.body;

    const usuarioID = req.usuario.id;

    try {
        await cadastroClienteSchema.validate(req.body);

        const existeEmail = await knex('clientes').where({ email }).first();

        if (existeEmail) {
            return res.status(400).json({
                message: "O email já existe!",
                field: "email"

            });
        }

        const existeCpf = await knex('clientes').where({ cpf }).first();

        if (existeCpf) {
            return res.status(400).json({
                message: "O cpf já está cadastrado!",
                field: "cpf"
            });
        }

        await knex('clientes').insert({
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            email: email,
            endereco: endereco,
            complemento: complemento,
            cep: cep,
            bairro: bairro,
            cidade: cidade,
            uf: uf
        }).returning('*');

        return res.status(201).json({ message: "Cliente Cadastrado!" });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const detalharClientes = async (req, res) => {
    const clientes = await knex('clientes').returning('*');
    return res.status(200).json(clientes);
}

module.exports = {
    cadastrarClientes,
    detalharClientes
}