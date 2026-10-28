const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const backToTopBtn = document.getElementById("back-to-top");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const modal = document.getElementById("testimonial-modal");
const modalClose = document.getElementById("modal-close");
const modalName = document.getElementById("modal-name");
const modalRole = document.getElementById("modal-role");
const modalFeedback = document.getElementById("modal-feedback");
const revealElements = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-btn");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

const THEME_KEY = "portfolio-theme";

const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const isDark = savedTheme === "dark";

  document.body.classList.toggle("dark", isDark);
  themeIcon.textContent = isDark ? "☀️" : "🌙";
};

const toggleTheme = () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  themeIcon.textContent = isDark ? "☀️" : "🌙";
};

const toggleMobileMenu = () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
};

const closeMobileMenu = () => {
  navMenu.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
};

const setActiveNavLink = () => {
  const scrollY = window.scrollY + 130;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
};

const filterProjects = (category) => {
  projectCards.forEach((card) => {
    const matches = category === "all" || card.dataset.category === category;
    card.style.display = matches ? "block" : "none";
  });
};

const openModal = (card) => {
  modalName.textContent = card.dataset.name;
  modalRole.textContent = card.dataset.role;
  modalFeedback.textContent = card.dataset.feedback;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

const validateName = () => {
  const value = nameInput.value.trim();
  if (value.length < 2) {
    nameError.textContent = "Please enter at least 2 characters.";
    return false;
  }
  nameError.textContent = "";
  return true;
};

const validateEmail = () => {
  const value = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    emailError.textContent = "Please enter a valid email address.";
    return false;
  }
  emailError.textContent = "";
  return true;
};

const validateMessage = () => {
  const value = messageInput.value.trim();
  if (value.length < 10) {
    messageError.textContent = "Message must be at least 10 characters long.";
    return false;
  }
  messageError.textContent = "";
  return true;
};

const updateSubmitState = () => {
  const isValid = validateName() && validateEmail() && validateMessage();
  submitButton.disabled = !isValid;
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  updateSubmitState();

  if (submitButton.disabled) return;

  submitButton.textContent = "Message Sent";
  submitButton.disabled = true;
  contactForm.reset();

  setTimeout(() => {
    submitButton.textContent = "Send Message";
    updateSubmitState();
  }, 1500);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        if (entry.target.classList.contains("skill-card")) {
          const progress = entry.target.querySelector(".progress span");
          const level = entry.target.dataset.level;
          progress.style.width = `${level}%`;
        }
      }
    });
  },
  {
    threshold: 0.2,
  },
);

revealElements.forEach((element) => observer.observe(element));

navToggle.addEventListener("click", toggleMobileMenu);
navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

themeToggle.addEventListener("click", toggleTheme);

window.addEventListener("scroll", () => {
  setActiveNavLink();
  backToTopBtn.style.opacity = window.scrollY > 500 ? "1" : "0";
  backToTopBtn.style.pointerEvents = window.scrollY > 500 ? "auto" : "none";
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filterProjects(button.dataset.filter);
  });
});

testimonialCards.forEach((card) => {
  card.addEventListener("click", () => openModal(card));
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener("input", updateSubmitState);
  input.addEventListener("blur", updateSubmitState);
});

contactForm.addEventListener("submit", handleFormSubmit);

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

initTheme();
setActiveNavLink();
updateSubmitState();