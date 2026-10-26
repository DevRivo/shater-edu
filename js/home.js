/* =====================================
وظائف الصفحة الرئيسية
===================================== */

document.addEventListener("DOMContentLoaded", function () {
"use strict";

// التأكد أن الكود يعمل في الصفحة الرئيسية فقط
const homePage = document.querySelector(".home-hero");

if (!homePage) {
return;
}

// الانتقال إلى قسم التعرّف على المنصة
const startButton = document.querySelector('[data-action="start-learning"]');
const learningSection = document.getElementById("about");

if (startButton) {
startButton.addEventListener("click", function (event) {
// لا نغيّر السلوك الافتراضي إذا كان الزر رابطًا إلى صفحة أخرى
const target = startButton.getAttribute("href");

```
  if (target && target !== "#about") {
    return;
  }

  event.preventDefault();

  if (learningSection) {
    learningSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } else {
    window.location.href = "learn.html";
  }
});
```

}

// جعل البطاقات التي تحتوي على رابط قابلة للاستخدام بلوحة المفاتيح
const linkedCards = document.querySelectorAll(".feature-card[data-href]");

linkedCards.forEach(function (card) {
card.setAttribute("tabindex", "0");
card.setAttribute("role", "link");

```
function openCard() {
  const destination = card.getAttribute("data-href");

  if (destination) {
    window.location.href = destination;
  }
}

card.addEventListener("click", function (event) {
  // عدم التدخل في الروابط والأزرار الموجودة داخل البطاقة
  if (event.target.closest("a, button")) {
    return;
  }

  openCard();
});

card.addEventListener("keydown", function (event) {
  if (event.target !== card) {
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openCard();
  }
});
```

});

});
