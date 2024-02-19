const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(404).json("O campo email é obrigatório");
  }

  if (!senha) {
    return res.status(404).json("O campo senha é obrigatório");
  }

  try {

    const { rowCount, rows } = await conexao.query('select * from usuarios where email = $1', [email]);

    if (rowCount == 0) {
      return res.status(400).json("O email não foi encontrado!");
    }

    const usuario = rows[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(405).json("Email e senha não confere!");
    }

    const token = jwt.sign({id: usuario.id},
      process.env.SENHA_HASH,
      {expiresIn: '8h'});

      const {senha: _, ...dadosUsuario} = usuario;

    return res.status(200).json({
      usuario: dadosUsuario,
      token
    });

  } catch (error) {
    return res.status(400).json(error.message);

  }


}

module.exports = {
  login
}