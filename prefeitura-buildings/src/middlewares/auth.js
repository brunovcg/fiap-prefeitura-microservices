const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({error: "No token provided"})

    const parts = authHeader.split(' ');
    if (!parts.length === 2) return res.status(401).send({error: "Invalid Token"})

    const [scheme, token] = parts;
    if(scheme != "Bearer") return res.status(401).send({error: "Invalid Token"})

    if(token != authConfig.token) return res.status(401).send({error: "Invalid Token"})
    return next();
}