const express = require('express')
const User = require('../database/user-model')
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    const {username} = req.body;
    try {

        if (await User.findOne({username}))
            return res.status(409).send({ error: "User already exists"})

        const user = new User;
        user.username = req.body.username;
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.telefone = req.body.telefone;
        
        await user.save();
        user.password = undefined;
        
        return res.send({user})

        } catch (error) {
        return res.status(400).send({error: 'Registration failed'})
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username}).select('+password');

    if (!user) return res.status(401).send({error: "Wrong CPF or Password"})
    if (!await bcrypt.compare(password, user.password)) return res.status(401).send({error: "Invalid Password"})

    user.password = undefined;

    res.send({user})

});

module.exports = app => app.use('/auth', router);