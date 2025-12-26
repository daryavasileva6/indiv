const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

function openMenu() {
  navLinks.classList.add('active');
  burger.classList.add('is-open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  navLinks.classList.remove('active');
  burger.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

function toggleMenu() {
  const isOpen = navLinks.classList.contains('active');
  isOpen ? closeMenu() : openMenu();
}

burger.addEventListener('click', toggleMenu);

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (e) => {
  const inside = navLinks.contains(e.target) || burger.contains(e.target);
  if (!inside) closeMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Элементы модального окна
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalTitle = document.getElementById('modalTitle');
const modalStats = document.getElementById('modalStats');
const closeModal = document.getElementById('closeModal');
const fullscreenToggle = document.getElementById('fullscreenToggle');

// Обработчики для видео-блоков
document.querySelectorAll('.video-item').forEach(item => {
  item.addEventListener('click', function() {
    const videoSrc = this.getAttribute('data-video');
    const title = this.getAttribute('data-title');
    const stats = this.getAttribute('data-stats');
    
    // Устанавливаем видео и информацию
    modalVideo.src = videoSrc;
    modalTitle.textContent = title;
    modalStats.textContent = stats;
    
    // Показываем модальное окно
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    
    // Автозапуск видео
    modalVideo.play().catch(e => console.log('Автовоспроизведение заблокировано'));
  });
});

// Закрытие модального окна
closeModal.addEventListener('click', function() {
  closeVideoModal();
});

// Закрытие по клику на фон
videoModal.addEventListener('click', function(e) {
  if (e.target === videoModal) {
    closeVideoModal();
  }
});

// Закрытие по Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && videoModal.classList.contains('active')) {
    closeVideoModal();
  }
});

// Функция закрытия модального окна
function closeVideoModal() {
  modalVideo.pause();
  videoModal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку
  
  // Сброс видео
  modalVideo.currentTime = 0;
}

// Полноэкранный режим
fullscreenToggle.addEventListener('click', function() {
  if (!document.fullscreenElement) {
    if (modalVideo.requestFullscreen) {
      modalVideo.requestFullscreen();
    } else if (modalVideo.webkitRequestFullscreen) {
      modalVideo.webkitRequestFullscreen();
    } else if (modalVideo.msRequestFullscreen) {
      modalVideo.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
});

// Автозапуск превью при наведении (опционально)
document.querySelectorAll('.video-preview video').forEach(video => {
  const item = video.closest('.video-item');
  
  item.addEventListener('mouseenter', function() {
    video.play().catch(e => {});
  });
  
  item.addEventListener('mouseleave', function() {
    video.pause();
    video.currentTime = 0;
  });
});
</script>