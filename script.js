// Мобильное меню - ИСПРАВЛЕННАЯ ВЕРСИЯ
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const body = document.body;

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-toggle') && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Модальное окно для входа/регистрации
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');

    function createAuthModal(type) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${type === 'login' ? 'Вход' : 'Регистрация'}</h2>
                <form>
                    ${type === 'register' ? '<input type="text" placeholder="Имя" required>' : ''}
                    <input type="email" placeholder="Email" required>
                    <input type="password" placeholder="Пароль" required>
                    ${type === 'register' ? '<input type="password" placeholder="Подтвердите пароль" required>' : ''}
                    <button type="submit">${type === 'login' ? 'Войти' : 'Зарегистрироваться'}</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        const closeModal = () => {
            document.body.removeChild(modal);
        };
        
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        modal.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert(`${type === 'login' ? 'Вход' : 'Регистрация'} выполнен успешно!`);
            closeModal();
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => createAuthModal('login'));
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', () => createAuthModal('register'));
    }

    // Анимации при прокрутке
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .step, .product-card, .supplier-card, .team-member, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Инициализация анимаций
    const animatedElements = document.querySelectorAll('.feature-card, .step, .product-card, .supplier-card, .team-member, .contact-card');
    if (animatedElements.length > 0) {
        animatedElements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
    }
});

// Стили для модального окна
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .modal-content {
        background: white;
        padding: 30px;
        border-radius: 10px;
        width: 90%;
        max-width: 400px;
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
    }
    
    .modal h2 {
        margin-bottom: 20px;
        text-align: center;
    }
    
    .modal form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .modal input {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
    }
    
    .modal button {
        padding: 12px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .modal button:hover {
        background: #ff5252;
    }
`;

document.head.appendChild(modalStyles);