// O projeto: calculatora de IMC

/* Classificação 
Abaixo de 18,5 - Abaixo do peso
18,5 a 29,9 - Peso normal
30 a 34,9 - Obseidade grau I 
35 a 39,9 - Obesidade grau II
40 ou mais - Obesidade grau III
*/

let nome =  prompt ("Qual o seu nome?")

let peso = prompt (`Olá, ${nome}! Qual é o seu peso em kg?\n (use vírgula ou ponto - ex: 75,5 ou 75.5)`);
let altStr = prompt ('Qual é a sua altura em metros?\n(ex: 1,75 ou 1.75)'); 

let peso = Number (pesoStr.replace) (',' , '.');
let alt = Number (altStr.replace) (',' , '.');

console.log ('Nome:' , nome);
console.log ('Peso:', peso, typeof peso);
console.log ('Altura:', alt, typeof alt);

let imc = peso / (alt * alt);
let imcFormatado = imc.toFixed (1);

if (imc < 18,5) {
    console.log ('Abaixo do peso')
} else if (imc < 25) {
    console.log ('Peso normal')
} else if (imc < 30) {
    console.log ('Sobrepeso')
} else if (imc < 35) {
    console.log ('Obesidade grau I')
} else if (imc < 40) {
    console.log ('Obesidade grau II') 
} else {
    console.log ('Obesidade grau III')
}


