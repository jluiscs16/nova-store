document.addEventListener("DOMContentLoaded", () => {
  // --- Elementos del DOM ---
  const themeToggleBtns = document.querySelectorAll(
    ".header__toggle-btn, .drawer-menu__toggle-btn"
  );
  const menuBtn = document.querySelector(".header__menu-btn");
  const closeMenuBtn = document.querySelector(".drawer-menu__close-btn");
  const drawerMenu = document.querySelector(".drawer-menu");
  const htmlElement = document.documentElement;

  // --- 1. Lógica del Modo Oscuro / Claro ---
  const updateThemeIcon = (theme) => {
    themeToggleBtns.forEach((btn) => {
      const icon = btn.querySelector("i");
      if (icon) {
        if (theme === "dark") {
          icon.className = "fa-solid fa-sun";
        } else {
          icon.className = "fa-solid fa-moon";
        }
      }
    });
  };

  const toggleTheme = () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  };

  // Cargar tema guardado en LocalStorage
  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  // Escuchar eventos de cambio de tema
  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });

  // --- 2. Lógica del Menú Lateral (Drawer) ---
  const openDrawer = () => {
    drawerMenu.classList.add("drawer-menu--active");
  };

  const closeDrawer = () => {
    drawerMenu.classList.remove("drawer-menu--active");
  };

  if (menuBtn) {
    menuBtn.addEventListener("click", openDrawer);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeDrawer);
  }

  // Cerrar el drawer al hacer clic en un enlace del menú
  const drawerLinks = document.querySelectorAll(".drawer-menu__link");
  drawerLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
});