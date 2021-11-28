const yup = require('./yup');

const cadastroClienteSchema = yup.object().shape({
    nome: yup
        .string()
        .required(),
    cpf: yup
        .string()
        .required(),
    telefone: yup
        .string()
        .required(),
    email: yup
        .string()
        .required(),
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

module.exports = cadastroClienteSchema;