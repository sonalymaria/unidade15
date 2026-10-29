document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const menuToggle = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#menu-principal");
  const themeToggle = document.querySelector("#theme-toggle");
  const themeIcon = document.querySelector("#theme-icon");
  const greeting = document.querySelector("#saudacao");
  const year = document.querySelector("#ano");
  const form = document.querySelector("#contact-form");
  const formFeedback = document.querySelector("#form-errors");
  const backToTop = document.querySelector("#back-to-top");
  const typingText = document.querySelector("#typing-text");
  const projectsGrid = document.querySelector("#projects-grid");
  const filterStatus = document.querySelector("#filter-status");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Ano automático no rodapé.
  if (year) year.textContent = new Date().getFullYear();

  // Saudação de acordo com o horário local.
  if (greeting) {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) greeting.textContent = "Bom dia! Seja bem-vinda ☆";
    else if (hour >= 12 && hour < 18) greeting.textContent = "Boa tarde! Seja bem-vinda ☆";
    else greeting.textContent = "Boa noite! Seja bem-vinda ☆";
  }

  // Tema salvo no navegador. Só aceita os valores conhecidos.
  function applyTheme(theme) {
    const isDark = theme === "dark";
    if (isDark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
      themeToggle.title = isDark ? "Ativar modo claro" : "Ativar modo escuro";
    }
    if (themeIcon) themeIcon.textContent = isDark ? "☀" : "☾";
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = isDark ? "#1b1423" : "#fff0f7";
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem("sonaly-portfolio-theme"); } catch (error) { /* armazenamento indisponível */ }
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      try { localStorage.setItem("sonaly-portfolio-theme", nextTheme); } catch (error) { /* modo continua funcionando sem armazenamento */ }
    });
  }

  // Menu responsivo com Escape e fechamento após escolher um link.
  function closeMenu() {
    if (!menuToggle || !menu) return;
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      menuToggle.setAttribute("aria-label", expanded ? "Abrir menu de navegação" : "Fechar menu de navegação");
      menu.classList.toggle("is-open", !expanded);
      if (!expanded) {
        const firstLink = menu.querySelector("a");
        if (window.matchMedia("(max-width: 760px)").matches && firstLink) firstLink.focus();
      }
    });

    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const wasOpen = menu.classList.contains("is-open");
        closeMenu();
        if (wasOpen && menuToggle) menuToggle.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // Efeito de digitação no hero.
  if (typingText) {
    const phrases = ["Explorando tecnologia e criatividade", "Transformando ideias em projetos", "Um pouquinho de glitter digital ♡"];
    if (reduceMotion) {
      typingText.textContent = phrases[0];
    } else {
      let phraseIndex = 0;
      let charIndex = phrases[0].length;
      let deleting = true;
      typingText.textContent = phrases[0];

      function typeLoop() {
        const phrase = phrases[phraseIndex];
        if (deleting) {
          charIndex--;
          typingText.textContent = phrase.slice(0, Math.max(0, charIndex));
          if (charIndex <= 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            window.setTimeout(typeLoop, 350);
            return;
          }
          window.setTimeout(typeLoop, 35);
        } else {
          const nextPhrase = phrases[phraseIndex];
          charIndex++;
          typingText.textContent = nextPhrase.slice(0, charIndex);
          if (charIndex >= nextPhrase.length) {
            deleting = true;
            window.setTimeout(typeLoop, 1600);
            return;
          }
          window.setTimeout(typeLoop, 65);
        }
      }
      window.setTimeout(typeLoop, 1800);
    }
  }

  // Brilhos decorativos, criados sem interferir com a navegação.
  const twinkleLayer = document.querySelector("#twinkle-layer");
  if (twinkleLayer && !reduceMotion) {
    const symbols = ["✧", "✦", "⋆", "♡"];
    for (let index = 0; index < 18; index += 1) {
      const star = document.createElement("span");
      star.className = "twinkle";
      star.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      star.style.left = `${Math.random() * 94 + 3}%`;
      star.style.top = `${Math.random() * 94 + 3}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      twinkleLayer.appendChild(star);
    }
  }

  // Cards gerados a partir de dados: para adicionar um projeto, edite este array.
  const projects = [
    {
      title: "Meu blog pessoal",
      type: "WEB DESIGN",
      description: "Um espaço personalizado para compartilhar interesses, pensamentos e inspirações.",
      technologies: ["HTML", "CSS"],
      symbol: "♡",
      preview: "preview-pink",
      label: "MY LITTLE BLOG",
      link: "#contato",
      linkText: "Conhecer projeto →"
    },
    {
      title: "Scrapbook digital",
      type: "CREATIVE PROJECT",
      description: "Uma colagem digital com stickers, GIFs, cores e referências visuais.",
      technologies: ["Design", "CSS"],
      symbol: "✧",
      preview: "preview-purple",
      label: "DIGITAL SCRAPBOOK",
      link: "#contato",
      linkText: "Conhecer projeto →"
    },
    {
      title: "Próximo projeto",
      type: "IN PROGRESS",
      description: "Um espaço para apresentar uma nova ideia assim que ela estiver pronta.",
      technologies: ["JavaScript", "HTML"],
      symbol: "☆",
      preview: "preview-blue",
      label: "NEW IDEAS",
      link: "#contato",
      linkText: "Fale comigo →"
    }
  ];

  function renderProjects(filter = "Todos") {
    if (!projectsGrid) return;
    projectsGrid.replaceChildren();
    const filteredProjects = projects.filter((project) =>
      filter === "Todos" || project.technologies.includes(filter)
    );

    filteredProjects.forEach((project) => {
      const article = document.createElement("article");
      article.className = "card project-card reveal is-visible";

      const preview = document.createElement("div");
      preview.className = `project-preview ${project.preview}`;
      preview.setAttribute("aria-hidden", "true");

      const symbol = document.createElement("span");
      symbol.textContent = project.symbol;
      const label = document.createElement("p");
      label.textContent = project.label;
      preview.append(symbol, label);

      const content = document.createElement("div");
      content.className = "project-content";

      const type = document.createElement("span");
      type.className = "project-type";
      type.textContent = project.type;
      const title = document.createElement("h3");
      title.textContent = project.title;
      const description = document.createElement("p");
      description.textContent = project.description;
      const tags = document.createElement("div");
      tags.className = "tag-list";
      project.technologies.forEach((technology) => {
        const tag = document.createElement("span");
        tag.textContent = technology;
        tags.appendChild(tag);
      });
      const link = document.createElement("a");
      link.className = "project-link";
      link.href = project.link;
      link.textContent = project.linkText;

      content.append(type, title, description, tags, link);
      article.append(preview, content);
      projectsGrid.appendChild(article);
    });

    if (filterStatus) {
      filterStatus.textContent = `${filteredProjects.length} ${filteredProjects.length === 1 ? "projeto encontrado" : "projetos encontrados"}${filter === "Todos" ? "." : ` para ${filter}.`}`;
    }
  }

  renderProjects();
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderProjects(filter);
    });
  });

  // Entrada suave das seções. Sem IntersectionObserver, o conteúdo continua visível.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Botão voltar ao topo aparece apenas após rolar a página.
  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("is-visible", window.scrollY > 350);
  }
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  // Validação acessível do formulário. Não transmite nem armazena os dados.
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
      consentimento: document.querySelector("#consentimento-error")
    };

    function showError(fieldName, message) {
      const field = fields[fieldName];
      const errorElement = errorElements[fieldName];
      if (errorElement) errorElement.textContent = message;
      if (field) {
        if (message) field.setAttribute("aria-invalid", "true");
        else field.removeAttribute("aria-invalid");
      }
    }

    function validateForm() {
      let isValid = true;
      const name = fields.nome.value.trim();
      const email = fields.email.value.trim();
      const message = fields.mensagem.value.trim();
      const consent = fields.consentimento.checked;
      Object.keys(errorElements).forEach((key) => showError(key, ""));
      formFeedback.textContent = "";
      formFeedback.className = "form-feedback";

      if (name.length < 2) {
        showError("nome", "Digite seu nome com pelo menos 2 caracteres.");
        isValid = false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showError("email", "Digite um endereço de e-mail válido.");
        isValid = false;
      }
      if (message.length < 20) {
        showError("mensagem", "A mensagem precisa ter pelo menos 20 caracteres.");
        isValid = false;
      }
      if (!consent) {
        showError("consentimento", "Marque a caixa após ler o aviso de privacidade.");
        isValid = false;
      }

      if (isValid) {
        formFeedback.textContent = "Tudo certo! Os campos foram validados. Esta demonstração não envia nem armazena a mensagem.";
        formFeedback.classList.add("success");
      } else {
        formFeedback.textContent = "Existem campos que precisam ser corrigidos. Confira as mensagens indicadas no formulário.";
        formFeedback.classList.add("error");
      }
      return isValid;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateForm()) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
      } else {
        formFeedback.focus();
      }
    });

    fields.nome.addEventListener("input", () => {
      if (fields.nome.value.trim().length >= 2) showError("nome", "");
    });
    fields.email.addEventListener("input", () => {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) showError("email", "");
    });
    fields.mensagem.addEventListener("input", () => {
      if (fields.mensagem.value.trim().length >= 20) showError("mensagem", "");
    });
    fields.consentimento.addEventListener("change", () => {
      if (fields.consentimento.checked) showError("consentimento", "");
    });
  }
});
