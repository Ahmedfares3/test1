// Language Management System for AffiliateHub

// Language Data
const translations = {
    ar: {
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.features': 'المميزات',
        'nav.leaderboard': 'أفضل المسوقين',
        'nav.tutorials': 'الشروحات',
        'nav.contact': 'اتصل بنا',
        'nav.login': 'تسجيل الدخول',
        'nav.register': 'إنشاء حساب',
        'nav.dashboard': 'لوحة التحكم',
        'nav.profile': 'الملف الشخصي',
        'nav.logout': 'تسجيل الخروج',
        
        // Hero Section
        'hero.title': 'ابدأ رحلتك في التسويق بالعمولة',
        'hero.subtitle': 'انضم إلى آلاف المسوقين الناجحين واربح عمولات مجزية من خلال منصتنا المتطورة',
        'hero.cta.primary': 'ابدأ الآن مجاناً',
        'hero.cta.secondary': 'شاهد الشروحات',
        'hero.stats.marketers': 'مسوق نشط',
        'hero.stats.commissions': 'إجمالي العمولات',
        'hero.stats.products': 'منتج متاح',
        
        // Features Section
        'features.title': 'لماذا تختار منصتنا؟',
        'features.subtitle': 'نوفر لك جميع الأدوات والموارد التي تحتاجها للنجاح في التسويق بالعمولة',
        'features.tracking.title': 'تتبع متقدم',
        'features.tracking.desc': 'تتبع دقيق لجميع النقرات والتحويلات والعمولات في الوقت الفعلي',
        'features.commissions.title': 'عمولات عالية',
        'features.commissions.desc': 'احصل على عمولات تنافسية تصل إلى 50% من قيمة المبيعات',
        'features.tools.title': 'أدوات تسويقية',
        'features.tools.desc': 'مجموعة شاملة من الأدوات والمواد التسويقية الجاهزة للاستخدام',
        'features.support.title': 'دعم 24/7',
        'features.support.desc': 'فريق دعم متخصص متاح على مدار الساعة لمساعدتك',
        'features.mobile.title': 'تطبيق موبايل',
        'features.mobile.desc': 'تطبيق محمول سهل الاستخدام لإدارة حسابك من أي مكان',
        'features.training.title': 'تدريب مجاني',
        'features.training.desc': 'دورات تدريبية مجانية وشروحات مفصلة لتطوير مهاراتك',
        
        // Leaderboard Section
        'leaderboard.title': 'أفضل المسوقين هذا الشهر',
        'leaderboard.subtitle': 'تعرف على أفضل المسوقين الذين حققوا أعلى المبيعات والعمولات',
        'leaderboard.rank': 'الترتيب',
        'leaderboard.marketer': 'المسوق',
        'leaderboard.sales': 'المبيعات',
        'leaderboard.commission': 'العمولة',
        'leaderboard.conversion': 'معدل التحويل',
        'leaderboard.total_marketers': 'إجمالي المسوقين',
        'leaderboard.monthly_sales': 'مبيعات الشهر',
        'leaderboard.avg_commission': 'متوسط العمولة',
        
        // Tutorials Section
        'tutorials.title': 'شروحات تعليمية',
        'tutorials.subtitle': 'تعلم كيفية البدء والنجاح في التسويق بالعمولة من خلال شروحاتنا المفصلة',
        'tutorials.playlist': 'قائمة تشغيل شاملة',
        'tutorials.playlist.desc': 'سلسلة فيديوهات تعليمية متكاملة',
        
        // Contact Section
        'contact.title': 'تواصل معنا',
        'contact.subtitle': 'نحن هنا لمساعدتك في رحلتك نحو النجاح',
        'contact.email': 'البريد الإلكتروني',
        'contact.phone': 'الهاتف',
        'contact.hours': 'ساعات العمل',
        'contact.hours.value': '24/7 دعم متواصل',
        'contact.follow': 'تابعنا على',
        'contact.form.name': 'الاسم الكامل',
        'contact.form.email': 'البريد الإلكتروني',
        'contact.form.subject': 'الموضوع',
        'contact.form.message': 'الرسالة',
        'contact.form.send': 'إرسال الرسالة',
        
        // Footer
        'footer.description': 'منصتك الموثوقة للنجاح في التسويق بالعمولة',
        'footer.quick_links': 'روابط سريعة',
        'footer.support': 'الدعم',
        'footer.help_center': 'مركز المساعدة',
        'footer.faq': 'الأسئلة الشائعة',
        'footer.privacy': 'سياسة الخصوصية',
        'footer.newsletter': 'النشرة الإخبارية',
        'footer.newsletter.desc': 'اشترك للحصول على آخر الأخبار والعروض',
        'footer.newsletter.subscribe': 'اشتراك',
        'footer.rights': 'جميع الحقوق محفوظة',
        
        // Login Modal
        'login.title': 'تسجيل الدخول',
        'login.username': 'اسم المستخدم',
        'login.password': 'كلمة المرور',
        'login.remember': 'تذكرني',
        'login.forgot': 'نسيت كلمة المرور؟',
        'login.submit': 'دخول',
        'login.no_account': 'ليس لديك حساب؟',
        'login.register_link': 'سجل الآن',
        
        // Register Modal
        'register.title': 'إنشاء حساب جديد',
        'register.fullname': 'الاسم الكامل',
        'register.email': 'البريد الإلكتروني',
        'register.username': 'اسم المستخدم',
        'register.password': 'كلمة المرور',
        'register.confirm_password': 'تأكيد كلمة المرور',
        'register.agree_terms': 'أوافق على الشروط والأحكام',
        'register.submit': 'إنشاء حساب',
        'register.have_account': 'لديك حساب بالفعل؟',
        'register.login_link': 'سجل دخولك',
        
        // Chat
        'chat.title': 'الدعم المباشر',
        'chat.welcome': 'مرحباً! كيف يمكنني مساعدتك اليوم؟',
        'chat.placeholder': 'اكتب رسالتك هنا...',
        'chat.now': 'الآن',
        
        // Notifications
        'notification.contact_success': 'تم إرسال رسالتك بنجاح!',
        'notification.login_success': 'تم تسجيل الدخول بنجاح!',
        'notification.register_success': 'تم إنشاء حسابك بنجاح!',
        'notification.logout_success': 'تم تسجيل الخروج بنجاح',
        'notification.invalid_credentials': 'بيانات الدخول غير صحيحة',
        'notification.sending': 'جاري الإرسال...',
        'notification.logging_in': 'جاري تسجيل الدخول...',
        'notification.creating_account': 'جاري إنشاء الحساب...',
        
        // Validation Messages
        'validation.name_required': 'الاسم مطلوب',
        'validation.email_invalid': 'البريد الإلكتروني غير صحيح',
        'validation.subject_required': 'الموضوع مطلوب',
        'validation.message_short': 'الرسالة قصيرة جداً',
        'validation.username_required': 'اسم المستخدم مطلوب',
        'validation.password_short': 'كلمة المرور قصيرة جداً',
        'validation.fullname_required': 'الاسم الكامل مطلوب',
        'validation.username_short': 'اسم المستخدم قصير جداً',
        'validation.passwords_mismatch': 'كلمات المرور غير متطابقة',
        
        // Placeholders
        'placeholder.email': 'البريد الإلكتروني',
        'placeholder.chat': 'اكتب رسالتك هنا...',
        
        // Time
        'time.now': 'الآن',
        'time.minutes_ago': 'منذ {0} دقائق',
        'time.hours_ago': 'منذ {0} ساعات',
        'time.days_ago': 'منذ {0} أيام'
    },
    
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.features': 'Features',
        'nav.leaderboard': 'Top Marketers',
        'nav.tutorials': 'Tutorials',
        'nav.contact': 'Contact',
        'nav.login': 'Login',
        'nav.register': 'Register',
        'nav.dashboard': 'Dashboard',
        'nav.profile': 'Profile',
        'nav.logout': 'Logout',
        
        // Hero Section
        'hero.title': 'Start Your Affiliate Marketing Journey',
        'hero.subtitle': 'Join thousands of successful marketers and earn rewarding commissions through our advanced platform',
        'hero.cta.primary': 'Start Now Free',
        'hero.cta.secondary': 'Watch Tutorials',
        'hero.stats.marketers': 'Active Marketers',
        'hero.stats.commissions': 'Total Commissions',
        'hero.stats.products': 'Available Products',
        
        // Features Section
        'features.title': 'Why Choose Our Platform?',
        'features.subtitle': 'We provide you with all the tools and resources you need to succeed in affiliate marketing',
        'features.tracking.title': 'Advanced Tracking',
        'features.tracking.desc': 'Accurate tracking of all clicks, conversions and commissions in real time',
        'features.commissions.title': 'High Commissions',
        'features.commissions.desc': 'Get competitive commissions up to 50% of sales value',
        'features.tools.title': 'Marketing Tools',
        'features.tools.desc': 'Comprehensive set of ready-to-use marketing tools and materials',
        'features.support.title': '24/7 Support',
        'features.support.desc': 'Specialized support team available 24/7 to help you',
        'features.mobile.title': 'Mobile App',
        'features.mobile.desc': 'Easy-to-use mobile app to manage your account from anywhere',
        'features.training.title': 'Free Training',
        'features.training.desc': 'Free training courses and detailed tutorials to develop your skills',
        
        // Leaderboard Section
        'leaderboard.title': 'Top Marketers This Month',
        'leaderboard.subtitle': 'Meet the top marketers who achieved the highest sales and commissions',
        'leaderboard.rank': 'Rank',
        'leaderboard.marketer': 'Marketer',
        'leaderboard.sales': 'Sales',
        'leaderboard.commission': 'Commission',
        'leaderboard.conversion': 'Conversion Rate',
        'leaderboard.total_marketers': 'Total Marketers',
        'leaderboard.monthly_sales': 'Monthly Sales',
        'leaderboard.avg_commission': 'Average Commission',
        
        // Tutorials Section
        'tutorials.title': 'Educational Tutorials',
        'tutorials.subtitle': 'Learn how to start and succeed in affiliate marketing through our detailed tutorials',
        'tutorials.playlist': 'Comprehensive Playlist',
        'tutorials.playlist.desc': 'Complete educational video series',
        
        // Contact Section
        'contact.title': 'Contact Us',
        'contact.subtitle': "We're here to help you on your journey to success",
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.hours': 'Working Hours',
        'contact.hours.value': '24/7 Continuous Support',
        'contact.follow': 'Follow Us',
        'contact.form.name': 'Full Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.send': 'Send Message',
        
        // Footer
        'footer.description': 'Your trusted platform for affiliate marketing success',
        'footer.quick_links': 'Quick Links',
        'footer.support': 'Support',
        'footer.help_center': 'Help Center',
        'footer.faq': 'FAQ',
        'footer.privacy': 'Privacy Policy',
        'footer.newsletter': 'Newsletter',
        'footer.newsletter.desc': 'Subscribe to get the latest news and offers',
        'footer.newsletter.subscribe': 'Subscribe',
        'footer.rights': 'All rights reserved',
        
        // Login Modal
        'login.title': 'Login',
        'login.username': 'Username',
        'login.password': 'Password',
        'login.remember': 'Remember me',
        'login.forgot': 'Forgot password?',
        'login.submit': 'Login',
        'login.no_account': "Don't have an account?",
        'login.register_link': 'Register now',
        
        // Register Modal
        'register.title': 'Create New Account',
        'register.fullname': 'Full Name',
        'register.email': 'Email',
        'register.username': 'Username',
        'register.password': 'Password',
        'register.confirm_password': 'Confirm Password',
        'register.agree_terms': 'I agree to terms and conditions',
        'register.submit': 'Create Account',
        'register.have_account': 'Already have an account?',
        'register.login_link': 'Login here',
        
        // Chat
        'chat.title': 'Live Support',
        'chat.welcome': 'Hello! How can I help you today?',
        'chat.placeholder': 'Type your message here...',
        'chat.now': 'Now',
        
        // Notifications
        'notification.contact_success': 'Message sent successfully!',
        'notification.login_success': 'Login successful!',
        'notification.register_success': 'Account created successfully!',
        'notification.logout_success': 'Logged out successfully',
        'notification.invalid_credentials': 'Invalid credentials',
        'notification.sending': 'Sending...',
        'notification.logging_in': 'Logging in...',
        'notification.creating_account': 'Creating account...',
        
        // Validation Messages
        'validation.name_required': 'Name is required',
        'validation.email_invalid': 'Invalid email address',
        'validation.subject_required': 'Subject is required',
        'validation.message_short': 'Message is too short',
        'validation.username_required': 'Username is required',
        'validation.password_short': 'Password is too short',
        'validation.fullname_required': 'Full name is required',
        'validation.username_short': 'Username is too short',
        'validation.passwords_mismatch': 'Passwords do not match',
        
        // Placeholders
        'placeholder.email': 'Email Address',
        'placeholder.chat': 'Type your message here...',
        
        // Time
        'time.now': 'Now',
        'time.minutes_ago': '{0} minutes ago',
        'time.hours_ago': '{0} hours ago',
        'time.days_ago': '{0} days ago'
    }
};

