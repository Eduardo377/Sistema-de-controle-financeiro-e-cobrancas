const yup = require('./yup');

const verificaNomeSchema = yup.object().shape({
    nome: yup
        .string()
        .required()
        .min(3)
        .max(10),
    email: yup
        .string()
        .email()
        .required()
});

module.exports = verificaNomeSchema;