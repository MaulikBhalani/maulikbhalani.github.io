document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const currentYearDesktop = document.getElementById("current-year");
  if (currentYearDesktop) {
    currentYearDesktop.textContent = new Date().getFullYear();
  }
  const currentYearMobile = document.getElementById("current-year-mobile");
  if (currentYearMobile) {
    currentYearMobile.textContent = new Date().getFullYear();
  }

  // Custom Cursor Logic
  const customCursor = document.getElementById("custom-cursor");
  // Select elements that should trigger cursor hover effect
  const interactiveElements = document.querySelectorAll("a, button, .group");

  document.addEventListener("mousemove", (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  });

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      customCursor.classList.add("hovered");
    });
    el.addEventListener("mouseleave", () => {
      customCursor.classList.remove("hovered");
    });
  });

  // Mobile Menu Logic
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const closeMobileMenuButton = document.getElementById("close-mobile-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.add("open");
  });

  closeMobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });

  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });

  // Smooth Scrolling for Navigation
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Keep this to prevent the instant jump

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });

        setTimeout(() => {
          history.pushState(null, "", targetId);
        }, 300);
      }
    });
  });

  // Active Navigation Link Highlighting (using Intersection Observer)
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link"); // Include both desktop and mobile nav links

  const observerOptions = {
    root: null, // viewport
    rootMargin: "-50% 0px -50% 0px", // Adjusted to activate when section is roughly in the middle
    threshold: 0, // Threshold 0 means as soon as any part of the target enters the viewport
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentSectionId = entry.target.id;

        // Handle custom cursor color based on section background
        if (currentSectionId === "home") {
          customCursor.classList.add("cursor-light"); // Make cursor white on home section
        } else {
          customCursor.classList.remove("cursor-light"); // Make cursor default (purple) on other sections
        }

        navLinks.forEach((link) => {
          // Remove 'active' class from all links first
          link.classList.remove("active");

          // If the link corresponds to the current section, add the 'active' class
          if (link.dataset.section === currentSectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Light/Dark Mode Toggle Logic
  const themeToggleBtn = document.getElementById("theme-toggle");
  const lightIcon = document.getElementById("theme-toggle-light-icon");
  const darkIcon = document.getElementById("theme-toggle-dark-icon");
  const bodyElement = document.body; // Target the body element for data-theme

  // Function to set theme
  const setTheme = (theme) => {
    bodyElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      lightIcon.classList.add("hidden");
      darkIcon.classList.remove("hidden");
    } else {
      lightIcon.classList.remove("hidden");
      darkIcon.classList.add("hidden");
    }
    localStorage.setItem("theme", theme);
  };

  // Check saved theme preference on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // If no preference saved, check system preference
    setTheme("dark");
  } else {
    setTheme("light"); // Default to light if no preference and system is not dark
  }

  // Toggle theme on button click
  themeToggleBtn.addEventListener("click", () => {
    if (bodyElement.getAttribute("data-theme") === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  });
});
