// Leaderboard System for AffiliateHub

class Leaderboard {
    constructor() {
        this.marketers = [];
        this.currentLanguage = 'ar';
        this.sortBy = 'sales';
        this.sortOrder = 'desc';
        this.updateInterval = null;
        
        this.init();
    }
    
    init() {
        this.setupLanguageObserver();
        this.generateMockData();
        this.renderLeaderboard();
        this.startAutoUpdate();
        this.setupEventListeners();
    }
    
    setupLanguageObserver() {
        if (window.LanguageManager) {
            window.LanguageManager.addObserver((language) => {
                this.currentLanguage = language;
                this.renderLeaderboard();
            });
            this.currentLanguage = window.LanguageManager.getCurrentLanguage();
        }
    }
    
    setupEventListeners() {
        // Add click handlers for sorting
        const headers = document.querySelectorAll('.table-header > div');
        headers.forEach((header, index) => {
            if (index > 0) { // Skip rank column
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => {
                    this.handleSort(this.getSortKeyByIndex(index));
                });
            }
        });
    }
    
    getSortKeyByIndex(index) {
        const keys = ['rank', 'name', 'sales', 'commission', 'conversion'];
        return keys[index] || 'sales';
    }
    
    handleSort(key) {
        if (this.sortBy === key) {
            this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
        } else {
            this.sortBy = key;
            this.sortOrder = 'desc';
        }
        
        this.sortMarketers();
        this.renderLeaderboard();
    }
    
    generateMockData() {
        const names = {
            ar: [
                'أحمد محمد', 'فاطمة علي', 'محمد أحمد', 'عائشة حسن', 'علي محمود',
                'زينب عبدالله', 'حسام الدين', 'نور الهدى', 'عبدالرحمن سالم', 'مريم يوسف',
                'خالد عبدالعزيز', 'هدى محمد', 'عمر الفاروق', 'سارة أحمد', 'يوسف إبراهيم',
                'ليلى حسن', 'طارق محمود', 'رانيا علي', 'سامي عبدالله', 'دينا محمد',
                'كريم حسام', 'نادية سالم', 'وائل أحمد', 'منى يوسف', 'باسم محمد'
            ],
            en: [
                'Ahmed Mohamed', 'Fatima Ali', 'Mohamed Ahmed', 'Aisha Hassan', 'Ali Mahmoud',
                'Zeinab Abdullah', 'Hossam Eldin', 'Nour Elhoda', 'Abdelrahman Salem', 'Mariam Youssef',
                'Khaled Abdelaziz', 'Hoda Mohamed', 'Omar Elfarouk', 'Sara Ahmed', 'Youssef Ibrahim',
                'Layla Hassan', 'Tarek Mahmoud', 'Rania Ali', 'Sami Abdullah', 'Dina Mohamed',
                'Karim Hossam', 'Nadia Salem', 'Wael Ahmed', 'Mona Youssef', 'Basem Mohamed'
            ]
        };
        
        const countries = {
            ar: [
                'مصر', 'السعودية', 'الإمارات', 'الكويت', 'قطر', 'البحرين', 'عمان',
                'الأردن', 'لبنان', 'سوريا', 'العراق', 'المغرب', 'تونس', 'الجزائر',
                'ليبيا', 'السودان', 'اليمن', 'فلسطين'
            ],
            en: [
                'Egypt', 'Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Oman',
                'Jordan', 'Lebanon', 'Syria', 'Iraq', 'Morocco', 'Tunisia', 'Algeria',
                'Libya', 'Sudan', 'Yemen', 'Palestine'
            ]
        };
        
        this.marketers = [];
        
        for (let i = 0; i < 25; i++) {
            const sales = Math.floor(Math.random() * 100000) + 10000;
            const commissionRate = (Math.random() * 0.3 + 0.2); // 20-50%
            const commission = Math.floor(sales * commissionRate);
            const conversionRate = (Math.random() * 15 + 5); // 5-20%
            
            const marketer = {
                id: i + 1,
                name: {
                    ar: names.ar[i % names.ar.length],
                    en: names.en[i % names.en.length]
                },
                country: {
                    ar: countries.ar[Math.floor(Math.random() * countries.ar.length)],
                    en: countries.en[Math.floor(Math.random() * countries.en.length)]
                },
                avatar: this.generateAvatar(names.en[i % names.en.length]),
                sales: sales,
                commission: commission,
                conversionRate: conversionRate,
                joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
                totalClicks: Math.floor(Math.random() * 10000) + 1000,
                totalConversions: Math.floor(sales / 100),
                rank: i + 1
            };
            
            this.marketers.push(marketer);
        }
        
        this.sortMarketers();
    }
    
    generateAvatar(name) {
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        return initials.substring(0, 2);
    }
    
    sortMarketers() {
        this.marketers.sort((a, b) => {
            let aValue, bValue;
            
            switch (this.sortBy) {
                case 'name':
                    aValue = a.name[this.currentLanguage];
                    bValue = b.name[this.currentLanguage];
                    break;
                case 'sales':
                    aValue = a.sales;
                    bValue = b.sales;
                    break;
                case 'commission':
                    aValue = a.commission;
                    bValue = b.commission;
                    break;
                case 'conversion':
                    aValue = a.conversionRate;
                    bValue = b.conversionRate;
                    break;
                default:
                    aValue = a.sales;
                    bValue = b.sales;
            }
            
            if (typeof aValue === 'string') {
                return this.sortOrder === 'desc' ? 
                    bValue.localeCompare(aValue) : 
                    aValue.localeCompare(bValue);
            } else {
                return this.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
            }
        });
        
        // Update ranks
        this.marketers.forEach((marketer, index) => {
            marketer.rank = index + 1;
        });
    }
    
    renderLeaderboard() {
        const leaderboardData = document.getElementById('leaderboard-data');
        if (!leaderboardData) return;
        
        leaderboardData.innerHTML = '';
        
        // Show top 10 marketers
        const topMarketers = this.marketers.slice(0, 10);
        
        topMarketers.forEach((marketer, index) => {
            const row = this.createMarketerRow(marketer, index);
            leaderboardData.appendChild(row);
        });
        
        // Update statistics
        this.updateStatistics();
        
        // Add animations
        this.addRowAnimations();
    }
    
    createMarketerRow(marketer, index) {
        const row = document.createElement('div');
        row.className = 'leaderboard-row';
        row.style.animationDelay = `${index * 0.1}s`;
        
        const rankClass = this.getRankClass(marketer.rank);
        const conversionClass = this.getConversionClass(marketer.conversionRate);
        
        row.innerHTML = `
            <div class="rank ${rankClass}">${this.formatRank(marketer.rank)}</div>
            <div class="marketer-info">
                <div class="marketer-avatar">${marketer.avatar}</div>
                <div>
                    <div class="marketer-name">${marketer.name[this.currentLanguage]}</div>
                    <div class="marketer-country">${marketer.country[this.currentLanguage]}</div>
                </div>
            </div>
            <div class="sales-amount">${this.formatCurrency(marketer.sales)}</div>
            <div class="commission-amount">${this.formatCurrency(marketer.commission)}</div>
            <div class="conversion-rate ${conversionClass}">${marketer.conversionRate.toFixed(1)}%</div>
        `;
        
        // Add click handler for marketer details
        row.addEventListener('click', () => {
            this.showMarketerDetails(marketer);
        });
        
        return row;
    }
    
    formatRank(rank) {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return rank;
    }
    
    getRankClass(rank) {
        if (rank === 1) return 'gold';
        if (rank === 2) return 'silver';
        if (rank === 3) return 'bronze';
        return '';
    }
    
    getConversionClass(rate) {
        if (rate >= 15) return 'high';
        if (rate >= 10) return 'medium';
        return 'low';
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
    
    formatNumber(number) {
        if (window.LanguageManager) {
            return window.LanguageManager.formatNumber(number);
        }
        
        return new Intl.NumberFormat(
            this.currentLanguage === 'ar' ? 'ar-SA' : 'en-US'
        ).format(number);
    }
    
    updateStatistics() {
        // Total marketers
        const totalMarketersElement = document.getElementById('total-marketers');
        if (totalMarketersElement) {
            totalMarketersElement.textContent = this.formatNumber(this.marketers.length * 500 + 47); // Mock total
        }
        
        // Monthly sales
        const monthlySalesElement = document.getElementById('monthly-sales');
        if (monthlySalesElement) {
            const totalSales = this.marketers.reduce((sum, marketer) => sum + marketer.sales, 0);
            monthlySalesElement.textContent = this.formatCurrency(totalSales);
        }
        
        // Average commission
        const avgCommissionElement = document.getElementById('avg-commission');
        if (avgCommissionElement) {
            const avgCommission = this.marketers.reduce((sum, marketer) => sum + marketer.commission, 0) / this.marketers.length;
            avgCommissionElement.textContent = this.formatCurrency(avgCommission);
        }
    }
    
    addRowAnimations() {
        const rows = document.querySelectorAll('.leaderboard-row');
        rows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                row.style.transition = 'all 0.5s ease-out';
                row.style.opacity = '1';
                row.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    showMarketerDetails(marketer) {
        const modal = this.createMarketerModal(marketer);
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.style.display = 'block';
        }, 10);
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.close');
        const modalBackdrop = modal;
        
        closeBtn.addEventListener('click', () => {
            this.closeModal(modal);
        });
        
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                this.closeModal(modal);
            }
        });
    }
    
    createMarketerModal(marketer) {
        const modal = document.createElement('div');
        modal.className = 'modal marketer-modal';
        
        const joinDate = window.LanguageManager ? 
            window.LanguageManager.formatDate(marketer.joinDate) :
            marketer.joinDate.toLocaleDateString();
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${marketer.name[this.currentLanguage]}</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="marketer-details">
                        <div class="marketer-avatar-large">${marketer.avatar}</div>
                        <div class="marketer-info-detailed">
                            <h4>${marketer.name[this.currentLanguage]}</h4>
                            <p class="marketer-country">${marketer.country[this.currentLanguage]}</p>
                            <div class="marketer-rank">
                                <span class="rank-badge ${this.getRankClass(marketer.rank)}">
                                    ${this.currentLanguage === 'ar' ? 'المرتبة' : 'Rank'} #${marketer.rank}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="marketer-stats">
                        <div class="stat-item">
                            <div class="stat-value">${this.formatCurrency(marketer.sales)}</div>
                            <div class="stat-label">${this.currentLanguage === 'ar' ? 'إجمالي المبيعات' : 'Total Sales'}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${this.formatCurrency(marketer.commission)}</div>
                            <div class="stat-label">${this.currentLanguage === 'ar' ? 'إجمالي العمولة' : 'Total Commission'}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${marketer.conversionRate.toFixed(1)}%</div>
                            <div class="stat-label">${this.currentLanguage === 'ar' ? 'معدل التحويل' : 'Conversion Rate'}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${this.formatNumber(marketer.totalClicks)}</div>
                            <div class="stat-label">${this.currentLanguage === 'ar' ? 'إجمالي النقرات' : 'Total Clicks'}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${this.formatNumber(marketer.totalConversions)}</div>
                            <div class="stat-label">${this.currentLanguage === 'ar' ? 'إجمالي التحويلات' : 'Total Conversions'}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${joinDate}</div>
                            <div class="stat-label">${this.currentLanguage === 'ar' ? 'تاريخ الانضمام' : 'Join Date'}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles if not already added
        if (!document.querySelector('#marketer-modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'marketer-modal-styles';
            styles.textContent = `
                .marketer-modal .modal-content {
                    max-width: 600px;
                }
                
                .marketer-details {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-lg);
                    margin-bottom: var(--spacing-xl);
                    padding-bottom: var(--spacing-lg);
                    border-bottom: 1px solid var(--gray-200);
                }
                
                .marketer-avatar-large {
                    width: 80px;
                    height: 80px;
                    background: var(--gradient-primary);
                    color: var(--white);
                    border-radius: var(--radius-full);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--font-size-2xl);
                    font-weight: 700;
                }
                
                .marketer-info-detailed h4 {
                    font-size: var(--font-size-xl);
                    margin-bottom: var(--spacing-sm);
                    color: var(--gray-900);
                }
                
                .marketer-info-detailed .marketer-country {
                    color: var(--gray-600);
                    margin-bottom: var(--spacing-md);
                }
                
                .rank-badge {
                    display: inline-block;
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    color: var(--white);
                }
                
                .rank-badge.gold { background: linear-gradient(135deg, #ffd700, #ffed4e); color: var(--gray-900); }
                .rank-badge.silver { background: linear-gradient(135deg, #c0c0c0, #e5e5e5); color: var(--gray-900); }
                .rank-badge.bronze { background: linear-gradient(135deg, #cd7f32, #daa520); }
                .rank-badge:not(.gold):not(.silver):not(.bronze) { background: var(--gradient-primary); }
                
                .marketer-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: var(--spacing-lg);
                }
                
                .stat-item {
                    text-align: center;
                    padding: var(--spacing-lg);
                    background: var(--gray-100);
                    border-radius: var(--radius-lg);
                }
                
                .stat-value {
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-sm);
                }
                
                .stat-label {
                    font-size: var(--font-size-sm);
                    color: var(--gray-600);
                }
            `;
            document.head.appendChild(styles);
        }
        
        return modal;
    }
    
    closeModal(modal) {
        modal.style.display = 'none';
        setTimeout(() => {
            if (modal.parentElement) {
                modal.parentElement.removeChild(modal);
            }
        }, 300);
    }
    
    startAutoUpdate() {
        // Update leaderboard every 30 seconds with slight variations
        this.updateInterval = setInterval(() => {
            this.simulateDataChanges();
            this.sortMarketers();
            this.renderLeaderboard();
        }, 30000);
    }
    
    simulateDataChanges() {
        // Randomly update some marketers' data to simulate real-time changes
        const numUpdates = Math.floor(Math.random() * 5) + 1;
        
        for (let i = 0; i < numUpdates; i++) {
            const randomIndex = Math.floor(Math.random() * this.marketers.length);
            const marketer = this.marketers[randomIndex];
            
            // Small random changes
            const salesChange = Math.floor(Math.random() * 1000) - 500;
            const conversionChange = (Math.random() - 0.5) * 2;
            
            marketer.sales = Math.max(0, marketer.sales + salesChange);
            marketer.commission = Math.floor(marketer.sales * (Math.random() * 0.3 + 0.2));
            marketer.conversionRate = Math.max(1, Math.min(20, marketer.conversionRate + conversionChange));
        }
    }
    
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
    
    // Public API methods
    getTopMarketers(count = 10) {
        return this.marketers.slice(0, count);
    }
    
    getMarketerByRank(rank) {
        return this.marketers.find(m => m.rank === rank);
    }
    
    getTotalStats() {
        return {
            totalMarketers: this.marketers.length,
            totalSales: this.marketers.reduce((sum, m) => sum + m.sales, 0),
            totalCommissions: this.marketers.reduce((sum, m) => sum + m.commission, 0),
            averageConversion: this.marketers.reduce((sum, m) => sum + m.conversionRate, 0) / this.marketers.length
        };
    }
    
    searchMarketers(query) {
        const lowerQuery = query.toLowerCase();
        return this.marketers.filter(marketer => 
            marketer.name.ar.toLowerCase().includes(lowerQuery) ||
            marketer.name.en.toLowerCase().includes(lowerQuery) ||
            marketer.country.ar.toLowerCase().includes(lowerQuery) ||
            marketer.country.en.toLowerCase().includes(lowerQuery)
        );
    }
}

// Initialize leaderboard when DOM is loaded
function loadLeaderboardData() {
    if (!window.leaderboard) {
        window.leaderboard = new Leaderboard();
    }
}

// Export for global access
window.Leaderboard = Leaderboard;

console.log('Leaderboard system loaded successfully');