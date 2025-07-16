// Smooth scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Active nav highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (pageYOffset >= section.offsetTop - 100) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Theme toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Testimonials carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial");
setInterval(() => {
  testimonials[currentTestimonial].classList.remove("active");
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial].classList.add("active");
}, 4000);

// Animated Counters
function animateCounter(id, target) {
  let count = 0;
  const increment = target / 100;
  const el = document.getElementById(id);
  const interval = setInterval(() => {
    count += increment;
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.textContent = Math.floor(count);
  }, 20);
}
window.addEventListener("load", () => {
  animateCounter("visitors", 25000);
  animateCounter("slides", 18);
  animateCounter("years", 5);
});

// Booking form: update total price when tickets change
const ticketsInput = document.getElementById("tickets");
const totalPriceSpan = document.getElementById("total-price");
const ticketPrice = 500;

function updateTotal() {
  const numTickets = parseInt(ticketsInput.value) || 0;
  const total = numTickets * ticketPrice;
  totalPriceSpan.textContent = total;
}

ticketsInput.addEventListener("input", updateTotal);
updateTotal();

// Booking form submit
document.getElementById("booking-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const date = document.getElementById("date").value;
  const tickets = parseInt(document.getElementById("tickets").value) || 0;
  const paymentMethod = document.getElementById("payment-method").value;
  const totalPrice = tickets * ticketPrice;

  const booking = {
    name,
    email,
    date,
    tickets,
    totalPrice,
    paymentMethod,
  };

  fetch("http://localhost:5000/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  })
    .then((res) => res.json())
    .then((data) => {
      const resultDiv = document.getElementById("booking-result");
      resultDiv.textContent = "Booking Confirmed!";
      resultDiv.classList.add("success");
      setTimeout(() => {
        resultDiv.textContent = "";
        resultDiv.classList.remove("success");
        this.reset();
        updateTotal();
      }, 3000);
    })
    .catch((err) => {
      console.error(err);
      const resultDiv = document.getElementById("booking-result");
      resultDiv.textContent = "Booking failed. Please try again.";
      resultDiv.classList.add("error");
    });
});

// Scroll fade-in
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll("section").forEach(sec => observer.observe(sec));

// Back to top
const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
