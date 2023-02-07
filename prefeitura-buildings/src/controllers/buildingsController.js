const express = require('express')
const Buildings = require('../database/buildings-model')
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const uuid = require('uuid');
import {v4 as uuidv4} from 'uuid';


router.use(authMiddleware);

router.get('/buildings/neighborhood/', (req,res)=>{
    const buildings =  [
        {'id' : 1, 'name' : 'Madalena'}, 
        {'id' : 2, 'name' : 'Boa Viagem'}, 
        {'id' : 3, 'name' : 'Casa Forte'}, 
        {'id' : 4, 'name' : 'Torre'}]
    return res.send(buildings)
});

router.get('/buildings/', async (req,res) => {
    try {
        const building = await Buildings.find({username: req.body.username})
        return res.send({building})

    } catch (error) {
        return res.status(404).send({error: 'No Registered Buildings'})
    }    
});

router.post('/buildings/', async (req,res) => {
    const matricula = uuidv4();

    try {

        if (req.body.bairro == "Madalena") var iptu = req.body.tamanho * 2
        if (req.body.bairro == "Boa Viagem") var iptu = req.body.tamanho * 2.5
        if (req.body.bairro == "Casa Forte") var iptu = req.body.tamanho * 2.7
        if (req.body.bairro == "Torre") var iptu = req.body.tamanho * 2.4

        const building = new Buildings;
        building.username = req.body.username;
        building.matricula = matricula;
        building.tamanho = req.body.tamanho;
        building.endereco = req.body.endereco;
        building.bairro = req.body.bairro;
        building.iptu = iptu
   
        await building.save();
        
        return res.send({building})

        } catch (error) {
        console.log(error)
        return res.status(400).send({error: 'Registration failed'})
    }    
});

router.patch('/buildings/matricula/:matricula', async (req,res) => {
    const {tamanho, endereco, bairro} = req.body

    try {
        const building = await Buildings.findOneAndUpdate(
            {matricula: req.params.matricula},
            {tamanho,endereco,bairro},
            {new: true})
        return res.send({building})

    } catch (error) {
        return res.status(404).send({error: 'Building Not Found'})
    }    
});

router.delete('/buildings/matricula/:matricula', async (req,res) => {
    try {
        const building = await Buildings.findOneAndDelete({matricula: req.params.matricula})
        return res.send(`Building ${req.params.matricula} deleted`)

    } catch (error) {
        return res.status(404).send({error: 'Building Not Found'})
    }    
});

module.exports = app => app.use('/api', router);