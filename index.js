const express = require('express');
const app = express();
const {response} = require('express');
const petshop = require('./petshop');

app.use(express.json());



app.get('/pets', (request, response) => {
return response.send(petshop.listarPets());
})  
app.post('/pets', (request, response) => {
const {tutor, contato, nome, tipo, idade, raca, peso, vacinado, servicos} = request.body;
    
const pet = {nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos} 

petshop.adicionarPet(pet);

return response.send(pet);
})

app.get('/pets/:nome', (request, response) => {
const params = request.params;
    let buscarNome =  petshop.buscarPet(params.nome)
    return response.send(buscarNome);
})

app.listen(3000, () => {
console.log("Servidor está rodando!")
});

//console.log(petshop.listarPets());