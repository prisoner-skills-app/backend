const express = require('express');

const authRouter = require('../auth/auth-router.js');
//const centerRouter = require('../centers/centers-router.js');

const server = express();

server.use(express.json());

server.use('/api/auth', authRouter);
//server.use('/api/centers', centerRouter);


module.exports = server;