document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop().split('?')[0] || 'index.html';

  // 1. Загрузка ШАПКИ
  fetch('./header.html')
    .then(r => r.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      // Подсветка меню
      document.querySelectorAll('#nav a, .main-menu a').forEach(link => {
        if ((link.getAttribute('href').split('/').pop().split('?')[0] || 'index.html') === currentPage) {
          link.parentElement.classList.add('current-menu-item');
          link.setAttribute('aria-current', 'page');
        }
      });
    });

  // 2. Загрузка ПОДВАЛА с принудительным выполнением скриптов
  fetch('./footer.html')
    .then(r => r.text())
    .then(html => {
      // Создаем временный контейнер
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Извлекаем и выполняем скрипты по порядку
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        // Копируем все атрибуты (src, id, type и т.д.)
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        // Если скрипт инлайновый (без src), копируем его содержимое
        if (!oldScript.src) {
          newScript.textContent = oldScript.textContent;
        }
        document.body.appendChild(newScript);
      });
      
      // Вставляем сам HTML футера (без скриптов, чтобы не дублировать)
      scripts.forEach(s => s.remove());
      document.body.insertAdjacentHTML('beforeend', tempDiv.innerHTML);
      
      // Подсветка меню в футере
      document.querySelectorAll('#menu-footer a').forEach(link => {
        if ((link.getAttribute('href').split('/').pop().split('?')[0] || 'index.html') === currentPage) {
          link.parentElement.classList.add('current-menu-item');
          link.setAttribute('aria-current', 'page');
        }
      });
    })
    .catch(err => console.error('Ошибка загрузки footer.html:', err));
});
