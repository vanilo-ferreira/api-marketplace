const conexao = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;

  if (!nome) {
    return res.status(404).json("O campo nome é obrigatório");
  }

  if (!email) {
    return res.status(404).json("O campo email é obrigatório");
  }

  if (!senha) {
    return res.status(404).json("O campo senha é obrigatório");
  }

  if (!nome_loja) {
    return res.status(404).json("O campo nome_loja é obrigatório");
  }

  try {

    const { rowCount: quantidadeUsuarios } = await conexao.query('select * from usuarios where email = $1', [email]);

    if (quantidadeUsuarios > 0) {
      return res.status(400).json("O email já existe!");
    }

    const senhacriptografada = await bcrypt.hash(senha, 10);

    const query = 'insert  into usuarios(nome, email, senha, nome_loja) values($1, $2, $3, $4)';
    const usuario = await conexao.query(query, [nome, email, senhacriptografada, nome_loja]);

    if (usuario.rowCount === 0) {
      return res.status(400).json("O usuário não foi cadastrado.");
    }

    return res.status(201).json("O usuário foi cadastrado com sucesso!");


  } catch (error) {
    return res.status(400).json(error.message);
  }


}

// const obterPerfil = async (req, res) => {

// }

// const atualizarPerfil = async (req, res) => {

// }

module.exports = {
  cadastrarUsuario,
}