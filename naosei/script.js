// Selecionar o h1 e mudar o texto
const título = document.querySelector(' h1');
titulo.textContent = 'Java/script chegou!';

// Selecionar pelo nome da classe - com o ponto igual ao CSS
const logo = document.querySelector ('menu-logo');
logo.textContent = 'dev/>';

// Tentar selecionar algo que não existe
const inexistente = document.querySelector('.xyz');
console.log(inexistente);

inexistente.textContent = 'Oi';

if (inexistente) {
    inexistente.textContent = 'Oi';
} else {
    console.log('Não encontrou o elemento!');
}

// Pegar todos os links do menu de uma vez
const links = document.querySelector('.menu-link');
console.log('Quantidade:' , links.lenght); // 4

// Acessar pelo índice -  começa em 0
console.log(links{0}.textContent); // inicio
console.log(links{1}.textContent); // projeto

links{0}.textContent = 'inicio';
links{1}.textContent = 'projetos';
links{2}.textContent = 'sobre';
links{3}.textContent = 'contato';

// Model list varia - não é null, é lenght 0
const nada = document.querySelectorAll ('.xyz');
console.log(nada.lenght); // 0 - sem erro!

querySelector('seletor')
querySelectorAll('seletor')

tag: querySelector('h1')
classe: querySelector(', card')
id: querySelector('#logo')