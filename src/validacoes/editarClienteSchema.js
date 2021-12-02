const yup = require('./yup');

const editarClienteSchema = yup.object().shape({
    nome: yup
        .string(),
    cpf: yup
        .string(),
    telefone: yup
        .string(),
    email: yup
        .string(),
    endereco: yup
        .string(),
    complemento: yup
        .string(),
    cep: yup
        .string(),
    bairro: yup
        .string(),
    cidade: yup
        .string(),
    uf: yup
        .string(),
});

module.exports = editarClienteSchema;