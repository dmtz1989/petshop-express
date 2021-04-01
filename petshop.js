const moment =  require("moment");
const fs = require("fs");

let bancoDados = fs.readFileSync('./bancoDados.json', 'utf8');

bancoDados = JSON.parse(bancoDados);

const petshop = {
    atualizarBanco: () => {
        let petsAtualizado = JSON.stringify(bancoDados, null, 2);
        fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8');
    },
    listarPets: () => {
        let textoListaPets = "PETSHOP \n"
    
        bancoDados.pets.forEach((pet)=> {
            
            textoListaPets += (`TUTOR: ${pet.tutor} - CONTATO: ${pet.contato} - NOME: ${pet.nome}, IDADE: ${pet.idade}, TIPO: ${pet.tipo}, RAÇA: ${pet.raca}, VACINADO:${(pet.vacinado) ? 'vacinado': 'não vacinado' } \n`);
            pet.servicos.forEach((servico) =>{
            textoListaPets += (`${servico.data} - ${servico.nome}`);
    });
});
    return textoListaPets;
    },
    vacinarPet: () => {
        if (!pet.vacinado) {
            pet.vacinado = true;
            petshop.atualizarBanco();
            console.log(`${pet.nome} foi vacinado com sucesso!`);
        } else {
            console.log(`Ops, ${pet.nome} já está vacinado!`);
        }
    },
    campanhaVacina: () => {
        console.log("Campanha de vacina 2020");
        console.log("vacinando...");
    
        let petVacinadosCampanha = 0;

        bancoDados.pets = bancoDados.pets.map((pet) => {
            if (!pet.vacinado) {
                petshop.vacinarPet(pet);
                petVacinadosCampanha++;
            }
        return pet;
    });
        console.log(`${petVacinadosCampanha} pets foram vaciados nessa campanha!`);
    },
    adicionarPet: (...novosPets) => {
        novosPets.forEach((novoPet) => {
            bancoDados.pets.push(novoPet)
        });
            petshop.atualizarBanco();
            novosPets.forEach((pet) => {
                console.log(`${pet.nome} foi adicionado com sucesso`);
            });
    },
    darBanhoPet:  pet => {
        pet.servicos.push({
            'nome':'banho',
            'data': moment().format('DD-MM-YYYY')
        });
        petshop.atualizarBanco();
        console.log(`${pet.nome} está de banho tomado!`);
    },
    tosarPet : pet => {
        pet.servicos.push({
            'nome':'tosa',
            'data': moment().format('DD-MM-YYYY')
        });
        petshop.atualizarBanco();
        console.log(`${pet.nome} está com cabelinho na régua :)`);
    },
    apararUnhasPet: pet => {
            pet.servicos.push({
            'nome':'corte de unhas',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${pet.nome} está de unhas aparadas!`);
    },
    atenderCliente : (pet, servico) => {
        console.log(`\n atendendo ${pet.nome}`);
        servico(pet);
        console.log('Até logo!!! \n');
    },
    buscarPet: (nomePet) => {
        let petEncontrado = bancoDados.pets.find((pet) =>{
            return pet.nome == nomePet;
        });
    
        return petEncontrado ? petEncontrado: `nenhum pet encontrado com o nome ${nomePet}`;
    },
    filtrarTipoPet: (tipoPet) => {
        let petsEncontrados = bancoDados.pets.flter((pet) => {
            return pet.tipo == tipoPet;
        });
        return petsEncontrados;
    },
    clientePremium: (pet) => {
        let numServicos = pet.servicos.length;
    
        if(numServicos > 5 ) {
            console.log(`Olá, ${pet.nome}! Voce é um cliente especial e ganhou um DESCONTÃO!`);
        } else {
            console.log(`Olá, ${pet.nome}! Você ainda não tem descontos =( `);
        }
    },
    contatoTutor: (pet) => {
        let {nome, tutor, contato} = pet;
        return `Tutor: ${tutor} - Contato: ${contato} - Pet: ${nome}`
    },
    filtrarTutor: (nomeTutor) => {
        let petsTutor = bancoDados.pets.filter((pet) => {
            return pet.tutor == nomeTutor;
        });
        console.log(`Pets do tutor ${nomeTutor}:`)
        petsTutor.forEach((pet) => {
            console.log(`${pet.nome} - ${pet.tipo}`)
        });
    }
}

module.exports = petshop;

