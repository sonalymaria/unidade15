/* ==================================================
   LUMINA — CALCULADORA DE ENTREGAS
================================================== */


/*
    COORDENADAS DAS CIDADES

    Latitude e longitude aproximadas.
*/

const cidades = {

    natal: {
        nome: "Natal — RN",
        lat: -5.79448,
        lon: -35.211
    },

    parnamirim: {
        nome: "Parnamirim — RN",
        lat: -5.91556,
        lon: -35.26278
    },

    extremoz: {
        nome: "Extremoz — RN",
        lat: -5.70556,
        lon: -35.30722
    },

    saogoncalo: {
        nome: "São Gonçalo do Amarante — RN",
        lat: -5.79333,
        lon: -35.32944
    },

    macaiba: {
        nome: "Macaíba — RN",
        lat: -5.85889,
        lon: -35.35389
    },

    cearamirim: {
        nome: "Ceará-Mirim — RN",
        lat: -5.63444,
        lon: -35.42556
    },

    joaopessoa: {
        nome: "João Pessoa — PB",
        lat: -7.115,
        lon: -34.863
    }

};


/* ==================================================
   CONFIGURAÇÕES
================================================== */


/*
    Preço aproximado do combustível.
*/

const PRECO_COMBUSTIVEL = 6.20;


/*
    Consumo médio do veículo.

    12 km por litro.
*/

const CONSUMO = 12;


/*
    Taxa fixa da entrega.
*/

const TAXA_BASE = 8;


/*
    Preço cobrado por quilômetro.
*/

const PRECO_KM = 0.85;


/*
    Multiplicador aproximado para transformar
    distância em linha reta em distância rodoviária.

    Como não usamos API de mapas,
    usamos uma estimativa.
*/

const MULTIPLICADOR_RODOVIARIO = 1.25;


/* ==================================================
   CÁLCULO DA DISTÂNCIA
================================================== */


/*
    Fórmula de Haversine.

    Ela calcula a distância entre
    dois pontos da Terra.
*/

function calcularDistancia(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat =
        (lat2 - lat1) *
        Math.PI / 180;

    const dLon =
        (lon2 - lon1) *
        Math.PI / 180;


    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return R * c;

}


/* ==================================================
   FUNÇÃO PRINCIPAL
================================================== */

