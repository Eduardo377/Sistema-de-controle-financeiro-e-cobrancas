const yup = require('./yup');

const verificaNomeSchema = yup.object().shape({
    nome: yup
        .string()
        .required(),
    email: yup
        .string()
        .email()
        .required()
});

module.exports = verificaNomeSchema;