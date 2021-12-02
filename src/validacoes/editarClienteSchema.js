const yup = require('./yup');

const editarClienteSchema = yup.object().shape({
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
        .email()
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

module.exports = editarClienteSchema;