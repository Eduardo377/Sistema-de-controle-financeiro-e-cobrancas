const yup = require('./yup');

const editarUsuarioSchema = yup.object().shape({
    email: yup
        .string()
        .email(),
    senha: yup
        .string(),
    nome: yup
        .string(),
    cpf: yup
        .string(),
    tel: yup
        .string()
});

module.exports = editarUsuarioSchema;