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
    enderenço: yup
        .string(),
    complemento: yup
        .string(),
    cep: yup
        .string(),
    bairro: yup
        .string(),
    cidade: yup
        .string()
        .required(),
    uf: yup
        .string()
        .required(),
});

module.exports = cadastroClienteSchema;