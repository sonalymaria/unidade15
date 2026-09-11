// ================================
// LUMINA - LOGIN
// ================================

const form = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const formStatus = document.getElementById("formStatus");

const togglePassword = document.getElementById("togglePassword");
const guestButton = document.getElementById("guestButton");
const forgotPassword = document.getElementById("forgotPassword");
const signupLink = document.getElementById("signupLink");


// ================================
// FUNÇÕES
// ================================

function clearErrors() {
    emailError.textContent = "";
    passwordError.textContent = "";
    formStatus.textContent = "";
}


function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}


// ================================
// MOSTRAR / OCULTAR SENHA
// ================================

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        const senhaVisivel = password.type === "text";

        if (senhaVisivel) {

            password.type = "password";

            togglePassword.textContent = "Mostrar";

            togglePassword.setAttribute(
                "aria-label",
                "Mostrar senha"
            );

        } else {

            password.type = "text";

            togglePassword.textContent = "Ocultar";

            togglePassword.setAttribute(
                "aria-label",
                "Ocultar senha"
            );
        }

    });

}


// ================================
// LOGIN
// ================================

if (form) {

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        clearErrors();

        const emailValue = email.value.trim();
        const passwordValue = password.value;


        // ----------------------------
        // VALIDAÇÃO DO E-MAIL
        // ----------------------------

        if (!emailValue) {

            emailError.textContent =
                "Digite seu e-mail.";

            email.focus();

            return;
        }


        if (!validateEmail(emailValue)) {

            emailError.textContent =
                "Digite um e-mail válido.";

            email.focus();

            return;
        }


        // ----------------------------
        // VALIDAÇÃO DA SENHA
        // ----------------------------

        if (!passwordValue) {

            passwordError.textContent =
                "Digite sua senha.";

            password.focus();

            return;
        }


        if (passwordValue.length < 6) {

            passwordError.textContent =
                "A senha deve ter pelo menos 6 caracteres.";

            password.focus();

            return;
        }


        // ----------------------------
        // MOSTRA STATUS
        // ----------------------------

        formStatus.textContent =
            "Entrando...";


        // Desabilita o botão para evitar
        // vários envios ao mesmo tempo

        const submitButton =
            form.querySelector(".submit-button");

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Entrando...";
        }


        try {

            // ----------------------------
            // ENVIA PARA O BACK-END
            // ----------------------------

            const response = await fetch(
                "/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: emailValue,
                        senha: passwordValue
                    })
                }
            );


            const data = await response.json();


            // ----------------------------
            // LOGIN INCORRETO
            // ----------------------------

            if (!response.ok) {

                formStatus.textContent =
                    data.erro ||
                    "E-mail ou senha incorretos.";

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Entrar na minha conta";
                }

                return;
            }


            // ----------------------------
            // LOGIN CORRETO
            // ----------------------------

            if (data.sucesso) {

                formStatus.textContent =
                    "Login realizado com sucesso!";


                // Salva o token recebido
                // pelo servidor

                localStorage.setItem(
                    "token",
                    data.token
                );


                // Salva os dados do usuário

                if (data.usuario) {

                    localStorage.setItem(
                        "usuario",
                        JSON.stringify(data.usuario)
                    );
                }


                // ----------------------------
                // REDIRECIONAMENTO
                // ----------------------------

                setTimeout(() => {

                    window.location.href =
                        "inicio.html";

                }, 800);

            }

        } catch (error) {

            console.error(
                "Erro no login:",
                error
            );


            formStatus.textContent =
                "Não foi possível conectar ao servidor.";


            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Entrar na minha conta";
            }
        }

    });

}


// ================================
// CONTINUAR COMO VISITANTE
// ================================

if (guestButton) {

    guestButton.addEventListener(
        "click",
        () => {

            clearErrors();

            formStatus.textContent =
                "Entrando como visitante...";


            setTimeout(() => {

                window.location.href =
                    "inicio.html";

            }, 500);

        }
    );

}


// ================================
// ESQUECI MINHA SENHA
// ================================

if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            clearErrors();


            const emailValue =
                email.value.trim();


            if (!emailValue) {

                formStatus.textContent =
                    "Digite seu e-mail para recuperar sua senha.";

                email.focus();

                return;
            }


            if (!validateEmail(emailValue)) {

                emailError.textContent =
                    "Digite um e-mail válido.";

                email.focus();

                return;
            }


            formStatus.textContent =
                "Enviando link de recuperação...";


            // --------------------------------
            // FUTURO:
            // Aqui você poderá conectar com
            // uma rota real:
            //
            // POST /api/recuperar-senha
            // --------------------------------

            setTimeout(() => {

                formStatus.textContent =
                    "Se o e-mail estiver cadastrado, você receberá um link de recuperação.";

            }, 1000);

        }
    );

}


// ================================
// CRIAR CONTA
// ================================

if (signupLink) {

    signupLink.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            window.location.href =
                "cadastro.html";

        }
    );

}


// ================================
// VERIFICA SE USUÁRIO JÁ ESTÁ LOGADO
// ================================

const token =
    localStorage.getItem("token");


// Se existir um token,
// você pode decidir mandar
// o usuário direto para o início.
//
// Deixei comentado para que,
// ao abrir a página de login,
// ela continue aparecendo normalmente.

/*

if (token) {

    window.location.href =
        "inicio.html";
}

*/


// ================================
// ENTER NOS CAMPOS
// ================================

if (email) {

    email.addEventListener(
        "input",
        () => {

            emailError.textContent = "";
            formStatus.textContent = "";

        }
    );

}


if (password) {

    password.addEventListener(
        "input",
        () => {

            passwordError.textContent = "";
            formStatus.textContent = "";

        }
    );

}