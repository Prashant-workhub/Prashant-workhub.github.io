// Typing effect for the subtitle
const typingElement = document.querySelector(".typing");
const phrases = typingElement
  ? JSON.parse(typingElement.getAttribute("data-text"))
  : [];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    typingElement.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typingElement.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 60 : 90);
}

if (typingElement && phrases.length) {
  typeLoop();
}

// IntersectionObserver for reveal animations
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 },
);

reveals.forEach((el) => observer.observe(el));

// Mobile nav toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Active link on scroll
const sections = document.querySelectorAll("section");
const navAnchors = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (scrollY >= top) current = sec.getAttribute("id");
  });

  navAnchors.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

const form = document.querySelector(".contact-form");
const note = document.getElementById("form-note");

if (form && note) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      note.textContent = "Please fill all fields.";
      return;
    }

    if (!validateEmail(email)) {
      note.textContent = "Check your email format.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );

    note.textContent = "Opening your email app to send the message.";
    window.location.href = `mailto:devmail.prashant@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
