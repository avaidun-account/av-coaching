// ===== Mobile nav toggle =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Current year in footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Scroll reveal (mirrors the Synthesis site) =====
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
}

// ===== Booking button =====
// TODO: Replace with your Calendly (or other scheduler) link.
const BOOKING_URL = ""; // e.g. "https://calendly.com/your-handle/consult"
const bookingBtn = document.getElementById("bookingBtn");
if (bookingBtn) {
  bookingBtn.addEventListener("click", (e) => {
    if (BOOKING_URL) {
      bookingBtn.setAttribute("href", BOOKING_URL);
      bookingBtn.setAttribute("target", "_blank");
      bookingBtn.setAttribute("rel", "noopener");
    } else {
      e.preventDefault();
      document.getElementById("contactForm").scrollIntoView({ behavior: "smooth" });
    }
  });
}

// ===== Contact form =====
// Front-end-only handler. To receive submissions, connect a service like
// Formspree or Netlify Forms and set the endpoint below.
const FORMSPREE_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxx"

const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  note.className = "form-note";
  note.textContent = "";

  const name = form.name.value.trim();
  const email = form.email.value.trim();

  if (!name || !email) {
    note.classList.add("err");
    note.textContent = "Please add your name and email.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    note.classList.add("err");
    note.textContent = "That email doesn't look right — mind checking it?";
    return;
  }

  if (FORMSPREE_ENDPOINT) {
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error("Request failed");
      note.classList.add("ok");
      note.textContent = "Thanks! I'll be in touch within 24 hours.";
      form.reset();
    } catch (err) {
      note.classList.add("err");
      note.textContent = "Something went wrong. Please email me directly instead.";
    }
  } else {
    console.log("Contact form submission:", {
      name,
      email,
      goal: form.goal.value,
      message: form.message.value,
    });
    note.classList.add("ok");
    note.textContent = "Thanks! I'll be in touch within 24 hours. (Demo mode — connect a form backend to receive messages.)";
    form.reset();
  }
});
