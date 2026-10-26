```javascript
/* ==========================================
   شاطر — لكل سؤال باب
   JavaScript المشترك لجميع الصفحات
========================================== */

"use strict";

/* 1. وظائف عامة */
const Shater = {
  // تحديد عنصر واحد
  select(selector, parent = document) {
    return parent.querySelector(selector);
  },

  // تحديد مجموعة عناصر
  selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
  },

  // إظهار رسالة داخل عنصر
  showMessage(element, message, type = "info") {
    if (!element) return;

    element.textContent = message;
    element.className = `alert alert-${type}`;
    element.hidden = false;
    element.setAttribute("role", "status");
  },

  // إخفاء رسالة
  hideMessage(element) {
    if (!element) return;

    element.hidden = true;
    element.textContent = "";
  },

  // الانتقال إلى عنصر داخل الصفحة
  scrollTo(selector) {
    const element = this.select(selector);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }
};

/* 2. تشغيل الوظائف بعد تحميل الصفحة */
document.addEventListener("DOMContentLoaded", () => {

  /* تحديث السنة تلقائيًا */
  Shater.selectAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /* تحديد الرابط النشط في قائمة التنقل */
  const currentPage = (
    window.location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();

  Shater.selectAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    const linkPage = href.split("/").pop().split("#")[0].toLowerCase();

    if (linkPage && linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  /* زر فتح وإغلاق قائمة الهاتف */
  const menuButton = Shater.select("[data-menu-toggle]");
  const navigation = Shater.select("[data-navigation]");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "إغلاق القائمة" : "فتح القائمة"
      );
    });

    // إغلاق القائمة عند الضغط على أحد الروابط
    Shater.selectAll("a", navigation).forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "فتح القائمة");
      });
    });

    // إغلاق القائمة عند الضغط خارجها
    document.addEventListener("click", (event) => {
      if (
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "فتح القائمة");
      }
    });
  }

  /* منع إرسال النماذج الفارغة */
  Shater.selectAll("form[data-check-required]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      const requiredFields = Shater.selectAll(
        "[required]",
        form
      );

      for (const field of requiredFields) {
        if (!field.checkValidity()) {
          event.preventDefault();
          field.reportValidity();
          field.focus();
          return;
        }
      }
    });
  });

  /* تأكيد العناصر التي تحمل خاصية التأكيد */
  Shater.selectAll("[data-confirm]").forEach((element) => {
    element.addEventListener("click", (event) => {
      const message =
        element.getAttribute("data-confirm") ||
        "هل أنت متأكد؟";

      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  });

});

/* إتاحة الوظائف العامة لملفات الصفحات الأخرى */
window.Shater = Shater;
```
