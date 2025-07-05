// Dashboard Management System for AffiliateHub

class Dashboard {
    constructor() {
        this.currentSection = 'dashboard';
        this.currentLanguage = 'ar';
        this.charts = {};
        this.data = {
            stats: {},
            campaigns: [],
            products: [],
            links: [],
            commissions: [],
            activities: []
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupLanguageObserver();
        this.loadDashboardData();
        this.initializeCharts();
        this.setupSidebar();
        this.setupDropdowns();
        this.checkAuthentication();
    }
    
    checkAuthentication() {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const user = localStorage.getItem('user');
        
        if (!isLoggedIn || !user) {
            // Redirect to login page
            window.location.href = 'index.html';
            return;
        }
        
        // Update user info in header
        const userData = JSON.parse(user);
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = userData.fullname || userData.username;
        }
    }
    
    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }
        
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.switchSection(section);
            });
        });
        
        // Search functionality
        const searchInput = document.getElementById('dashboard-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
        
        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Click outside to close dropdowns
        document.addEventListener('click', (e) => {
            this.closeDropdowns(e);
        });
    }
    
    setupLanguageObserver() {
        if (window.LanguageManager) {
            window.LanguageManager.addObserver((language) => {
                this.currentLanguage = language;
                this.updateDashboardLanguage();
            });
            this.currentLanguage = window.LanguageManager.getCurrentLanguage();
        }
    }
    
    setupSidebar() {
        const sidebar = document.getElementById('dashboard-sidebar');
        const main = document.querySelector('.dashboard-main');
        
        // Handle mobile sidebar
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
    }
    
    setupDropdowns() {
        // Notifications dropdown
        const notificationBtn = document.getElementById('notification-btn');
        const notificationsMenu = document.getElementById('notifications-menu');
        
        if (notificationBtn && notificationsMenu) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationsMenu.classList.toggle('active');
                
                // Close user menu if open
                const userMenu = document.getElementById('user-menu');
                if (userMenu) {
                    userMenu.classList.remove('active');
                }
            });
        }
        
        // User dropdown
        const userBtn = document.getElementById('user-btn');
        const userMenu = document.getElementById('user-menu');
        
        if (userBtn && userMenu) {
            userBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userMenu.classList.toggle('active');
                
                // Close notifications menu if open
                if (notificationsMenu) {
                    notificationsMenu.classList.remove('active');
                }
            });
        }
    }
    
    closeDropdowns(e) {
        const notificationsMenu = document.getElementById('notifications-menu');
        const userMenu = document.getElementById('user-menu');
        
        if (notificationsMenu && !e.target.closest('.notifications-dropdown')) {
            notificationsMenu.classList.remove('active');
        }
        
        if (userMenu && !e.target.closest('.user-dropdown')) {
            userMenu.classList.remove('active');
        }
    }
    
    toggleSidebar() {
        const sidebar = document.getElementById('dashboard-sidebar');
        if (window.innerWidth <= 1024) {
            sidebar.classList.toggle('active');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    }
    
    switchSection(sectionName) {
        // Hide all sections
        const sections = document.querySelectorAll('.dashboard-section');
        sections.forEach(section => section.classList.remove('active'));
        
        // Show target section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Update navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        
        const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`).closest('.nav-item');
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
        
        this.currentSection = sectionName;
        
        // Load section-specific data
        this.loadSectionData(sectionName);
        
        // Close mobile sidebar
        if (window.innerWidth <= 1024) {
            const sidebar = document.getElementById('dashboard-sidebar');
            sidebar.classList.remove('active');
        }
    }
    
    loadDashboardData() {
        // Generate mock data
        this.generateMockStats();
        this.generateMockCampaigns();
        this.generateMockProducts();
        this.generateMockLinks();
        this.generateMockCommissions();
        this.generateMockActivities();
        
        // Render initial data
        this.renderStats();
        this.renderRecentActivity();
    }
    
    generateMockStats() {
        this.data.stats = {
            totalEarnings: 2847,
            totalClicks: 15234,
            totalConversions: 1847,
            conversionRate: 12.1,
            pendingCommission: 1247,
            confirmedCommission: 2847,
            monthlyGrowth: {
                earnings: 12.5,
                clicks: 8.3,
                conversions: 15.7,
                rate: 2.1
            }
        };
    }
    
    generateMockCampaigns() {
        this.data.campaigns = [
            {
                id: 1,
                name: { ar: 'حملة المنتجات التقنية', en: 'Tech Products Campaign' },
                status: 'active',
                clicks: 2340,
                conversions: 187,
                earnings: 1250,
                startDate: new Date('2024-01-15'),
                endDate: new Date('2024-03-15')
            },
            {
                id: 2,
                name: { ar: 'حملة المنتجات الصحية', en: 'Health Products Campaign' },
                status: 'paused',
                clicks: 1890,
                conversions: 145,
                earnings: 980,
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-04-01')
            },
            {
                id: 3,
                name: { ar: 'حملة الدورات التعليمية', en: 'Educational Courses Campaign' },
                status: 'active',
                clicks: 3120,
                conversions: 234,
                earnings: 1560,
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-06-01')
            }
        ];
    }
    
    generateMockProducts() {
        this.data.products = [
            {
                id: 1,
                name: { ar: 'دورة تطوير المواقع', en: 'Web Development Course' },
                description: { ar: 'دورة شاملة لتعلم تطوير المواقع من الصفر', en: 'Complete course for learning web development from scratch' },
                category: 'education',
                commission: 45,
                price: 199,
                rating: 4.8
            },
            {
                id: 2,
                name: { ar: 'مكملات غذائية طبيعية', en: 'Natural Food Supplements' },
                description: { ar: 'مكملات غذائية طبيعية عالية الجودة', en: 'High-quality natural food supplements' },
                category: 'health',
                commission: 35,
                price: 89,
                rating: 4.6
            },
            {
                id: 3,
                name: { ar: 'برنامج إدارة المشاريع', en: 'Project Management Software' },
                description: { ar: 'برنامج متقدم لإدارة المشاريع والفرق', en: 'Advanced software for project and team management' },
                category: 'tech',
                commission: 50,
                price: 299,
                rating: 4.9
            }
        ];
    }
    
    generateMockLinks() {
        this.data.links = [
            {
                id: 1,
                productName: { ar: 'دورة تطوير المواقع', en: 'Web Development Course' },
                url: 'https://affiliate.example.com/web-dev-course?ref=user123',
                clicks: 1234,
                conversions: 89,
                commission: 445,
                createdDate: new Date('2024-01-15')
            },
            {
                id: 2,
                productName: { ar: 'مكملات غذائية طبيعية', en: 'Natural Food Supplements' },
                url: 'https://affiliate.example.com/supplements?ref=user123',
                clicks: 890,
                conversions: 67,
                commission: 234,
                createdDate: new Date('2024-02-01')
            }
        ];
    }
    
    generateMockCommissions() {
        this.data.commissions = [
            {
                id: 1,
                date: new Date('2024-02-15'),
                productName: { ar: 'دورة تطوير المواقع', en: 'Web Development Course' },
                amount: 199,
                commission: 89,
                status: 'confirmed'
            },
            {
                id: 2,
                date: new Date('2024-02-14'),
                productName: { ar: 'مكملات غذائية طبيعية', en: 'Natural Food Supplements' },
                amount: 89,
                commission: 31,
                status: 'pending'
            },
            {
                id: 3,
                date: new Date('2024-02-13'),
                productName: { ar: 'برنامج إدارة المشاريع', en: 'Project Management Software' },
                amount: 299,
                commission: 149,
                status: 'confirmed'
            }
        ];
    }
    
    generateMockActivities() {
        this.data.activities = [
            {
                id: 1,
                type: 'commission',
                title: { ar: 'عمولة جديدة', en: 'New Commission' },
                description: { ar: 'تم إضافة عمولة بقيمة $89', en: 'Commission of $89 added' },
                time: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
                icon: 'fas fa-dollar-sign',
                iconClass: 'success'
            },
            {
                id: 2,
                type: 'click',
                title: { ar: 'نقرات جديدة', en: 'New Clicks' },
                description: { ar: 'تم تسجيل 25 نقرة جديدة', en: '25 new clicks recorded' },
                time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
                icon: 'fas fa-mouse-pointer',
                iconClass: 'info'
            },
            {
                id: 3,
                type: 'conversion',
                title: { ar: 'تحويل جديد', en: 'New Conversion' },
                description: { ar: 'تم تحويل زائر إلى عميل', en: 'Visitor converted to customer' },
                time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                icon: 'fas fa-exchange-alt',
                iconClass: 'warning'
            }
        ];
    }
    
    renderStats() {
        // Update stat cards
        const elements = {
            'total-earnings': this.formatCurrency(this.data.stats.totalEarnings),
            'total-clicks': this.formatNumber(this.data.stats.totalClicks),
            'total-conversions': this.formatNumber(this.data.stats.totalConversions),
            'conversion-rate': this.data.stats.conversionRate.toFixed(1) + '%',
            'pending-commission': this.formatCurrency(this.data.stats.pendingCommission),
            'confirmed-commission': this.formatCurrency(this.data.stats.confirmedCommission)
        };
        
        Object.keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = elements[id];
            }
        });
    }
    
    renderRecentActivity() {
        const activityList = document.getElementById('recent-activity');
        if (!activityList) return;
        
        activityList.innerHTML = '';
        
        this.data.activities.slice(0, 5).forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            activityItem.innerHTML = `
                <div class="activity-icon ${activity.iconClass}">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>${activity.title[this.currentLanguage]}</h4>
                    <p>${activity.description[this.currentLanguage]}</p>
                </div>
                <div class="activity-time">
                    ${this.formatRelativeTime(activity.time)}
                </div>
            `;
            
            activityList.appendChild(activityItem);
        });
    }
    
    loadSectionData(sectionName) {
        switch (sectionName) {
            case 'campaigns':
                this.renderCampaigns();
                break;
            case 'products':
                this.renderProducts();
                break;
            case 'links':
                this.renderLinks();
                break;
            case 'commissions':
                this.renderCommissions();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
        }
    }
    
    renderCampaigns() {
        const campaignsGrid = document.getElementById('campaigns-grid');
        if (!campaignsGrid) return;
        
        campaignsGrid.innerHTML = '';
        
        this.data.campaigns.forEach(campaign => {
            const campaignCard = document.createElement('div');
            campaignCard.className = 'campaign-card';
            
            const statusText = {
                active: { ar: 'نشطة', en: 'Active' },
                paused: { ar: 'متوقفة', en: 'Paused' },
                ended: { ar: 'منتهية', en: 'Ended' }
            };
            
            campaignCard.innerHTML = `
                <div class="campaign-header">
                    <h3 class="campaign-title">${campaign.name[this.currentLanguage]}</h3>
                    <span class="campaign-status ${campaign.status}">
                        ${statusText[campaign.status][this.currentLanguage]}
                    </span>
                </div>
                <div class="campaign-body">
                    <div class="campaign-stats">
                        <div class="campaign-stat">
                            <div class="campaign-stat-value">${this.formatNumber(campaign.clicks)}</div>
                            <div class="campaign-stat-label">${this.currentLanguage === 'ar' ? 'النقرات' : 'Clicks'}</div>
                        </div>
                        <div class="campaign-stat">
                            <div class="campaign-stat-value">${this.formatNumber(campaign.conversions)}</div>
                            <div class="campaign-stat-label">${this.currentLanguage === 'ar' ? 'التحويلات' : 'Conversions'}</div>
                        </div>
                        <div class="campaign-stat">
                            <div class="campaign-stat-value">${this.formatCurrency(campaign.earnings)}</div>
                            <div class="campaign-stat-label">${this.currentLanguage === 'ar' ? 'الأرباح' : 'Earnings'}</div>
                        </div>
                        <div class="campaign-stat">
                            <div class="campaign-stat-value">${((campaign.conversions / campaign.clicks) * 100).toFixed(1)}%</div>
                            <div class="campaign-stat-label">${this.currentLanguage === 'ar' ? 'معدل التحويل' : 'Conv. Rate'}</div>
                        </div>
                    </div>
                    <div class="campaign-actions">
                        <button class="btn btn-sm btn-primary" onclick="dashboard.editCampaign(${campaign.id})">
                            ${this.currentLanguage === 'ar' ? 'تعديل' : 'Edit'}
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="dashboard.viewCampaignStats(${campaign.id})">
                            ${this.currentLanguage === 'ar' ? 'الإحصائيات' : 'Stats'}
                        </button>
                    </div>
                </div>
            `;
            
            campaignsGrid.appendChild(campaignCard);
        });
    }
    
    renderProducts() {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;
        
        productsGrid.innerHTML = '';
        
        this.data.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <i class="fas fa-box"></i>
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.name[this.currentLanguage]}</h3>
                    <p class="product-description">${product.description[this.currentLanguage]}</p>
                    <div class="product-commission">
                        <div>
                            <div class="commission-rate">${product.commission}%</div>
                            <div class="commission-label">${this.currentLanguage === 'ar' ? 'عمولة' : 'Commission'}</div>
                        </div>
                        <div>
                            <div class="commission-rate">${this.formatCurrency(product.price)}</div>
                            <div class="commission-label">${this.currentLanguage === 'ar' ? 'السعر' : 'Price'}</div>
                        </div>
                    </div>
                    <button class="btn btn-primary full-width" onclick="dashboard.promoteProduct(${product.id})">
                        ${this.currentLanguage === 'ar' ? 'ترويج المنتج' : 'Promote Product'}
                    </button>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
    }
    
    renderLinks() {
        const linksTableBody = document.getElementById('links-table-body');
        if (!linksTableBody) return;
        
        linksTableBody.innerHTML = '';
        
        this.data.links.forEach(link => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${link.productName[this.currentLanguage]}</td>
                <td>
                    <div class="link-url" title="${link.url}">
                        ${link.url}
                    </div>
                </td>
                <td>${this.formatNumber(link.clicks)}</td>
                <td>${this.formatNumber(link.conversions)}</td>
                <td>${this.formatCurrency(link.commission)}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="dashboard.copyLink('${link.url}')">
                        ${this.currentLanguage === 'ar' ? 'نسخ' : 'Copy'}
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="dashboard.editLink(${link.id})">
                        ${this.currentLanguage === 'ar' ? 'تعديل' : 'Edit'}
                    </button>
                </td>
            `;
            
            linksTableBody.appendChild(row);
        });
    }
    
    renderCommissions() {
        const commissionsTableBody = document.getElementById('commissions-table-body');
        if (!commissionsTableBody) return;
        
        commissionsTableBody.innerHTML = '';
        
        this.data.commissions.forEach(commission => {
            const row = document.createElement('tr');
            
            const statusText = {
                pending: { ar: 'معلقة', en: 'Pending' },
                confirmed: { ar: 'مؤكدة', en: 'Confirmed' },
                cancelled: { ar: 'ملغية', en: 'Cancelled' }
            };
            
            row.innerHTML = `
                <td>${this.formatDate(commission.date)}</td>
                <td>${commission.productName[this.currentLanguage]}</td>
                <td>${this.formatCurrency(commission.amount)}</td>
                <td>${this.formatCurrency(commission.commission)}</td>
                <td>
                    <span class="status-badge ${commission.status}">
                        ${statusText[commission.status][this.currentLanguage]}
                    </span>
                </td>
            `;
            
            commissionsTableBody.appendChild(row);
        });
    }
    
    initializeCharts() {
        // Initialize Chart.js charts
        this.initEarningsChart();
        this.initProductsChart();
    }
    
    initEarningsChart() {
        const ctx = document.getElementById('earnings-chart');
        if (!ctx) return;
        
        const data = {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: this.currentLanguage === 'ar' ? 'الأرباح' : 'Earnings',
                data: [1200, 1900, 3000, 2500, 2200, 2847],
                borderColor: 'rgb(102, 126, 234)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };
        
        this.charts.earnings = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
    }
    
    initProductsChart() {
        const ctx = document.getElementById('products-chart');
        if (!ctx) return;
        
        const data = {
            labels: [
                this.currentLanguage === 'ar' ? 'التكنولوجيا' : 'Technology',
                this.currentLanguage === 'ar' ? 'الصحة' : 'Health',
                this.currentLanguage === 'ar' ? 'التعليم' : 'Education'
            ],
            datasets: [{
                data: [45, 30, 25],
                backgroundColor: [
                    'rgb(102, 126, 234)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)'
                ]
            }]
        };
        
        this.charts.products = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Utility Methods
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
    
    formatDate(date) {
        if (window.LanguageManager) {
            return window.LanguageManager.formatDate(date);
        }
        
        return new Intl.DateTimeFormat(
            this.currentLanguage === 'ar' ? 'ar-SA' : 'en-US',
            {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }
        ).format(date);
    }
    
    formatRelativeTime(date) {
        if (window.LanguageManager) {
            return window.LanguageManager.getRelativeTime(date);
        }
        
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) {
            return this.currentLanguage === 'ar' ? 'الآن' : 'Now';
        } else if (diffInMinutes < 60) {
            return this.currentLanguage === 'ar' ? 
                `منذ ${diffInMinutes} دقائق` : 
                `${diffInMinutes} minutes ago`;
        } else {
            const hours = Math.floor(diffInMinutes / 60);
            return this.currentLanguage === 'ar' ? 
                `منذ ${hours} ساعات` : 
                `${hours} hours ago`;
        }
    }
    
    handleSearch(query) {
        // Implement search functionality
        console.log('Searching for:', query);
    }
    
    handleResize() {
        // Handle responsive behavior
        const sidebar = document.getElementById('dashboard-sidebar');
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('collapsed');
        }
        
        // Resize charts
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }
    
    updateDashboardLanguage() {
        // Update chart labels and data
        if (this.charts.earnings) {
            this.charts.earnings.data.labels = this.currentLanguage === 'ar' ? 
                ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'] :
                ['January', 'February', 'March', 'April', 'May', 'June'];
            this.charts.earnings.update();
        }
        
        if (this.charts.products) {
            this.charts.products.data.labels = [
                this.currentLanguage === 'ar' ? 'التكنولوجيا' : 'Technology',
                this.currentLanguage === 'ar' ? 'الصحة' : 'Health',
                this.currentLanguage === 'ar' ? 'التعليم' : 'Education'
            ];
            this.charts.products.update();
        }
        
        // Re-render current section
        this.loadSectionData(this.currentSection);
        this.renderRecentActivity();
    }
    
    // Action Methods
    editCampaign(campaignId) {
        console.log('Edit campaign:', campaignId);
        // Implement edit campaign functionality
    }
    
    viewCampaignStats(campaignId) {
        console.log('View campaign stats:', campaignId);
        // Implement view campaign stats functionality
    }
    
    promoteProduct(productId) {
        console.log('Promote product:', productId);
        // Implement promote product functionality
    }
    
    copyLink(url) {
        navigator.clipboard.writeText(url).then(() => {
            if (window.showNotification) {
                window.showNotification(
                    this.currentLanguage === 'ar' ? 'تم نسخ الرابط' : 'Link copied',
                    'success'
                );
            }
        });
    }
    
    editLink(linkId) {
        console.log('Edit link:', linkId);
        // Implement edit link functionality
    }
    
    renderAnalytics() {
        // Implement analytics rendering
        console.log('Rendering analytics...');
    }
    
    updateAnalytics() {
        // Implement analytics update
        console.log('Updating analytics...');
    }
}

// Modal Functions
function openCreateCampaignModal() {
    console.log('Open create campaign modal');
    // Implement modal functionality
}

function openCreateLinkModal() {
    console.log('Open create link modal');
    // Implement modal functionality
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.dashboard = new Dashboard();
    
    // Initialize theme system if available
    setTimeout(() => {
        if (window.themeSystem) {
            // Theme system already loaded from main.js
            console.log('Theme system available in dashboard');
        } else {
            // Load theme system for dashboard
            const script = document.createElement('script');
            script.src = 'js/main.js';
            document.head.appendChild(script);
        }
    }, 500);
});

// Export for global access
window.Dashboard = Dashboard;

console.log('Dashboard system loaded successfully');