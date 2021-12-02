const editarClienteSchema = require('../../validacoes/editarClienteSchema');
const knex = require('../../conexao');

const editarCliente = async(req, res) => {
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
    const { id } = req.params;
    try {
        await editarClienteSchema.validate(req.body);
        const existeId = await knex('clientes').where({ id }).first();
        let clienteASerAtualizado = {
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            email: email,
            endereco: endereco || null,
            complemento: complemento || null,
            cep: cep || null,
            bairro: bairro || null,
            cidade: cidade || null,
            uf: uf || null
        };
        if (existeId) {
            await knex('clientes').where({ id }).update(clienteASerAtualizado).returning('*');
            return res.status(200).json({ message: 'Cliente editado com sucesso!' });
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = {
    editarCliente
}