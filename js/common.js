/* =====================================
الإعدادات والوظائف المشتركة للموقع
===================================== */

document.addEventListener("DOMContentLoaded", function () {
"use strict";

// تحديث السنة تلقائيًا في أي عنصر يحمل هذا المعرّف
const yearElement = document.getElementById("currentYear");

if (yearElement) {
yearElement.textContent = new Date().getFullYear();
}

// تحديد رابط الصفحة الحالية في القائمة
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navigationLinks = document.querySelectorAll(".nav-link");

navigationLinks.forEach(function (link) {
const linkPage = (link.getAttribute("href") || "").split("/").pop();

```
if (linkPage === currentPage) {
  link.classList.add("active");
  link.setAttribute("aria-current", "page");
} else {
  link.classList.remove("active");
  link.removeAttribute("aria-current");
}
```

});

// إظهار رسالة للمستخدم عند الحاجة
window.showMessage = function (message, type) {
const messageType = type || "info";
let messageBox = document.getElementById("globalMessage");

```
if (!messageBox) {
  messageBox = document.createElement("div");
  messageBox.id = "globalMessage";
  messageBox.className = "message";
  messageBox.setAttribute("role", "status");
  messageBox.setAttribute("aria-live", "polite");

  const main = document.querySelector("main");

  if (main) {
    main.prepend(messageBox);
  } else {
    document.body.prepend(messageBox);
  }
}

messageBox.className = "message message-" + messageType;
messageBox.textContent = String(message);
messageBox.hidden = false;
```

};

// إخفاء الرسالة العامة
window.hideMessage = function () {
const messageBox = document.getElementById("globalMessage");

```
if (messageBox) {
  messageBox.hidden = true;
  messageBox.textContent = "";
}
```

};

// منع إرسال النماذج الفارغة التي تستخدم هذا الصنف
document.querySelectorAll("form[data-check-required]").forEach(function (form) {
form.addEventListener("submit", function (event) {
const requiredFields = form.querySelectorAll("[required]");
let firstInvalidField = null;

```
  requiredFields.forEach(function (field) {
    if (!field.checkValidity() && !firstInvalidField) {
      firstInvalidField = field;
    }
  });

  if (firstInvalidField) {
    event.preventDefault();
    firstInvalidField.reportValidity();
  }
});
```

});

});

