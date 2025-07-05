// Offers System for AffiliateHub

class OffersSystem {
    constructor() {
        this.offers = [];
        this.currentLanguage = 'ar';
        this.timers = {};
        
        this.init();
    }
    
    init() {
        this.setupLanguageObserver();
        this.generateOffersData();
        this.renderOffers();
        this.startCountdownTimers();
    }
    
    setupLanguageObserver() {
        if (window.LanguageManager) {
            window.LanguageManager.addObserver((language) => {
                this.currentLanguage = language;
                this.updateOffersLanguage();
            });
            this.currentLanguage = window.LanguageManager.getCurrentLanguage();
        }
    }
    
    generateOffersData() {
        this.offers = [
            {
                id: 1,
                title: {
                    ar: 'عرض خاص - دورة التسويق الرقمي',
                    en: 'Special Offer - Digital Marketing Course'
                },
                description: {
                    ar: 'احصل على دورة شاملة في التسويق الرقمي مع شهادة معتمدة وأكثر من 50 ساعة تدريبية',
                    en: 'Get a comprehensive digital marketing course with certified certificate and over 50 training hours'
                },
                originalPrice: 299,
                currentPrice: 149,
                discount: 50,
                commission: 45,
                features: {
                    ar: [
                        'أكثر من 50 ساعة تدريبية',
                        'شهادة معتمدة',
                        'دعم مدى الحياة',
                        'مشاريع عملية',
                        'مجتمع حصري'
                    ],
                    en: [
                        'Over 50 training hours',
                        'Certified certificate',
                        'Lifetime support',
                        'Practical projects',
                        'Exclusive community'
                    ]
                },
                endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
                badge: {
                    ar: 'الأكثر مبيعاً',
                    en: 'Best Seller'
                },
                featured: true,
                category: 'education'
            },
            {
                id: 2,
                title: {
                    ar: 'باقة المكملات الغذائية الطبيعية',
                    en: 'Natural Supplements Package'
                },
                description: {
                    ar: 'مجموعة متكاملة من المكملات الغذائية الطبيعية عالية الجودة لصحة أفضل',
                    en: 'Complete set of high-quality natural food supplements for better health'
                },
                originalPrice: 199,
                currentPrice: 99,
                discount: 50,
                commission: 35,
                features: {
                    ar: [
                        'مكونات طبيعية 100%',
                        'معتمد من FDA',
                        'ضمان استرداد المال',
                        'شحن مجاني',
                        'استشارة مجانية'
                    ],
                    en: [
                        '100% natural ingredients',
                        'FDA approved',
                        'Money back guarantee',
                        'Free shipping',
                        'Free consultation'
                    ]
                },
                endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
                badge: {
                    ar: 'عرض محدود',
                    en: 'Limited Offer'
                },
                featured: false,
                category: 'health'
            },
            {
                id: 3,
                title: {
                    ar: 'برنامج إدارة المشاريع المتقدم',
                    en: 'Advanced Project Management Software'
                },
                description: {
                    ar: 'أداة قوية لإدارة المشاريع والفرق مع ميزات متقدمة وتقارير شاملة',
                    en: 'Powerful tool for project and team management with advanced features and comprehensive reports'
                },
                originalPrice: 499,
                currentPrice: 249,
                discount: 50,
                commission: 50,
                features: {
                    ar: [
                        'إدارة مشاريع غير محدودة',
                        'تعاون الفريق',
                        'تقارير متقدمة',
                        'تكامل مع الأدوات',
                        'دعم 24/7'
                    ],
                    en: [
                        'Unlimited project management',
                        'Team collaboration',
                        'Advanced reports',
                        'Tool integration',
                        '24/7 support'
                    ]
                },
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                badge: {
                    ar: 'جديد',
                    en: 'New'
                },
                featured: false,
                category: 'software'
            }
        ];
    }
    
