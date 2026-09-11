//Crie uma função que pegue dois valores e se a média deles for acima de 6 é aprovado senão reprovado

function calcularMedia(nota1, nota2) {
return (nota1 + nota2) / 2;
}

let media = calcularMedia (8, 6)

console.log(media);

if (media >= 6) {
    console.log("Aprovado");
} else {
    console.log("Reprovado");
} 

//Crie um programa que utilize uma função com 
// vários parâmetros para calclar o custo total de uma viagem. 
// O programa deverá receber os valores da passagem, hospedagem alimentação e passeios
// Calcule o total e infome se a viagem está dentro do orçamento de R$2.000,00.

function calcularViagem(passagem, hospedagem, alimentacao, passeios) {
    let total = passagem + hospedagem + alimentacao + passeios;

    console.log("Custo total da viagem: R$ " + total.toFixed(2));

    if (total <= 2000) {
        console.log("A viagem está dentro do orçamento de R$ 2.000,00.");
    } else {
        console.log("A viagem ultrapassou o orçamento de R$ 2.000,00.");
    }
}

// Valores da viagem
let passagem = 500;
let hospedagem = 700;
let alimentacao = 400;
let passeios = 300;

// Chamada da função
calcularViagem(passagem, hospedagem, alimentacao, passeios);
