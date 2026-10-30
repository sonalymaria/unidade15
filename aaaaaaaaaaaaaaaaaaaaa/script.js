function calcularMedia() {
    // Captura dos elementos do DOM
    const nomeInput = document.getElementById('nome').value.trim();
    const nota1Input = document.getElementById('nota1').value;
    const nota2Input = document.getElementById('nota2').value;
    const nota3Input = document.getElementById('nota3').value;

    const msgErro = document.getElementById('mensagem-erro');
    const boxResultado = document.getElementById('resultado');

    // Ocultar resultados anteriores
    msgErro.classList.add('hidden');
    boxResultado.classList.add('hidden');

    // 1. Validação do Nome
    if (nomeInput === '') {
        exibirErro('Por favor, informe o nome do estudante.');
        return;
    }

    // 2. Validação das Notas
    if (nota1Input === '' || nota2Input === '' || nota3Input === '') {
        exibirErro('Por favor, preencha as três notas.');
        return;
    }

    const n1 = parseFloat(nota1Input);
    const n2 = parseFloat(nota2Input);
    const n3 = parseFloat(nota3Input);

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        exibirErro('Insira apenas números válidos para as notas.');
        return;
    }

    if (n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || n3 < 0 || n3 > 10) {
        exibirErro('Todas as notas devem estar entre 0.0 e 10.0.');
        return;
    }

    // 3. Cálculo da Média
    const media = (n1 + n2 + n3) / 3;
    const mediaFormatada = media.toFixed(1);

    // 4. Verificação da Situação
    let situacao = '';
    let classeCss = '';

    if (media >= 7.0) {
        situacao = 'Aprovado(a)';
        classeCss = 'aprovado';
    } else if (media >= 5.0) {
        situacao = 'Recuperação';
        classeCss = 'recuperacao';
    } else {
        situacao = 'Reprovado(a)';
        classeCss = 'reprovado';
    }

    // 5. Exibição do Resultado
    document.getElementById('res-nome').innerText = `Estudante: ${nomeInput}`;
    document.getElementById('res-media').innerText = mediaFormatada;
    document.getElementById('res-situacao').innerText = situacao;

    boxResultado.className = `resultado-box ${classeCss}`;
}

function exibirErro(mensagem) {
    const msgErro = document.getElementById('mensagem-erro');
    msgErro.innerText = mensagem;
    msgErro.classList.remove('hidden');
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('nota1').value = '';
    document.getElementById('nota2').value = '';
    document.getElementById('nota3').value = '';

    document.getElementById('mensagem-erro').classList.add('hidden');
    document.getElementById('resultado').classList.add('hidden');
}