// Language Management Class
class LanguageManager {
    constructor() {
        this.currentLanguage = 'ar';
        this.translations = translations;
        this.observers = [];
        
        this.init();
    }
    
    init() {
        // Load saved language
        const savedLanguage = localStorage.getItem('language') || 'ar';
        this.setLanguage(savedLanguage);
        
        // Setup language toggle
        this.setupLanguageToggle();
        
        // Setup mutation observer for dynamic content
        this.setupMutationObserver();
    }
    
    setLanguage(language) {
        if (!this.translations[language]) {
            console.warn(`Language ${language} not supported`);
            return;
        }
        
        this.currentLanguage = language;
        localStorage.setItem('language', language);
        
        // Update HTML attributes
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        
        // Update all translations
        this.updateAllTranslations();
        
        // Update language button
        this.updateLanguageButton();
        
        // Notify observers
        this.notifyObservers(language);
        
        console.log(`Language changed to: ${language}`);
    }
    
    translate(key, params = []) {
        const translation = this.translations[this.currentLanguage][key];
        
        if (!translation) {
            console.warn(`Translation key "${key}" not found for language "${this.currentLanguage}"`);
            return key;
        }
        
        // Replace parameters in translation
        let result = translation;
        params.forEach((param, index) => {
            result = result.replace(`{${index}}`, param);
        });
        
        return result;
    }
    
