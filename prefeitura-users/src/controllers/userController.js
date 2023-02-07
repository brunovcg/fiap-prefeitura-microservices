const express = require('express')
const User = require('../database/user-model')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/users/', async (req,res)=>{
    const users = await User.find({})
    return res.send(users)
});

router.get('/user/:username', async (req,res) => {
    try {
        const user = await User.findOne({username: req.params.username})
        return res.send({user})

    } catch (error) {
        return res.status(404).send({error: 'User not found'})
    }    
});

module.exports = app => app.use('/api', router);