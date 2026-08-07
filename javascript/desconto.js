let nome = prompt ("Qual o seu nome?" , "Digite aqui");

alert(`Olá ${nome}! Seja bem-vindo!`)

let nomeCliente = "Sonaly";
let valorCompra = 1000;
let clientVip = true;

let percentualDesconto = 0;
let valorDesconto = 0;
let valorFinal = 0;

if (clientVip) {
    percentualDesconto = 10;
} else if (valorCompra >= 500) {
    percentualDesconto = 15;
} else if (valorCompra >= 200) {
    percentualDesconto = 10;
} else {
    percentualDesconto = 10;
}

//Calcula os valores
valorDesconto = valorCompra * (percentualDesconto / 100);
valorFinal = valorCompra - valorDesconto; 

//Exibe os resultados

console.log("Nome do cliente: " + nomeCliente);
console.log ("Valor da compra: R$" + valorCompra.tofixed(2));
console.log("Desconto: " + percentualDesconto + "%");
console.log ("Valor do desconto: R$" + valorDesconto.toFixed(2));
console.log ("Valor final: R$" + valorFinal.toFixed(2));

//Desafio: frete grátis 
if (valorFinal > 1000) {
    console.log("Parabéns! Você ganhou frete grátis. ");
} else {
    console.log ("Frete será cobrado normalmente.");
}