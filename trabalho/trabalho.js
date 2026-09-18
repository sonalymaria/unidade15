let valorContador = 10;

        function mostrarCidade() {
            let cidade = document.getElementById("cidade").value;
            let mensagem = document.getElementById("mensagem");

            mensagem.textContent = "Você escolheu conhecer " + cidade + "!";
        }

        function destacarMensagem() {
            let mensagem = document.getElementById("mensagem");

            mensagem.style.color = "blue";
            mensagem.style.fontSize = "25px";
        }

        function aumentar() {
            valorContador++;

            document.getElementById("contador").textContent = valorContador;
        }

        function diminuir() {
            valorContador--;

            document.getElementById("contador").textContent = valorContador;
        }