const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');

const rotas = express();

//Cadastro de usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario);

//Login
rotas.post('/login', login.login);

module.exports = rotas;