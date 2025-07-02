document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 50);

  document.querySelectorAll("a").forEach(link => {
    // Пропускаем внешние ссылки, якоря и ссылки Fancybox
    const href = link.getAttribute("href");
    if (!href
        || (href.startsWith("http") && !href.startsWith(window.location.origin))
        || href.startsWith("#")
        || link.hasAttribute("data-fancybox")  // <- добавили исключение для fancybox
    ) {
      return;
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetUrl = link.href;
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 600);
    });
  });
});