    updateAllTranslations() {
        // Update elements with data attributes
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Update elements with data-ar and data-en attributes (legacy support)
        const legacyElements = document.querySelectorAll('[data-ar][data-en]');
        legacyElements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLanguage}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update placeholders
        this.updatePlaceholders();
        
        // Update form labels
        this.updateFormLabels();
    }
    
    updatePlaceholders() {
        const placeholderMappings = {
            'chat-input-field': 'placeholder.chat',
            'newsletter-email': 'placeholder.email'
        };
        
        Object.keys(placeholderMappings).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.placeholder = this.translate(placeholderMappings[id]);
            }
        });
        
        // Update all elements with data-placeholder attribute
        const placeholderElements = document.querySelectorAll('[data-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-placeholder');
            element.placeholder = this.translate(key);
        });
    }
    
    updateFormLabels() {
        const labelMappings = {
            'name': 'contact.form.name',
            'email': 'contact.form.email',
            'subject': 'contact.form.subject',
            'message': 'contact.form.message',
            'login-username': 'login.username',
            'login-password': 'login.password',
            'register-fullname': 'register.fullname',
            'register-email': 'register.email',
            'register-username': 'register.username',
            'register-password': 'register.password',
            'confirm-password': 'register.confirm_password'
        };
        
        Object.keys(labelMappings).forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                const label = document.querySelector(`label[for="${id}"]`);
                if (label) {
                    label.textContent = this.translate(labelMappings[id]);
                }
            }
        });
    }
    
    updateLanguageButton() {
        const currentLangSpan = document.getElementById('current-lang');
        if (currentLangSpan) {
            currentLangSpan.textContent = this.currentLanguage === 'ar' ? 'العربية' : 'English';
        }
    }
    
    setupLanguageToggle() {
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                const newLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
                this.setLanguage(newLanguage);
            });
        }
    }
    
    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Update translations for newly added elements
                            const translateElements = node.querySelectorAll('[data-translate]');
                            translateElements.forEach(element => {
                                const key = element.getAttribute('data-translate');
                                const translation = this.translate(key);
                                
                                if (element.tagName === 'INPUT' && element.type === 'text') {
                                    element.placeholder = translation;
                                } else {
                                    element.textContent = translation;
                                }
                            });
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Observer pattern for language changes
    addObserver(callback) {
        this.observers.push(callback);
    }
    
    removeObserver(callback) {
        this.observers = this.observers.filter(obs => obs !== callback);
    }
    
    notifyObservers(language) {
        this.observers.forEach(callback => {
            try {
                callback(language);
            } catch (error) {
                console.error('Error in language observer:', error);
            }
        });
    }
    
    // Utility methods
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    isRTL() {
        return this.currentLanguage === 'ar';
    }
    
    formatNumber(number) {
        return new Intl.NumberFormat(
            this.currentLanguage === 'ar' ? 'ar-SA' : 'en-US'
        ).format(number);
    }
    
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat(
            this.currentLanguage === 'ar' ? 'ar-SA' : 'en-US',
            {
                style: 'currency',
                currency: currency
            }
        ).format(amount);
    }
    
    formatDate(date) {
        return new Intl.DateTimeFormat(
            this.currentLanguage === 'ar' ? 'ar-SA' : 'en-US',
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        ).format(date);
    }
    
    formatTime(date) {
        return new Intl.DateTimeFormat(
            this.currentLanguage === 'ar' ? 'ar-SA' : 'en-US',
            {
                hour: '2-digit',
                minute: '2-digit'
            }
        ).format(date);
    }
    
    getRelativeTime(date) {
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) {
            return this.translate('time.now');
        } else if (diffInMinutes < 60) {
            return this.translate('time.minutes_ago', [diffInMinutes]);
        } else if (diffInMinutes < 1440) {
            const hours = Math.floor(diffInMinutes / 60);
            return this.translate('time.hours_ago', [hours]);
        } else {
            const days = Math.floor(diffInMinutes / 1440);
            return this.translate('time.days_ago', [days]);
        }
    }
}

// Create global instance
const languageManager = new LanguageManager();

// Export for global access
window.LanguageManager = languageManager;
window.translate = (key, params) => languageManager.translate(key, params);

// Backward compatibility
window.setLanguage = (language) => languageManager.setLanguage(language);
window.toggleLanguage = () => {
    const newLanguage = languageManager.getCurrentLanguage() === 'ar' ? 'en' : 'ar';
    languageManager.setLanguage(newLanguage);
};

console.log('Language management system loaded successfully');