// Main JavaScript File for AffiliateHub

// Global Variables
let currentLanguage = 'ar';
let isLoggedIn = false;
let currentUser = null;

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langToggle = document.getElementById('lang-toggle');
const currentLangSpan = document.getElementById('current-lang');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupScrollAnimations();
    loadUserData();
});

// Initialize Application
function initializeApp() {
    // Set initial language
    const savedLanguage = localStorage.getItem('language') || 'ar';
    setLanguage(savedLanguage);
    
    // Initialize components
    initializeModals();
    initializeNavigation();
    initializeForms();
    
    // Load dynamic content
    loadLeaderboardData();
    loadTutorialVideos();
    
    console.log('AffiliateHub initialized successfully');
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Language Toggle
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollToSection(target.id);
            }
        });
    });
    
    // Form Submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Navigation Functions
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

// Language Functions
function toggleLanguage() {
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
}

function setLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language);
    
    // Update HTML attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Update all translatable elements
    updateTranslations();
    
    // Update language button
    if (currentLangSpan) {
        currentLangSpan.textContent = language === 'ar' ? 'العربية' : 'English';
    }
    
    // Update placeholders
    updatePlaceholders();
    
    console.log(`Language changed to: ${language}`);
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });
}

function updatePlaceholders() {
    const placeholders = {
        ar: {
            'chat-input-field': 'اكتب رسالتك هنا...',
            'newsletter-email': 'البريد الإلكتروني'
        },
        en: {
            'chat-input-field': 'Type your message here...',
            'newsletter-email': 'Email Address'
        }
    };
    
    Object.keys(placeholders[currentLanguage]).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.placeholder = placeholders[currentLanguage][id];
        }
    });
}

