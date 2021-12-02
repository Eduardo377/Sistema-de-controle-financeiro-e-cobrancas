const yup = require('./yup');

const cadastroCobrancasSchema = yup.object().shape({
    descricao: yup
        .string()
        .required(),
    paga: yup
        .boolean()
        .required(),
    valor: yup
        .number()
        .required(),
    data_vencimento: yup
        .string()
        .required(),
});

module.exports = cadastroCobrancasSchema;