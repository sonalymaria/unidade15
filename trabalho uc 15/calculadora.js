let nome = prompt("Qual o nome do produto?");

let preco = Number(prompt("Qual o preço original?"));

let desconto = Number(prompt("Qual o percentual de desconto?"));

let valorDesconto = preco * (desconto / 100);

let total = preco - valorDesconto;

console.log("Produto:", nome);
console.log("Preço final: R$ " + total);


