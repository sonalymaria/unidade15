const portfolio = document.querySelector(".portfolio");

const symbols = ["✧", "✦", "⋆", "♡"];

for (let i = 0; i < 18; i++) {
  const star = document.createElement("span");

  star.classList.add("twinkle");
  star.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  star.style.left = `${Math.random() * 94 + 3}%`;
  star.style.top = `${Math.random() * 94 + 3}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;

  portfolio.appendChild(star);
}

//parte chata 1

document.addEventListener("DOMContentLoaded") ,  () => {

const root = document.documentElement;
const menuToggle = 
document.querySelector("#menu-toggle");
const menu =
document.querySelector ("#menu-principal");

const themeToggle =
document.querySelector("#theme-toggle");
const themeIcon =
document.querySelector("#theme-icon");
const greeting = 
document.querySelector("#saudacao");
const year =
document.querySelector("#ano");
const form = 
document.querySelector("#contact-form");
const formErrors =
document.querySelector("#form-errors");

}

/*atualizar ano*/

if (year) {
    year.textContent = new
    Date().getFullYear();
}

/* saudaçao de horario*/

if (greeting) {
    const hour = new Date ().getHours();

    if (hour >= 5 && hour < 12) {
        greeting.textContent = "Bom dia! Seja bem-vindo(a) ☆";
    } else if (hour >= 12 && hour < 18) {
        greeting.textContent = "Boa tarde! Seja bem-vindo(a) ☆";
    } else {
        greeting.textContent = "Boa noite! Seja bem-vindo(a) ☆";
    }
}

/* parte chata 2*/

function closeMenu() {
    if (!menuToggle || !menu) return;
    menu.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu de navegação");

}

if (menuToggle && menu) {

   menuToggle.addEventListener("click", () => { 

   const isExpanded =
   menuToggle.getAttribute("aria-expanded") === "true";

   menuToggle.setAttribute("aria-expanded", String(!isExpanded))); 

   menuToggle.setAttribute("aria-label",
   isExpanded ? "Abrir menu de navegação" : "Fechar menu de navegação"
   );

   menu.classList.toggle("is-open" , ! isExpanded); 


   }


   menu.querySelectorAll("a").forEach((link) => {
   link.addEventListener("click",closeMenu);
});

document.addEventListener("keydown" , (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }

});


// alternar claro e escuro

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark =
        root.getAttribute("data-theme") === "dark";

      if (isDark) {
        root.removeAttribute("data-theme");
      } else {
        root.setAttribute("data-theme", "dark");
      }

      themeToggle.setAttribute(
        "aria-pressed",
        String(!isDark)
      );

      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Ativar modo escuro" : "Ativar modo claro"
      );

      if (themeIcon) {
        themeIcon.textContent = isDark ? "☾" : "☀️";
      }
    });
  }


  // validação do formulário af

    if (form) {
    const fields = {
      nome: document.querySelector("#nome"),
      email: document.querySelector("#email"),
      mensagem: document.querySelector("#mensagem"),
      consentimento: document.querySelector("#consentimento")
    };

    const errorElements = {
      nome: document.querySelector("#nome-error"),
      email: document.querySelector("#email-error"),
      mensagem: document.querySelector("#mensagem-error"),
      consentimento:
        document.querySelector("#consentimento-error")
    };
}
    function showError(fieldName, message) {
      const field = fields[fieldName];
      const errorElement = errorElements[fieldName];

      if (errorElement) {
        errorElement.textContent = message;
      }

      if (field) {
        if (message) {
          field.setAttribute("aria-invalid", "true");
        } else {
          field.removeAttribute("aria-invalid");
        }
      }
    }
  
    function validateForm() {
      let isValid = true;

      const name = fields.nome.value.trim();
      const email = fields.email.value.trim();
      const message = fields.mensagem.value.trim();
      const consent = fields.consentimento.checked;

      Object.keys(errorElements).forEach((key) => {
        showError(key, "");
      });

      formErrors.textContent = "";
    }

      // nome obrigatório ne fia
      if (name.length < 2) {
        showError(
          "nome",
          "Digite seu nome com pelo menos 2 caracteres."
        );
        isValid = false;
      }

    // email tbm
   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        showError(
          "email",
          "Digite um endereço de e-mail válido."
        );
        isValid = false;
      }

   // mensagem de 20 caracteres

   if (message.length < 20) {
        showError(
          "mensagem",
          "A mensagem precisa ter pelo menos 20 caracteres."
        );
        isValid = false;
      }

      // Consentimento obrigatório.
      if (!consent) {
        showError(
          "consentimento",
          "Marque a caixa após ler o aviso de privacidade."
        );
        isValid = false;
      }

      if (isValid) {
        formErrors.textContent =
          "Tudo certo! Os campos foram validados. " +
          "Este formulário é uma demonstração e ainda não envia mensagens.";
      } else {
        formErrors.textContent =
          "Existem campos que precisam ser corrigidos. " +
          "Confira as mensagens indicadas no formulário.";
      }

      return isValid;



    






// footer
document.querySelector("#ano").textContent =
new Date().getFullYear();