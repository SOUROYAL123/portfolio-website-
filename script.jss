// Set footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!expanded));
  if (!expanded) {
    mainNav.style.display = "flex";
  } else {
    mainNav.style.display = "none";
  }
});

// Close nav when resizing back to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    mainNav.style.display = "flex";
  } else {
    mainNav.style.display = "none";
    menuBtn.setAttribute("aria-expanded", "false");
  }
});
