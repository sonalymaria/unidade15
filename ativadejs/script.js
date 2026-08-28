// Questão 1

let numero1 = 10;
let numero2 = 5;

console.log("Soma:", numero1 + numero2);
console.log("Subtração:", numero1 - numero2);
console.log ("Multiplicação:", numero1 * numero2);
console.log("Divisão:", numero1 / numero2);

// Questão 2

let numero3 = 7;

console.log("Dobro:", numero3 * 2);
console.log("Triplo:", numero3 * 3);

//Questão 3

let nome = prompt("Qual o seu nome?");
let idade = prompt("Qual a sua idade?");

console.log("Olá, " + nome + " seja bem-vindo! Você tem "+ idade + " anos")

// Questão 4

let nota1 = Number(prompt("Digite a primeira nota:"));
let nota2 = Number(prompt("Digite a segunda nota:"));
let nota3 = Number(prompt("Digite a terceira nota:"));

let media = (Number(nota1) + Number(nota2) + Number(nota3)) / 3;
alert("A média das notas é: " + media);

console.log("Media:", media,);


// Questão 5

let usuarioCorreto = "mayamassafera";
let senhaCorreta = "parajoyce";

let usuario = prompt("Digite seu usuário:");
if (usuario = usuarioCorreto) { 
alert("Usuário está correto.")} else {
    ("Usuário incorreto.")
}

let senha = prompt("Digite sua senha:");
 if (senha = senhaCorreta) {
    alert("Login realizado com sucesso!");
} else {
    alert("Senha incorreta.");
}

// Questão 6

let numero4 = Number(prompt("Digite o primeiro número:"));
let numero5 = Number(prompt("Digite o segundo número:"));

if (numero4 > numero5) {
    alert("O maior número é " + numero4);
} else if (numero4 < numero5) {
    alert("O maior número é " + numero5);
} else {
    ("Os dois números são iguais.");
} 
