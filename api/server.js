const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const centerRouter = require('../centers/centers-router.js');
const candidateRouter = require('../candidates/candidates-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up and running!' })
});

server.use('/api/auth', authRouter);
server.use('/api/centers', centerRouter);
server.use('/api/candidates', candidateRouter);

module.exports = server;