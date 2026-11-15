document.addEventListener('DOMContentLoaded', function() {
  // Определяем текущую страницу (убираем возможные слэши и параметры запроса)
  const currentPage = window.location.pathname.split('/').pop().split('?')[0] || 'index.html';

  // ==========================================
  // 1. ЗАГРУЗКА ШАПКИ (HEADER)
  // ==========================================
  fetch('./header.html')
    .then(response => {
      if (!response.ok) throw new Error('Файл не найден (404)');
      return response.text();
    })
    .then(html => {
      // Вставляем шапку в начало body
      document.body.insertAdjacentHTML('afterbegin', html);
      
      // Подсветка активного пункта меню в шапке
      const headerLinks = document.querySelectorAll('#nav a, .main-menu a');
      headerLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop().split('?')[0] || 'index.html';
        if (linkPage === currentPage) {
          link.parentElement.classList.add('current-menu-item');
          link.setAttribute('aria-current', 'page');
        }
      });
    })
    .catch(err => console.error('Ошибка загрузки header.html:', err));

  // ==========================================
  // 2. ЗАГРУЗКА ПОДВАЛА (FOOTER)
  // ==========================================
  fetch('./footer.html')
    .then(response => {
      if (!response.ok) throw new Error('Файл не найден (404)');
      return response.text();
    })
    .then(html => {
      // Вставляем подвал в конец body
      document.body.insertAdjacentHTML('beforeend', html);
      
      // Подсветка активного пункта меню в подвале
      const footerLinks = document.querySelectorAll('#menu-footer a');
      footerLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop().split('?')[0] || 'index.html';
        if (linkPage === currentPage) {
          link.parentElement.classList.add('current-menu-item');
          link.setAttribute('aria-current', 'page');
        }
      });
    })
    .catch(err => console.error('Ошибка загрузки footer.html:', err));
});
