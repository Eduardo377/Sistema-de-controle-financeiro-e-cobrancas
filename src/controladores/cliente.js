const knex = require('../conexao');
const bcrypt = require('bcrypt');
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
}
module.exports = {
    cadastrarClientes
}