    renderOffers() {
        const offersGrid = document.getElementById('offers-grid');
        if (!offersGrid) return;
        
        offersGrid.innerHTML = '';
        
        this.offers.forEach((offer, index) => {
            const offerCard = this.createOfferCard(offer, index);
            offersGrid.appendChild(offerCard);
        });
    }
    
    createOfferCard(offer, index) {
        const card = document.createElement('div');
        card.className = `offer-card ${offer.featured ? 'featured' : ''}`;
        card.style.animationDelay = `${index * 0.1}s`;
        
        const discountPercent = Math.round(((offer.originalPrice - offer.currentPrice) / offer.originalPrice) * 100);
        
        card.innerHTML = `
            <div class="offer-badge">${offer.badge[this.currentLanguage]}</div>
            
            <div class="offer-header">
                <h3 class="offer-title">${offer.title[this.currentLanguage]}</h3>
                <p class="offer-description">${offer.description[this.currentLanguage]}</p>
            </div>
            
            <div class="offer-price">
                <span class="offer-current-price">${this.formatCurrency(offer.currentPrice)}</span>
                <span class="offer-original-price">${this.formatCurrency(offer.originalPrice)}</span>
                <span class="offer-discount">-${discountPercent}%</span>
            </div>
            
            <ul class="offer-features">
                ${offer.features[this.currentLanguage].map(feature => 
                    `<li><i class="fas fa-check"></i> ${feature}</li>`
                ).join('')}
            </ul>
            
            <div class="offer-timer">
                <div class="offer-timer-label">
                    ${this.currentLanguage === 'ar' ? 'ينتهي العرض خلال:' : 'Offer ends in:'}
                </div>
                <div class="offer-countdown" id="countdown-${offer.id}">
                    <!-- Countdown will be populated by JavaScript -->
                </div>
            </div>
            
            <div class="offer-action">
                <button class="btn btn-primary offer-btn" onclick="offersSystem.promoteOffer(${offer.id})">
                    <span>
                        ${this.currentLanguage === 'ar' ? `ابدأ الترويج - عمولة ${offer.commission}%` : `Start Promoting - ${offer.commission}% Commission`}
                    </span>
                </button>
            </div>
        `;
        
        return card;
    }
    
    startCountdownTimers() {
        this.offers.forEach(offer => {
            this.startCountdown(offer.id, offer.endDate);
        });
    }
    
