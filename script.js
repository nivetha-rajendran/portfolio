// Simple scroll animation and console message
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded successfully ✅");

  // Smooth scroll for nav links
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
});
