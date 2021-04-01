const express = require('express');
const app = express();
const {response} = require('express');
const petshop = require('./petshop');

app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor está rodando!")
});

app.get('/pets', (request, response) => {
    return response.send(petshop.listarPets());
})  
//console.log(petshop.listarPets());