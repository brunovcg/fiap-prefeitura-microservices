const mongoose = require('.');

const BuildingsSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    matricula: {
        type: String,
        unique: true,
        required: true
    },
    tamanho: {
        type: Number,
        required: true
    },
    endereco: {
        type: String,
        required: true,
    },
    bairro: {
        type: String,
        required: true,
    },
    iptu: {
        type: Number,
        required: false,
    }
});

module.exports = mongoose.model('Buildings', BuildingsSchema);