function calcularEntrega() {


    /* ----------------------------------------------
       PEGAR OS VALORES
    ---------------------------------------------- */

    const origemSelecionada =
        document.getElementById("origem").value;


    const destinoSelecionado =
        document.getElementById("destino").value;


    const peso =
        Number(
            document.getElementById("peso").value
        );


    const valorPedido =
        Number(
            document.getElementById("valorPedido").value
        );


    const rota =
        document.querySelector(
            'input[name="rota"]:checked'
        ).value;



    /* ----------------------------------------------
       VERIFICAR ORIGEM E DESTINO
    ---------------------------------------------- */

    if (
        origemSelecionada === destinoSelecionado
    ) {

        alert(
            "Escolha um destino diferente da origem. ♡"
        );

        return;

    }



    /* ----------------------------------------------
       OBJETOS DAS CIDADES
    ---------------------------------------------- */

    const origem =
        cidades[origemSelecionada];


    const destino =
        cidades[destinoSelecionado];



    /* ----------------------------------------------
       DISTÂNCIA EM LINHA RETA
    ---------------------------------------------- */

    let distancia =
        calcularDistancia(
            origem.lat,
            origem.lon,
            destino.lat,
            destino.lon
        );



    /*
        Transformamos a distância em uma
        estimativa de distância rodoviária.
    */

    distancia =
        distancia *
        MULTIPLICADOR_RODOVIARIO;



    distancia =
        Math.round(distancia * 10) / 10;



    /* ----------------------------------------------
       CONSUMO DE COMBUSTÍVEL
    ---------------------------------------------- */

    const litros =
        distancia / CONSUMO;


    const gastoCombustivel =
        litros * PRECO_COMBUSTIVEL;



    /* ----------------------------------------------
       CUSTO POR DISTÂNCIA
    ---------------------------------------------- */

    let custoDistancia =
        distancia * PRECO_KM;



    /* ----------------------------------------------
       CUSTO DO PESO
    ---------------------------------------------- */

    let taxaPeso = 0;


    if (peso === 1) {

        taxaPeso = 0;

    }

    else if (peso === 2) {

        taxaPeso = 4;

    }

    else if (peso === 3) {

        taxaPeso = 8;

    }

    else {

        taxaPeso = 15;

    }



    /* ----------------------------------------------
       VALOR DA ROTA
    ---------------------------------------------- */

    let multiplicadorRota = 1;

    let nomeRota = "Padrão";

    let tempoBase = 0;



    if (rota === "economica") {

        /*
            Rota econômica:
            menos custo, mas demora mais.
        */

        multiplicadorRota = 0.85;

        nomeRota = "Econômica";

        tempoBase = 40;

    }


    else if (rota === "rapida") {

        /*
            Rota rápida:
            mais cara, mas mais veloz.
        */

        multiplicadorRota = 1.20;

        nomeRota = "Rápida";

        tempoBase = 25;

    }


    else {

        multiplicadorRota = 1;

        nomeRota = "Padrão";

        tempoBase = 32;

    }



    /* ----------------------------------------------
       CALCULAR FRETE
    ---------------------------------------------- */

    let frete =
        TAXA_BASE +
        custoDistancia +
        taxaPeso;


    frete =
        frete *
        multiplicadorRota;



    /* ----------------------------------------------
       DESCONTO PARA PEDIDOS GRANDES
    ---------------------------------------------- */

    /*
        Se o pedido passar de R$ 200,
        damos frete grátis em distâncias locais.
    */

    if (
        valorPedido >= 200 &&
        distancia <= 20
    ) {

        frete = 0;

    }



    /*
        Frete mínimo.

        Evita valores muito baixos para
        entregas pequenas.
    */

    if (
        frete < 8 &&
        frete !== 0
    ) {

        frete = 8;

    }



    /* ----------------------------------------------
       TEMPO DE ENTREGA
    ---------------------------------------------- */

    let tempoHoras =
        distancia / 35;


    let tempoMinutos =
        tempoHoras * 60;


    tempoMinutos =
        tempoMinutos +
        tempoBase;



    let dias =
        Math.floor(
            tempoMinutos / 60
        );


    let minutos =
        Math.round(
            tempoMinutos % 60
        );


    let tempoTexto;


    if (dias > 0) {

        tempoTexto =
            dias +
            "h " +
            minutos +
            "min";

    }

    else {

        tempoTexto =
            minutos +
            " min";

    }



    /* ----------------------------------------------
       ARREDONDAR
    ---------------------------------------------- */

    frete =
        Math.round(
            frete * 100
        ) / 100;


    const combustivel =
        Math.round(
            gastoCombustivel * 100
        ) / 100;



    /* ----------------------------------------------
       ATUALIZAR RESULTADO
    ---------------------------------------------- */

    document.getElementById(
        "resultadoOrigem"
    ).textContent =
        origem.nome;


    document.getElementById(
        "resultadoDestino"
    ).textContent =
        destino.nome;


    document.getElementById(
        "frete"
    ).textContent =
        formatarMoeda(frete);


    document.getElementById(
        "distancia"
    ).textContent =
        distancia + " km";


    document.getElementById(
        "combustivel"
    ).textContent =
        formatarMoeda(combustivel);


    document.getElementById(
        "tipoRota"
    ).textContent =
        nomeRota;


    document.getElementById(
        "tempo"
    ).textContent =
        tempoTexto;



    /* ----------------------------------------------
       MENSAGEM
    ---------------------------------------------- */

    let mensagem =
        document.getElementById("mensagem");


    if (frete === 0) {

        mensagem.textContent =
            "Seu pedido ganhou frete grátis. ♡";

    }

    else if (rota === "economica") {

        mensagem.textContent =
            "Você escolheu economizar. Uma escolha consciente. 🌿";

    }

    else if (rota === "rapida") {

        mensagem.textContent =
            "Sua vela chegará pelo caminho mais rápido. ✦";

    }

    else {

        mensagem.textContent =
            "Uma rota equilibrada para o seu pedido. ♡";

    }



    /* ----------------------------------------------
       ATUALIZAR ÁREA DE SUSTENTABILIDADE
    ---------------------------------------------- */

    document.getElementById(
        "kmTotal"
    ).textContent =
        distancia;


    document.getElementById(
        "combustivelEco"
    ).textContent =
        formatarMoeda(combustivel);


}


/* ==================================================
   FORMATAÇÃO DE DINHEIRO
================================================== */

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ==================================================
   ATUALIZAÇÃO AUTOMÁTICA
================================================== */


/*
    Quando o usuário troca o destino,
    podemos recalcular automaticamente
    se já houver um valor no pedido.
*/

document
    .getElementById("destino")
    .addEventListener(
        "change",
        function() {

            const valor =
                document.getElementById(
                    "valorPedido"
                ).value;


            if (valor !== "") {

                calcularEntrega();

            }

        }
    );


/*
    Também recalcula quando muda
    a rota.
*/

const rotas =
    document.querySelectorAll(
        'input[name="rota"]'
    );


rotas.forEach(function(rota) {

    rota.addEventListener(
        "change",
        function() {

            const valor =
                document.getElementById(
                    "valorPedido"
                ).value;


            if (valor !== "") {

                calcularEntrega();

            }

        }
    );

});