// Modal Functions
function initializeModals() {
    // Add modal backdrop click handlers
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

function switchModal(currentModalId, targetModalId) {
    closeModal(currentModalId);
    setTimeout(() => openModal(targetModalId), 100);
}

function openLoginModal() {
    openModal('login-modal');
}

function openRegisterModal() {
    openModal('register-modal');
}

// Form Handling
function initializeForms() {
    // Add floating label effects
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                group.classList.add('focused');
            }
        }
    });
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = currentLanguage === 'ar' ? 'جاري الإرسال...' : 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification(
            currentLanguage === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!',
            'success'
        );
        
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const credentials = {
        username: formData.get('username'),
        password: formData.get('password'),
        remember: formData.get('remember-me') === 'on'
    };
    
    // Validate credentials
    if (!validateLoginForm(credentials)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = currentLanguage === 'ar' ? 'جاري تسجيل الدخول...' : 'Logging in...';
    submitBtn.disabled = true;
    
    // Simulate login API call
    setTimeout(() => {
        // Mock successful login
        if (credentials.username === 'demo' && credentials.password === 'demo123') {
            loginUser({
                id: 1,
                username: credentials.username,
                fullname: 'Demo User',
                email: 'demo@example.com'
            });
            
            closeModal('login-modal');
            showNotification(
                currentLanguage === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!',
                'success'
            );
        } else {
            showNotification(
                currentLanguage === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials',
                'error'
            );
        }
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirm-password')
    };
    
    // Validate registration data
    if (!validateRegisterForm(userData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = currentLanguage === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...';
    submitBtn.disabled = true;
    
    // Simulate registration API call
    setTimeout(() => {
        // Mock successful registration
        showNotification(
            currentLanguage === 'ar' ? 'تم إنشاء حسابك بنجاح!' : 'Account created successfully!',
            'success'
        );
        
        closeModal('register-modal');
        
        // Auto login after registration
        loginUser({
            id: Date.now(),
            username: userData.username,
            fullname: userData.fullname,
            email: userData.email
        });
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Validation Functions
function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 2) {
        errors.push(currentLanguage === 'ar' ? 'الاسم مطلوب' : 'Name is required');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push(currentLanguage === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address');
    }
    
    if (!data.subject || data.subject.length < 3) {
        errors.push(currentLanguage === 'ar' ? 'الموضوع مطلوب' : 'Subject is required');
    }
    
    if (!data.message || data.message.length < 10) {
        errors.push(currentLanguage === 'ar' ? 'الرسالة قصيرة جداً' : 'Message is too short');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

function validateLoginForm(credentials) {
    const errors = [];
    
    if (!credentials.username || credentials.username.length < 3) {
        errors.push(currentLanguage === 'ar' ? 'اسم المستخدم مطلوب' : 'Username is required');
    }
    
    if (!credentials.password || credentials.password.length < 6) {
        errors.push(currentLanguage === 'ar' ? 'كلمة المرور قصيرة جداً' : 'Password is too short');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

function validateRegisterForm(userData) {
    const errors = [];
    
    if (!userData.fullname || userData.fullname.length < 2) {
        errors.push(currentLanguage === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name is required');
    }
    
    if (!userData.email || !isValidEmail(userData.email)) {
        errors.push(currentLanguage === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address');
    }
    
    if (!userData.username || userData.username.length < 3) {
        errors.push(currentLanguage === 'ar' ? 'اسم المستخدم قصير جداً' : 'Username is too short');
    }
    
    if (!userData.password || userData.password.length < 6) {
        errors.push(currentLanguage === 'ar' ? 'كلمة المرور قصيرة جداً' : 'Password is too short');
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push(currentLanguage === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// User Management
function loginUser(userData) {
    isLoggedIn = true;
    currentUser = userData;
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    // Update UI
    updateUserInterface();
    
    // Redirect to dashboard (if exists)
    // window.location.href = 'dashboard.html';
}

function logoutUser() {
    isLoggedIn = false;
    currentUser = null;
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    
    // Update UI
    updateUserInterface();
    
    showNotification(
        currentLanguage === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully',
        'success'
    );
}

function loadUserData() {
    const savedUser = localStorage.getItem('user');
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    
    if (savedUser && savedLoginStatus === 'true') {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateUserInterface();
    }
}

function updateUserInterface() {
    const loginBtn = document.querySelector('.login-btn');
    
    if (isLoggedIn && currentUser) {
        if (loginBtn) {
            loginBtn.textContent = currentUser.fullname;
            loginBtn.onclick = () => {
                // Show user menu or redirect to dashboard
                showUserMenu();
            };
        }
    } else {
        if (loginBtn) {
            loginBtn.textContent = currentLanguage === 'ar' ? 'تسجيل الدخول' : 'Login';
            loginBtn.onclick = openLoginModal;
        }
    }
}

function showUserMenu() {
    // Create and show user dropdown menu
    const menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.innerHTML = `
        <div class="user-menu-content">
            <a href="#" onclick="redirectToDashboard()">${currentLanguage === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</a>
            <a href="#" onclick="showProfile()">${currentLanguage === 'ar' ? 'الملف الشخصي' : 'Profile'}</a>
            <a href="#" onclick="logoutUser()">${currentLanguage === 'ar' ? 'تسجيل الخروج' : 'Logout'}</a>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    // Remove menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function removeMenu() {
            menu.remove();
            document.removeEventListener('click', removeMenu);
        });
    }, 100);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 3000;
                max-width: 400px;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-xl);
                animation: slideInRight 0.3s ease-out;
            }
            
            [dir="rtl"] .notification {
                right: auto;
                left: 20px;
                animation: slideInLeft 0.3s ease-out;
            }
            
            .notification-content {
                padding: var(--spacing-lg);
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
                color: white;
            }
            
            .notification-info { background: var(--primary-color); }
            .notification-success { background: var(--success-color); }
            .notification-warning { background: var(--warning-color); }
            .notification-error { background: var(--error-color); }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                margin-left: auto;
                padding: var(--spacing-xs);
            }
            
            [dir="rtl"] .notification-close {
                margin-left: 0;
                margin-right: auto;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideInLeft {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        info: 'info-circle',
        success: 'check-circle',
        warning: 'exclamation-triangle',
        error: 'times-circle'
    };
    return icons[type] || 'info-circle';
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.feature-card, .stat-card, .leaderboard-row, .video-item');
    animateElements.forEach(el => observer.observe(el));
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for global access
window.AffiliateHub = {
    openLoginModal,
    openRegisterModal,
    closeModal,
    switchModal,
    scrollToSection,
    toggleLanguage,
    setLanguage,
    showNotification,
    loginUser,
    logoutUser
};

// Theme and Notification System
let themeSystem = {
    currentTheme: localStorage.getItem('theme') || 'light',
    soundEnabled: JSON.parse(localStorage.getItem('soundEnabled') || 'true'),
    notifications: JSON.parse(localStorage.getItem('notifications') || '[]'),
    
    init() {
        this.applyTheme();
        this.createButtons();
        this.createNotificationPanel();
        this.setupEventListeners();
        this.startNotificationSimulation();
        
        // Welcome notification
        setTimeout(() => {
            this.addNotification('مرحباً بك!', 'تم تحميل النظام بنجاح', 'success', 'check-circle');
            
            // Add demo notification after 5 seconds
            setTimeout(() => {
                this.addNotification('نظام الإشعارات جاهز!', 'يمكنك الآن استقبال إشعارات من المواقع المربوطة', 'info', 'bell');
            }, 3000);
        }, 2000);
    },
    
    createButtons() {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions) return;
        
        // Theme button
        const themeBtn = document.createElement('button');
        themeBtn.innerHTML = '<i class="fas fa-moon" id="theme-icon"></i>';
        themeBtn.className = 'theme-btn';
        themeBtn.onclick = () => this.toggleTheme();
        themeBtn.title = 'تبديل الوضع';
        themeBtn.style.cssText = 'background:var(--white);border:1px solid var(--gray-300);border-radius:var(--radius-full);width:42px;height:42px;margin-left:10px;cursor:pointer;transition:var(--transition-fast);display:flex;align-items:center;justify-content:center;color:var(--gray-700);box-shadow:var(--shadow-sm);';
        
        // Notifications button
        const notifBtn = document.createElement('button');
        notifBtn.innerHTML = '<i class="fas fa-bell"></i><span id="notif-count" style="position:absolute;top:-6px;right:-6px;background:var(--error-color);color:var(--white);border-radius:var(--radius-full);width:20px;height:20px;font-size:11px;display:none;align-items:center;justify-content:center;font-weight:600;animation:pulse 2s infinite;">0</span>';
        notifBtn.className = 'notif-btn';
        notifBtn.onclick = () => this.toggleNotifications();
        notifBtn.title = 'الإشعارات';
        notifBtn.style.cssText = 'background:var(--white);border:1px solid var(--gray-300);border-radius:var(--radius-full);width:42px;height:42px;margin-left:10px;cursor:pointer;transition:var(--transition-fast);position:relative;display:flex;align-items:center;justify-content:center;color:var(--gray-700);box-shadow:var(--shadow-sm);';
        
        // External sites button
        const externalBtn = document.createElement('button');
        externalBtn.innerHTML = '<i class="fas fa-link"></i>';
        externalBtn.className = 'external-btn';
        externalBtn.onclick = () => this.openExternalModal();
        externalBtn.title = 'ربط المواقع الخارجية';
        externalBtn.style.cssText = 'background:var(--white);border:1px solid var(--gray-300);border-radius:var(--radius-full);width:42px;height:42px;margin-left:10px;cursor:pointer;transition:var(--transition-fast);display:flex;align-items:center;justify-content:center;color:var(--gray-700);box-shadow:var(--shadow-sm);';
        
        // Add hover effects
        [themeBtn, notifBtn, externalBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.borderColor = 'var(--primary-color)';
                btn.style.color = 'var(--primary-color)';
                btn.style.transform = 'scale(1.05)';
                btn.style.boxShadow = 'var(--shadow-md)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.borderColor = 'var(--gray-300)';
                btn.style.color = 'var(--gray-700)';
                btn.style.transform = 'scale(1)';
                btn.style.boxShadow = 'var(--shadow-sm)';
            });
        });
        
        const langSwitcher = navActions.querySelector('.language-switcher');
        if (langSwitcher) {
            navActions.insertBefore(themeBtn, langSwitcher);
            navActions.insertBefore(notifBtn, langSwitcher);
            navActions.insertBefore(externalBtn, langSwitcher);
        }
    },
    
    createNotificationPanel() {
        const panel = document.createElement('div');
        panel.id = 'notif-panel';
        panel.style.cssText = 'position:fixed;top:0;right:-400px;width:400px;height:100vh;background:var(--white);border-left:1px solid var(--gray-200);box-shadow:var(--shadow-2xl);z-index:1000;transition:right var(--transition-normal);display:flex;flex-direction:column;backdrop-filter:blur(10px);';
        
        panel.innerHTML = `
            <div style="padding:20px;border-bottom:1px solid var(--gray-200);display:flex;justify-content:space-between;align-items:center;background:var(--gray-50);">
                <h3 style="margin:0;color:var(--gray-900);font-weight:600;">الإشعارات</h3>
                <div style="display:flex;gap:10px;align-items:center;">
                    <button onclick="themeSystem.toggleSound()" style="background:none;border:none;cursor:pointer;color:var(--gray-600);padding:8px;border-radius:var(--radius-md);transition:var(--transition-fast);" onmouseover="this.style.background='var(--gray-200)'" onmouseout="this.style.background='none'">
                        <i class="fas fa-volume-up" id="sound-icon"></i>
                    </button>
                    <button onclick="themeSystem.clearNotifications()" style="background:none;border:none;cursor:pointer;color:var(--primary-color);font-size:14px;font-weight:500;padding:8px;border-radius:var(--radius-md);transition:var(--transition-fast);" onmouseover="this.style.background='var(--gray-200)'" onmouseout="this.style.background='none'">مسح الكل</button>
                    <button onclick="themeSystem.closeNotifications()" style="background:none;border:none;cursor:pointer;font-size:20px;color:var(--gray-500);padding:8px;border-radius:var(--radius-md);transition:var(--transition-fast);" onmouseover="this.style.background='var(--gray-200)'" onmouseout="this.style.background='none'">&times;</button>
                </div>
            </div>
            <div id="notif-list" style="flex:1;overflow-y:auto;padding:15px;background:var(--white);"></div>
        `;
        
        document.body.appendChild(panel);
        
        // External sites modal
        const modal = document.createElement('div');
        modal.id = 'external-modal';
        modal.style.cssText = 'display:none;position:fixed;z-index:1001;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.6);backdrop-filter:blur(5px);';
        modal.innerHTML = `
            <div style="background:var(--white);margin:5% auto;padding:40px;width:85%;max-width:700px;border-radius:var(--radius-2xl);position:relative;box-shadow:var(--shadow-2xl);border:1px solid var(--gray-200);">
                <span onclick="themeSystem.closeExternalModal()" style="position:absolute;top:20px;right:25px;font-size:28px;cursor:pointer;color:var(--gray-500);transition:var(--transition-fast);width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-full);" onmouseover="this.style.background='var(--gray-100)';this.style.color='var(--gray-700)'" onmouseout="this.style.background='none';this.style.color='var(--gray-500)'">&times;</span>
                <div style="text-align:center;margin-bottom:40px;">
                    <div style="width:80px;height:80px;background:var(--gradient-primary);border-radius:var(--radius-2xl);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;color:var(--white);font-size:32px;">
                        <i class="fas fa-link"></i>
                    </div>
                    <h2 style="margin:0;color:var(--gray-900);font-weight:700;font-size:28px;">ربط المواقع الخارجية</h2>
                    <p style="color:var(--gray-600);margin-top:10px;font-size:16px;">اربط متاجرك الإلكترونية لاستقبال الإشعارات تلقائياً</p>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:25px;">
                    <div onclick="themeSystem.connectSite('Shopify')" style="border:2px solid var(--gray-200);border-radius:var(--radius-xl);padding:25px;text-align:center;cursor:pointer;transition:var(--transition-normal);background:var(--white);" onmouseover="this.style.borderColor='var(--primary-color)';this.style.transform='translateY(-5px)';this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.borderColor='var(--gray-200)';this.style.transform='translateY(0)';this.style.boxShadow='none'">
                        <div style="width:70px;height:70px;background:linear-gradient(135deg, #95bf47 0%, #7ba428 100%);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px;color:var(--white);box-shadow:var(--shadow-md);">
                            <i class="fab fa-shopify"></i>
                        </div>
                        <h4 style="margin:0 0 10px 0;color:var(--gray-900);font-weight:600;font-size:18px;">Shopify</h4>
                        <p style="color:var(--gray-600);font-size:14px;margin:0 0 15px 0;line-height:1.5;">ربط متجر Shopify واستقبال إشعارات الطلبات والمبيعات</p>
                        <span style="background:var(--gray-200);color:var(--gray-600);padding:6px 12px;border-radius:var(--radius-full);font-size:12px;font-weight:600;text-transform:uppercase;">غير متصل</span>
                    </div>
                    <div onclick="themeSystem.connectSite('WooCommerce')" style="border:2px solid var(--gray-200);border-radius:var(--radius-xl);padding:25px;text-align:center;cursor:pointer;transition:var(--transition-normal);background:var(--white);" onmouseover="this.style.borderColor='var(--primary-color)';this.style.transform='translateY(-5px)';this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.borderColor='var(--gray-200)';this.style.transform='translateY(0)';this.style.boxShadow='none'">
                        <div style="width:70px;height:70px;background:linear-gradient(135deg, #21759b 0%, #1e6a8d 100%);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px;color:var(--white);box-shadow:var(--shadow-md);">
                            <i class="fab fa-wordpress"></i>
                        </div>
                        <h4 style="margin:0 0 10px 0;color:var(--gray-900);font-weight:600;font-size:18px;">WooCommerce</h4>
                        <p style="color:var(--gray-600);font-size:14px;margin:0 0 15px 0;line-height:1.5;">ربط متجر WooCommerce ومتابعة المنتجات والطلبات</p>
                        <span style="background:var(--gray-200);color:var(--gray-600);padding:6px 12px;border-radius:var(--radius-full);font-size:12px;font-weight:600;text-transform:uppercase;">غير متصل</span>
                    </div>
                    <div onclick="themeSystem.connectSite('متجر مخصص')" style="border:2px solid var(--gray-200);border-radius:var(--radius-xl);padding:25px;text-align:center;cursor:pointer;transition:var(--transition-normal);background:var(--white);" onmouseover="this.style.borderColor='var(--primary-color)';this.style.transform='translateY(-5px)';this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.borderColor='var(--gray-200)';this.style.transform='translateY(0)';this.style.boxShadow='none'">
                        <div style="width:70px;height:70px;background:var(--gradient-secondary);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px;color:var(--white);box-shadow:var(--shadow-md);">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <h4 style="margin:0 0 10px 0;color:var(--gray-900);font-weight:600;font-size:18px;">متجر مخصص</h4>
                        <p style="color:var(--gray-600);font-size:14px;margin:0 0 15px 0;line-height:1.5;">ربط أي متجر إلكتروني آخر عبر API مخصص</p>
                        <span style="background:var(--gray-200);color:var(--gray-600);padding:6px 12px;border-radius:var(--radius-full);font-size:12px;font-weight:600;text-transform:uppercase;">غير متصل</span>
                    </div>
                </div>
                <div style="margin-top:30px;padding:20px;background:var(--gray-50);border-radius:var(--radius-lg);text-align:center;">
                    <p style="margin:0;color:var(--gray-600);font-size:14px;"><i class="fas fa-info-circle" style="margin-left:8px;color:var(--info-color);"></i>بعد الربط ستتلقى إشعارات فورية عن الطلبات والمبيعات والتحديثات</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    setupEventListeners() {
        // Close notifications when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('notif-panel');
            const btn = document.querySelector('.notif-btn');
            if (panel && !panel.contains(e.target) && !btn.contains(e.target)) {
                this.closeNotifications();
            }
        });
        
        // Close modal when clicking outside
        document.getElementById('external-modal').addEventListener('click', (e) => {
            if (e.target.id === 'external-modal') {
                this.closeExternalModal();
            }
        });
    },
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.currentTheme);
        
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            // Add smooth rotation animation
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 300);
        }
        
        this.addNotification(
            this.currentTheme === 'dark' ? 'الوضع الداكن' : 'الوضع الفاتح',
            'تم تغيير المظهر بنجاح',
            'info',
            this.currentTheme === 'dark' ? 'moon' : 'sun'
        );
    },
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Update meta theme-color for mobile browsers
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.content = this.currentTheme === 'dark' ? '#0f172a' : '#ffffff';
        
        // Apply additional dark mode styles
        if (this.currentTheme === 'dark') {
            this.applyDarkModeStyles();
        } else {
            this.removeDarkModeStyles();
        }
    },
    
    applyDarkModeStyles() {
        // Add dark mode class to body for additional styling
        document.body.classList.add('dark-mode');
        
        // Update scrollbar styles for dark mode
        const style = document.getElementById('dark-scrollbar-style');
        if (!style) {
            const scrollbarStyle = document.createElement('style');
            scrollbarStyle.id = 'dark-scrollbar-style';
            scrollbarStyle.textContent = `
                /* Dark mode scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #1e293b;
                }
                ::-webkit-scrollbar-thumb {
                    background: #475569;
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #64748b;
                }
                
                /* Selection color in dark mode */
                ::selection {
                    background: rgba(129, 140, 248, 0.3);
                    color: #f8fafc;
                }
            `;
            document.head.appendChild(scrollbarStyle);
        }
    },
    
    removeDarkModeStyles() {
        document.body.classList.remove('dark-mode');
        
        const style = document.getElementById('dark-scrollbar-style');
        if (style) {
            style.remove();
        }
    },
    
    toggleNotifications() {
        const panel = document.getElementById('notif-panel');
        if (panel.style.right === '0px') {
            this.closeNotifications();
        } else {
            panel.style.right = '0px';
            this.markAllAsRead();
        }
    },
    
    closeNotifications() {
        document.getElementById('notif-panel').style.right = '-400px';
    },
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('soundEnabled', JSON.stringify(this.soundEnabled));
        
        const icon = document.getElementById('sound-icon');
        if (icon) {
            icon.className = this.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        }
        
        if (this.soundEnabled) {
            this.playSound([660, 880], 0.3);
        }
    },
    
    addNotification(title, message, type = 'info', icon = 'bell', customName = '') {
        const notification = {
            id: Date.now(),
            title,
            message,
            type,
            icon,
            customName,
            timestamp: new Date(),
            read: false
        };
        
        this.notifications.unshift(notification);
        if (this.notifications.length > 50) {
            this.notifications = this.notifications.slice(0, 50);
        }
        
        this.playNotificationSound(type);
        this.updateUI();
        this.saveNotifications();
    },
    
    playNotificationSound(type) {
        if (!this.soundEnabled) return;
        
        const sounds = {
            success: [[523, 659, 784], 0.6],
            error: [[220, 185, 165], 0.8],
            warning: [[440, 466, 440], 0.6],
            info: [[660, 880], 0.3]
        };
        
        const [frequencies, duration] = sounds[type] || sounds.info;
        this.playSound(frequencies, duration);
    },
    
    playSound(frequencies, duration) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const gainNode = audioContext.createGain();
            gainNode.connect(audioContext.destination);
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
            
            frequencies.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                oscillator.connect(gainNode);
                
                const startTime = audioContext.currentTime + (index * duration / frequencies.length);
                const endTime = startTime + (duration / frequencies.length);
                
                oscillator.start(startTime);
                oscillator.stop(endTime);
                
                gainNode.gain.linearRampToValueAtTime(0, endTime - 0.01);
            });
            
            setTimeout(() => audioContext.close(), (duration * 1000) + 100);
        } catch (error) {
            console.warn('Could not play sound:', error);
        }
    },
    
    updateUI() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = document.getElementById('notif-count');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
        
        // Sync with custom notification system if available
        if (window.notificationSystem && this.notifications.length > 0) {
            const latestNotification = this.notifications[0];
            if (latestNotification && !latestNotification.synced) {
                window.notificationSystem.addNotification({
                    title: latestNotification.title,
                    message: latestNotification.message,
                    type: latestNotification.type,
                    icon: latestNotification.icon,
                    customName: latestNotification.customName || 'نظام الموقع',
                    timestamp: latestNotification.timestamp,
                    id: latestNotification.id
                });
                latestNotification.synced = true;
            }
        }
        
        this.updateNotificationsList();
    },
    
    updateNotificationsList() {
        const list = document.getElementById('notif-list');
        if (!list) return;
        
        if (this.notifications.length === 0) {
            list.innerHTML = `
                <div style="text-align:center;padding:60px 20px;color:var(--gray-500);">
                    <div style="width:80px;height:80px;background:var(--gray-100);border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:32px;">
                        <i class="fas fa-bell-slash"></i>
                    </div>
                    <h4 style="margin:0 0 10px 0;color:var(--gray-700);font-weight:600;">لا توجد إشعارات</h4>
                    <p style="margin:0;font-size:14px;line-height:1.5;">ستظهر هنا الإشعارات من المواقع المربوطة</p>
                </div>
            `;
            return;
        }
        
        list.innerHTML = this.notifications.map(notification => {
            const timeAgo = this.getTimeAgo(notification.timestamp);
            const iconColors = {
                success: 'var(--success-color)',
                error: 'var(--error-color)',
                warning: 'var(--warning-color)',
                info: 'var(--info-color)'
            };
            
            const gradients = {
                success: 'var(--gradient-success)',
                error: 'linear-gradient(135deg, var(--error-color) 0%, var(--error-dark) 100%)',
                warning: 'linear-gradient(135deg, var(--warning-color) 0%, var(--warning-dark) 100%)',
                info: 'linear-gradient(135deg, var(--info-color) 0%, var(--info-dark) 100%)'
            };
            
            return `
                <div onclick="themeSystem.markAsRead(${notification.id})" style="background:${!notification.read ? 'rgba(129, 140, 248, 0.08)' : 'var(--white)'};border:2px solid ${!notification.read ? 'var(--primary-color)' : 'var(--gray-200)'};border-radius:var(--radius-xl);padding:18px;margin-bottom:12px;cursor:pointer;transition:var(--transition-normal);display:flex;gap:16px;position:relative;overflow:hidden;" onmouseover="this.style.transform='translateX(-3px)';this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.transform='translateX(0)';this.style.boxShadow='none'">
                    ${!notification.read ? '<div style="position:absolute;top:0;right:0;width:4px;height:100%;background:var(--primary-color);"></div>' : ''}
                    <div style="width:48px;height:48px;border-radius:var(--radius-xl);background:${gradients[notification.type] || gradients.info};display:flex;align-items:center;justify-content:center;color:var(--white);flex-shrink:0;box-shadow:var(--shadow-md);font-size:18px;">
                        <i class="fas fa-${notification.icon}"></i>
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-weight:600;margin-bottom:6px;color:var(--gray-900);font-size:15px;line-height:1.4;">${notification.title}</div>
                        <div style="color:var(--gray-600);font-size:14px;margin-bottom:8px;line-height:1.5;">${notification.message}</div>
                        <div style="display:flex;align-items:center;gap:8px;">
                            <div style="color:var(--gray-500);font-size:12px;font-weight:500;">${timeAgo}</div>
                            ${!notification.read ? '<div style="width:8px;height:8px;background:var(--primary-color);border-radius:50%;"></div>' : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.updateUI();
            this.saveNotifications();
        }
    },
    
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.updateUI();
        this.saveNotifications();
    },
    
    clearNotifications() {
        this.notifications = [];
        this.updateUI();
        this.saveNotifications();
    },
    
    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    },
    
    getTimeAgo(timestamp) {
        const now = new Date();
        const diff = now - new Date(timestamp);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'الآن';
        if (minutes < 60) return `منذ ${minutes} دقيقة`;
        if (hours < 24) return `منذ ${hours} ساعة`;
        return `منذ ${days} يوم`;
    },
    
    openExternalModal() {
        document.getElementById('external-modal').style.display = 'block';
    },
    
    closeExternalModal() {
        document.getElementById('external-modal').style.display = 'none';
    },
    
    connectSite(siteName) {
        this.addNotification('جاري الربط...', `جاري ربط ${siteName}`, 'info', 'spinner');
        this.closeExternalModal();
        
        setTimeout(() => {
            if (Math.random() > 0.2) {
                this.addNotification('تم الربط بنجاح', `تم ربط ${siteName} بنجاح`, 'success', 'check-circle');
            } else {
                this.addNotification('فشل في الربط', 'تحقق من البيانات وحاول مرة أخرى', 'error', 'exclamation-triangle');
            }
        }, 2000);
    },
    
    startNotificationSimulation() {
        const notifications = [
            ['طلب جديد من Shopify', 'تم إنشاء طلب جديد #SP-12345 بقيمة $125.50', 'success', 'shopping-cart'],
            ['عمولة من WooCommerce', 'تم كسب عمولة $25.10 من البيع #WC-789', 'success', 'dollar-sign'],
            ['تحديث حالة الطلب', 'تم تحديث الطلب #12345 إلى "تم الشحن"', 'info', 'truck'],
            ['منتج جديد متاح', 'منتج جديد: "ساعة ذكية" - عمولة 15%', 'info', 'plus-circle'],
            ['تنبيه مخزون منخفض', 'المنتج "iPhone 15" أوشك على النفاد', 'warning', 'exclamation-triangle'],
            ['دفعة عمولة مرسلة', 'تم إرسال دفعة عمولة بقيمة $450.75', 'success', 'credit-card'],
            ['إلغاء طلب', 'تم إلغاء الطلب #12346 - استرداد العمولة', 'error', 'times-circle'],
            ['عرض خاص جديد', 'عرض خاص: خصم 30% على الإلكترونيات', 'info', 'tag'],
            ['تحديث المنتج', 'تم تحديث سعر المنتج "لابتوب Dell"', 'info', 'edit'],
            ['مراجعة جديدة', 'تم إضافة مراجعة 5 نجوم للمنتج #456', 'success', 'star']
        ];
        
        // Start simulation after 10 seconds
        setTimeout(() => {
            setInterval(() => {
                if (Math.random() > 0.7) { // 30% chance every 30 seconds
                    const [title, message, type, icon] = notifications[Math.floor(Math.random() * notifications.length)];
                    this.addNotification(title, message, type, icon);
                }
            }, 30000);
        }, 10000);
        
        // Add a few demo notifications at startup
        setTimeout(() => {
            this.addNotification('طلب جديد!', 'تم إنشاء طلب جديد من متجر Shopify', 'success', 'shopping-cart');
        }, 8000);
        
        setTimeout(() => {
            this.addNotification('عمولة جديدة!', 'تم كسب عمولة $15.50 من البيع الأخير', 'success', 'dollar-sign');
        }, 12000);
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        themeSystem.init();
        window.themeSystem = themeSystem; // Make it globally accessible
    }, 1000);
});

console.log('AffiliateHub main script loaded successfully');