/**
 * PORTFOLIO EXPRESS - SCRIPT INTERACTIVO
 * Autor: Nacho García
 * Funcionalidades: Navegación móvil, modales dinámicos, scroll suave y gestión de contacto.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elementos del DOM
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  const projectModal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalActionBtn = document.getElementById('modal-action-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  // 2. Control de cabecera al hacer scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // 3. Menú móvil hamburguesa
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar el menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Enlace activo según la sección visible (Scrollspy)
  const sections = document.querySelectorAll('section[id]');
  
  const highlightNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // 5. Gestión del Formulario de Contacto
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      // Estado de carga visual en el botón
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <span>Enviando...</span>
        <svg class="spin-animation" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="10"></circle>
        </svg>
      `;

      setTimeout(() => {
        // Simulación de envío exitoso
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;

        // Limpiar campos
        contactForm.reset();

        // Mostrar notificación toast
        showToast(`¡Gracias, ${nameInput.value}! Tu mensaje ha sido recibido con éxito. Te responderé pronto.`);
      }, 900);
    });
  }

  // 6. Funcionalidad del Toast de Notificación
  let toastTimeout;
  const showToast = (message) => {
    if (!toast) return;

    if (toastMessage) {
      toastMessage.textContent = message;
    }

    toast.classList.add('show');
    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  // 7. Modales de Proyectos (Demos y Detalles de Código)
  const projectDetails = {
    'Asistente Virtual Cognitivo': {
      title: 'Asistente Virtual Cognitivo con RAG',
      description: 'Este proyecto implementa una arquitectura RAG (Retrieval-Augmented Generation) para responder dudas complejas combinando embeddings vectoriales y modelos de lenguaje avanzados.',
      features: [
        'Vectorización semántica con base de datos vectorial de alta velocidad.',
        'Pipeline con LangChain y FastAPI con streaming de respuestas token a token.',
        'Módulo de seguridad para filtrado de prompts y respuestas alucinadas.',
        'Integración con frontends web vía WebSockets y REST.'
      ],
      tech: 'Python, FastAPI, LangChain, FAISS, PostgreSQL, Docker'
    },
    'Hub Automatizado de Alertas': {
      title: 'Hub Automatizado de Extracción y Alertas',
      description: 'Plataforma diseñada para recolectar datos de fuentes web dispersas, normalizar su formato y disparar alertas en tiempo real hacia canales de mensajería y APIs.',
      features: [
        'Scraping resiliente utilizando Playwright y navegadores headless.',
        'Manejo de reintentos exponenciales y validación estricta de esquemas.',
        'Integración multicanal con Slack, Discord y Telegram.',
        'Despliegue contenerizado y monitoreo de salud del servicio.'
      ],
      tech: 'Node.js, Playwright, Webhooks, Docker, Redis'
    },
    'SaaS Dashboard Analítico': {
      title: 'SaaS Dashboard Analítico de Métricas',
      description: 'Panel de control moderno e intuitivo para visualización de métricas en tiempo real con componentes modulares, gráficos dinámicos y diseño responsivo.',
      features: [
        'Visualización fluida con gráficos de tendencias y KPIs interactivos.',
        'Diseño responsive optimizado para escritorio, tablets y smartphones.',
        'Filtrado y agregación de datos por intervalos temporales personalizados.',
        'Arquitectura ligera con carga ultrarrápida y mínimo consumo de recursos.'
      ],
      tech: 'JavaScript Moderno, CSS Grid & Flexbox, Chart.js, HTML5'
    }
  };

  const openModalWithContent = (title, htmlBody) => {
    if (!projectModal) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = htmlBody;
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalActionBtn) modalActionBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Funciones expuestas globalmente para los botones de las tarjetas
  window.openProjectDemo = (projectName) => {
    const data = projectDetails[projectName];
    if (!data) return;

    const contentHtml = `
      <p style="margin-bottom: 1.25rem;">${data.description}</p>
      <h4 style="font-size: 1rem; color: var(--text-main); margin-bottom: 0.75rem;">Características Principales:</h4>
      <ul style="padding-left: 1.25rem; margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem;">
        ${data.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <div style="background: var(--bg-surface-alt); padding: 0.85rem 1rem; border-radius: 8px; font-size: 0.875rem;">
        <strong>Stack Tecnológico:</strong> ${data.tech}
      </div>
    `;

    openModalWithContent(`Demo: ${data.title}`, contentHtml);
  };

  window.openProjectCode = (projectName) => {
    const data = projectDetails[projectName];
    if (!data) return;

    const contentHtml = `
      <p style="margin-bottom: 1rem;">La arquitectura del repositorio para <strong>${data.title}</strong> sigue patrones limpios de diseño modular y tipado estricto:</p>
      <div style="background: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.85rem; margin-bottom: 1rem;">
        📂 ${projectName.toLowerCase().replace(/\s+/g, '-')}/<br>
        ├── 📁 src/<br>
        │   ├── 📁 core/<br>
        │   ├── 📁 services/<br>
        │   └── 📄 main.py<br>
        ├── 📄 tests/test_pipeline.py<br>
        └── 📄 docker-compose.yml
      </div>
      <p style="font-size: 0.9rem; color: var(--text-subtle);">El código está documentado y estructurado con control de versiones Git y pruebas automatizadas.</p>
    `;

    openModalWithContent(`Código: ${data.title}`, contentHtml);
  };
});