    startCountdown(offerId, endDate) {
        const countdownElement = document.getElementById(`countdown-${offerId}`);
        if (!countdownElement) return;
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = endDate.getTime() - now;
            
            if (distance < 0) {
                countdownElement.innerHTML = this.currentLanguage === 'ar' ? 
                    '<span style="color: var(--error-color);">انتهى العرض</span>' : 
                    '<span style="color: var(--error-color);">Offer Expired</span>';
                clearInterval(this.timers[offerId]);
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const labels = this.currentLanguage === 'ar' ? 
                { days: 'يوم', hours: 'ساعة', minutes: 'دقيقة', seconds: 'ثانية' } :
                { days: 'days', hours: 'hours', minutes: 'mins', seconds: 'secs' };
            
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">${labels.days}</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">${labels.hours}</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">${labels.minutes}</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">${labels.seconds}</span>
                </div>
            `;
        };
        
        updateCountdown(); // Initial call
        this.timers[offerId] = setInterval(updateCountdown, 1000);
    }
    
    updateOffersLanguage() {
        // Clear existing timers
        Object.values(this.timers).forEach(timer => clearInterval(timer));
        this.timers = {};
        
        // Re-render offers with new language
        this.renderOffers();
        this.startCountdownTimers();
    }
    
    formatCurrency(amount) {
        if (window.LanguageManager) {
            return window.LanguageManager.formatCurrency(amount);
        }
        
        return new Intl.NumberFormat(
            this.currentLanguage === 'ar' ? 'ar-SA' : 'en-US',
            {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }
        ).format(amount);
    }
    
    promoteOffer(offerId) {
        const offer = this.offers.find(o => o.id === offerId);
        if (!offer) return;
        
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            if (window.openLoginModal) {
                window.openLoginModal();
            } else {
                alert(this.currentLanguage === 'ar' ? 
                    'يرجى تسجيل الدخول أولاً' : 
                    'Please login first');
            }
            return;
        }
        
        // Generate affiliate link
        const affiliateLink = this.generateAffiliateLink(offer);
        
        // Show promotion modal
        this.showPromotionModal(offer, affiliateLink);
    }
    
    generateAffiliateLink(offer) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.username || 'demo';
        return `https://affiliatehub.com/offer/${offer.id}?ref=${userId}&utm_source=affiliate&utm_campaign=${offer.category}`;
    }
    
    showPromotionModal(offer, affiliateLink) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${this.currentLanguage === 'ar' ? 'رابط الترويج' : 'Promotion Link'}</h3>
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="promotion-info">
                        <h4>${offer.title[this.currentLanguage]}</h4>
                        <p><strong>${this.currentLanguage === 'ar' ? 'العمولة:' : 'Commission:'}</strong> ${offer.commission}%</p>
                        <p><strong>${this.currentLanguage === 'ar' ? 'السعر:' : 'Price:'}</strong> ${this.formatCurrency(offer.currentPrice)}</p>
                        <p><strong>${this.currentLanguage === 'ar' ? 'العمولة المتوقعة:' : 'Expected Commission:'}</strong> ${this.formatCurrency(offer.currentPrice * offer.commission / 100)}</p>
                    </div>
                    
                    <div class="affiliate-link-container" style="margin: 20px 0;">
                        <label style="display: block; margin-bottom: 10px; font-weight: 600;">${this.currentLanguage === 'ar' ? 'رابط العمولة الخاص بك:' : 'Your Affiliate Link:'}</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="affiliate-link-input" value="${affiliateLink}" readonly style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
                            <button class="btn btn-secondary" onclick="offersSystem.copyAffiliateLink()" style="padding: 10px 20px;">
                                ${this.currentLanguage === 'ar' ? 'نسخ' : 'Copy'}
                            </button>
                        </div>
                    </div>
                    
                    <div class="promotion-tips" style="margin-top: 20px;">
                        <h5>${this.currentLanguage === 'ar' ? 'نصائح للترويج:' : 'Promotion Tips:'}</h5>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            <li>${this.currentLanguage === 'ar' ? 'شارك الرابط على وسائل التواصل الاجتماعي' : 'Share the link on social media'}</li>
                            <li>${this.currentLanguage === 'ar' ? 'اكتب مراجعة صادقة عن المنتج' : 'Write an honest product review'}</li>
                            <li>${this.currentLanguage === 'ar' ? 'استخدم الصور والفيديوهات الترويجية' : 'Use promotional images and videos'}</li>
                            <li>${this.currentLanguage === 'ar' ? 'استهدف الجمهور المناسب' : 'Target the right audience'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    copyAffiliateLink() {
        const input = document.getElementById('affiliate-link-input');
        if (input) {
            input.select();
            document.execCommand('copy');
            
            if (window.showNotification) {
                window.showNotification(
                    this.currentLanguage === 'ar' ? 'تم نسخ الرابط بنجاح!' : 'Link copied successfully!',
                    'success'
                );
            } else {
                alert(this.currentLanguage === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!');
            }
        }
    }
}

// Global function for showing all offers
function showAllOffers() {
    if (window.offersSystem) {
        // Scroll to offers section
        const offersSection = document.getElementById('offers');
        if (offersSection) {
            offersSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        console.log('Showing all offers...');
    }
}

// Initialize offers system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('offers-grid')) {
        window.offersSystem = new OffersSystem();
    }
});

// Export for global access
window.OffersSystem = OffersSystem;

console.log('Offers system loaded successfully');