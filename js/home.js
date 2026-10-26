```javascript
/* ========================================
   الصفحة الرئيسية لموقع شاطر
   لكل سؤال باب
======================================== */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // البحث عن عنصر داخل الصفحة
  const select = (selector) => document.querySelector(selector);

  // ========================================
  // 1. الانتقال السلس إلى أقسام الصفحة
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.getElementById(targetId.slice(1));

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // ========================================
  // 2. إظهار تأثير بسيط عند ظهور الأقسام
  // ========================================

  const animatedElements = document.querySelectorAll(
    ".feature-card, .about-panel, .limitations-panel, .join-panel"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    animatedElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    animatedElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  // ========================================
  // 3. زر العودة إلى أعلى الصفحة
  // يعمل إذا كان الزر موجودًا في HTML
  // ========================================

  const backToTop = select("[data-back-to-top]");

  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        backToTop.hidden = window.scrollY < 350;
      },
      { passive: true }
    );

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ========================================
  // 4. تحديث سنة حقوق النشر
  // ========================================

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // ========================================
  // 5. حماية روابط الصفحة الداخلية
  // لا نمنع الروابط التي لا تملك أقسامًا بعد
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      const targetId = link.getAttribute("href");

      if (targetId === "#about") {
        const aboutSection = document.getElementById("about");

        if (aboutSection) {
          aboutSection.setAttribute("tabindex", "-1");
        }
      }
    });
  });

});
```
