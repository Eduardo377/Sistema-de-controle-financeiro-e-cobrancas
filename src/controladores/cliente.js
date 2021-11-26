// const conexao = require('../conexao');

// const bcrypt = require('bcrypt');

// const postarProdutos = async function(req, res) {
//     const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
//     const usuarioID = req.usuario.id;

//     const camposObrigatorios = verificaCampos(nome, quantidade, preco, descricao);

//     if (camposObrigatorios) {
//         return res.status(400).json(camposObrigatorios);
//     };
//     try {
//         const query = `
//         insert into produtos (usuario_id, nome, quantidade, categoria, preco, descricao, imagem)
//         values ($1,$2,$3,$4,$5,$6,$7)
//         `;
//         const produtosASerInseridos = await conexao.query(query, [
//             usuarioID,
//             nome,
//             quantidade,
//             categoria || null,
//             preco,
//             descricao,
//             imagem || null,
//         ]);
//         if (produtosASerInseridos.rowCount === 0) {
//             return res
//                 .status(400)
//                 .json({ mensagem: "Não foi possível cadastrar o produto." });
//         }
//         return res.status(201).json();
//     } catch (error) {
//         res.status(400).json(error.message);
//     }