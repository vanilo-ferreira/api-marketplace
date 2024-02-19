const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificarLogin = require('./filtros/verificarLogin');
const produtos = require('./controladores/produtos')

const rotas = express();

//Cadastro de usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario);

//Login
rotas.post('/login', login.login);

//Filtro para verificar usuário logado
rotas.use(verificarLogin);

//Obter e Atualizar perfil do usuário logado
rotas.get('/perfil', usuarios.obterPerfil);
rotas.put('/perfil', usuarios.atualizarPerfil);

//CRUD de produtos
rotas.post('/produtos', produtos.cadastrarProduto);

module.exports = rotas;