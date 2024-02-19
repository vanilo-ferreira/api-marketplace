const conexao = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarProduto = async (req, res) => {
  const { usuario } = req;
  const { nome, estoque, preco, categoria, descricao, imagem} = req.body;

  if(!nome){
    return res.status(404).json('O campo nome é obrigatório');
  }

  if (!estoque) {
    return res.status(404).json('O campo preco é obrigatório');
  }

  if (!preco) {
    return res.status(404).json('O campo preco é obrigatório');
  }

  if (!descricao) {
    return res.status(404).json('O campo descricao é obrigatório');
  }

  try{
    const query = 'insert into produtos (usuario_id, nome, estoque, preco, categoria, descricao, imagem) values ($1, $2, $3, $4, $5, $6, $7)';
    const produtoCadastrado = await conexao.query(query, [usuario.id, nome, estoque, preco, categoria, descricao, imagem]);

    if (produtoCadastrado.rowCount == 0){
      return res.status(404).json('O produto não foi cadastrado!');
    }

    return res.status(201).json('O produto foi cadastrado com sucesso!');
  }catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  cadastrarProduto
}