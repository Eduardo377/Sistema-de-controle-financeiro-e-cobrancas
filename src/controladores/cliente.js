const knex = require('../conexao');
const verificarEmailSchema = require('../validacoes/verificarEmailSchema');
const cadastroClienteSchema = require('../validacoes/cadastrarClienteSchema');

const cadastrarClientes = async function(req, res) {
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

        if (email) {
            await verificarEmailSchema.validate(req.body);

            await knex('clientes').where({ email }).first();

            const existeEmail = await knex('clientes').where({ email }).first();

            if (existeEmail) {
                return res.status(400).json({ message: "O email já existe" });
            }

            return res.status(200).json({ message: "email disponivel" });
        };
        await cadastroClienteSchema.validate(req.body);
        const cliente = await knex('clientes').insert({
            usuario_id: usuarioID,
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
        return res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const detalharClientes = async(req, res) => {
    const clientes = await knex('clientes').returning('*');
    return res.status(200).json(clientes);
}
module.exports = {
    cadastrarClientes,
    detalharClientes
}