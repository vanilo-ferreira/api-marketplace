const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificarLogin = require('./filtros/verificarLogin');

const rotas = express();

//Cadastro de usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario);

//Login
rotas.post('/login', login.login);

//Filtro para verificar usuário logado
rotas.use(verificarLogin);

module.exports = rotas;