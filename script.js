document.addEventListener("DOMContentLoaded", () => {

  // --- Contador de cuenta atrás ---
const eventDate = new Date(2026, 3, 19, 0, 0, 0).getTime();


  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      document.getElementById("dies").textContent = "00";
      document.getElementById("hores").textContent = "00";
      document.getElementById("minuts").textContent = "00";
      document.getElementById("segons").textContent = "00";

      // Mensaje cuando llegue a cero
      const countdown = document.querySelector(".countdown");
      if (!document.querySelector(".started")) {
        countdown.insertAdjacentHTML(
          "afterend",
          "<p class='started'>🎉 L’esdeveniment ha començat!</p>"
        );
      }
      return;
    }

    const dies = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hores = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minuts = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const segons = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("dies").textContent = dies.toString().padStart(2, "0");
    document.getElementById("hores").textContent = hores.toString().padStart(2, "0");
    document.getElementById("minuts").textContent = minuts.toString().padStart(2, "0");
    document.getElementById("segons").textContent = segons.toString().padStart(2, "0");
  }

  // Ejecutar cada segundo
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- Animación de tarjetas con IntersectionObserver ---
  const cards = document.querySelectorAll(".fade-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 200);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach((card) => observer.observe(card));

  // --- Cambio de color del menú con scroll ---
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((sec) => {
      const top = window.scrollY;
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      if (top >= offset && top < offset + height) {
        current = sec.getAttribute("id");
      }
    });
    navLinks.forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("href") === `#${current}`) {
        a.classList.add("active");
      }
    });
  });

  // --- Animación de entrada izquierda a derecha ---
  const items = document.querySelectorAll('.reveal');

  if (!items.length || !('IntersectionObserver' in window)) {
    // Si no hay soporte de IntersectionObserver, mostramos todo
    items.forEach(el => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  items.forEach(el => io.observe(el));

  // --- Animación de rebote en los enlaces de navegación ---
  const navLinksWithBounce = document.querySelectorAll('.nav-link');
  navLinksWithBounce.forEach(link => {
    link.addEventListener('click', (e) => {
      link.classList.add('nav-link-bounce');
      setTimeout(() => {
        link.classList.remove('nav-link-bounce');
      }, 500); // Duración del rebote
    });
  });
});







