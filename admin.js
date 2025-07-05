// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.currentTab = 'users';
        this.currentLanguage = localStorage.getItem('language') || 'ar';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAdminData();
        this.initCharts();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Language change listener
        document.addEventListener('languageChanged', (e) => {
            this.currentLanguage = e.detail.language;
            this.updateTranslations();
        });

        // Filter listeners
        const userStatusFilter = document.getElementById('user-status-filter');
        if (userStatusFilter) {
            userStatusFilter.addEventListener('change', () => this.filterUsers());
        }

        const userSearch = document.getElementById('user-search');
        if (userSearch) {
            userSearch.addEventListener('input', () => this.searchUsers());
        }

        // Analytics period change
        const analyticsPeriod = document.getElementById('analytics-period');
        if (analyticsPeriod) {
            analyticsPeriod.addEventListener('change', () => this.updateAnalytics());
        }
    }

    switchTab(tabName) {
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and button
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;
        this.loadTabData(tabName);
    }

    loadTabData(tabName) {
        switch(tabName) {
            case 'users':
                this.loadUsersData();
                break;
            case 'content':
                this.loadContentData();
                break;
            case 'products':
                this.loadProductsData();
                break;
            case 'analytics':
                this.loadAnalyticsData();
                break;
            case 'settings':
                this.loadSettingsData();
                break;
        }
    }

    loadAdminData() {
        // Load admin statistics
        this.updateAdminStats();
        this.loadUsersData();
    }

    updateAdminStats() {
        // Simulate real-time stats updates
        const stats = {
            totalUsers: Math.floor(Math.random() * 1000) + 12000,
            totalRevenue: Math.floor(Math.random() * 100000) + 800000,
            totalProducts: Math.floor(Math.random() * 200) + 1200,
            totalOrders: Math.floor(Math.random() * 1000) + 8000
        };

        document.getElementById('total-users').textContent = stats.totalUsers.toLocaleString();
        document.getElementById('total-revenue').textContent = '$' + stats.totalRevenue.toLocaleString();
        document.getElementById('total-products').textContent = stats.totalProducts.toLocaleString();
        document.getElementById('total-orders').textContent = stats.totalOrders.toLocaleString();
    }

    loadUsersData() {
        const usersTableBody = document.getElementById('users-table-body');
        if (!usersTableBody) return;

        // Sample users data
        const users = [
            {
                id: 1,
                name: 'أحمد محمد',
                email: 'ahmed@example.com',
                joinDate: '2024-01-15',
                status: 'active',
                commissions: 2450,
                avatar: 'https://via.placeholder.com/40'
            },
            {
                id: 2,
                name: 'فاطمة علي',
                email: 'fatima@example.com',
                joinDate: '2024-02-20',
                status: 'active',
                commissions: 1890,
                avatar: 'https://via.placeholder.com/40'
            },
            {
                id: 3,
                name: 'محمد حسن',
                email: 'mohamed@example.com',
                joinDate: '2024-03-10',
                status: 'inactive',
                commissions: 750,
                avatar: 'https://via.placeholder.com/40'
            },
            {
                id: 4,
                name: 'سارة أحمد',
                email: 'sara@example.com',
                joinDate: '2024-01-05',
                status: 'active',
                commissions: 3200,
                avatar: 'https://via.placeholder.com/40'
            },
            {
                id: 5,
                name: 'عمر خالد',
                email: 'omar@example.com',
                joinDate: '2024-02-28',
                status: 'banned',
                commissions: 0,
                avatar: 'https://via.placeholder.com/40'
            }
        ];

        usersTableBody.innerHTML = users.map(user => `
            <tr>
                <td>
                    <div class="user-info">
                        <img src="${user.avatar}" alt="${user.name}" class="user-avatar-small">
                        <span>${user.name}</span>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${user.joinDate}</td>
                <td>
                    <span class="status-badge ${user.status}">
                        ${this.getStatusText(user.status)}
                    </span>
                </td>
                <td>$${user.commissions.toLocaleString()}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="adminPanel.editUser(${user.id})" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="adminPanel.viewUser(${user.id})" title="عرض">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon danger" onclick="adminPanel.deleteUser(${user.id})" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    getStatusText(status) {
        const statusTexts = {
            active: this.currentLanguage === 'ar' ? 'نشط' : 'Active',
            inactive: this.currentLanguage === 'ar' ? 'غير نشط' : 'Inactive',
            banned: this.currentLanguage === 'ar' ? 'محظور' : 'Banned'
        };
        return statusTexts[status] || status;
    }

    loadContentData() {
        // Content management data loading
        console.log('Loading content data...');
    }

    loadProductsData() {
        // Products management data loading
        console.log('Loading products data...');
    }

    loadAnalyticsData() {
        // Analytics data loading
        this.updateAnalyticsCharts();
    }

    loadSettingsData() {
        // Settings data loading
        console.log('Loading settings data...');
    }

    initCharts() {
        // Initialize charts when the analytics tab is loaded
        setTimeout(() => {
            this.initUserGrowthChart();
            this.initRevenueChart();
            this.initConversionChart();
            this.initProductsPerformanceChart();
        }, 1000);
    }

    initUserGrowthChart() {
        const ctx = document.getElementById('user-growth-chart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: 'المستخدمون الجدد',
                    data: [120, 190, 300, 500, 200, 300],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initRevenueChart() {
        const ctx = document.getElementById('revenue-chart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: 'الإيرادات',
                    data: [65000, 59000, 80000, 81000, 56000, 85000],
                    backgroundColor: '#10b981',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
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
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    initConversionChart() {
        const ctx = document.getElementById('conversion-chart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['تحويلات ناجحة', 'تحويلات فاشلة', 'معلقة'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    initProductsPerformanceChart() {
        const ctx = document.getElementById('products-performance-chart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['التكنولوجيا', 'الصحة', 'الموضة', 'المنزل', 'الرياضة'],
                datasets: [{
                    label: 'المبيعات',
                    data: [85, 70, 90, 60, 75],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.2)',
                    pointBackgroundColor: '#8b5cf6'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    updateAnalyticsCharts() {
        // Update charts with new data based on selected period
        console.log('Updating analytics charts...');
    }

    // User Management Functions
    addNewUser() {
        alert(this.currentLanguage === 'ar' ? 'فتح نموذج إضافة مستخدم جديد' : 'Opening add new user form');
    }

    editUser(userId) {
        alert(this.currentLanguage === 'ar' ? `تعديل المستخدم رقم ${userId}` : `Editing user ${userId}`);
    }

    viewUser(userId) {
        alert(this.currentLanguage === 'ar' ? `عرض تفاصيل المستخدم رقم ${userId}` : `Viewing user ${userId} details`);
    }

    deleteUser(userId) {
        if (confirm(this.currentLanguage === 'ar' ? 'هل أنت متأكد من حذف هذا المستخدم؟' : 'Are you sure you want to delete this user?')) {
            alert(this.currentLanguage === 'ar' ? `تم حذف المستخدم رقم ${userId}` : `User ${userId} deleted`);
            this.loadUsersData();
        }
    }

    exportUsers() {
        alert(this.currentLanguage === 'ar' ? 'جاري تصدير بيانات المستخدمين...' : 'Exporting users data...');
    }

    filterUsers() {
        const filter = document.getElementById('user-status-filter').value;
        console.log('Filtering users by:', filter);
        // Implement filtering logic
    }

    searchUsers() {
        const searchTerm = document.getElementById('user-search').value;
        console.log('Searching users:', searchTerm);
        // Implement search logic
    }

    // Content Management Functions
    addNewContent() {
        alert(this.currentLanguage === 'ar' ? 'فتح نموذج إضافة محتوى جديد' : 'Opening add new content form');
    }

    manageArticles() {
        alert(this.currentLanguage === 'ar' ? 'فتح إدارة المقالات' : 'Opening articles management');
    }

    manageVideos() {
        alert(this.currentLanguage === 'ar' ? 'فتح إدارة الفيديوهات' : 'Opening videos management');
    }

    manageOffers() {
        alert(this.currentLanguage === 'ar' ? 'فتح إدارة العروض' : 'Opening offers management');
    }

    manageMedia() {
        alert(this.currentLanguage === 'ar' ? 'فتح إدارة الوسائط' : 'Opening media management');
    }

    // Product Management Functions
    addNewProduct() {
        alert(this.currentLanguage === 'ar' ? 'فتح نموذج إضافة منتج جديد' : 'Opening add new product form');
    }

    importProducts() {
        alert(this.currentLanguage === 'ar' ? 'فتح نموذج استيراد المنتجات' : 'Opening import products form');
    }

    // Settings Functions
    saveSettings() {
        alert(this.currentLanguage === 'ar' ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
    }

    resetSettings() {
        if (confirm(this.currentLanguage === 'ar' ? 'هل أنت متأكد من إعادة تعيين الإعدادات؟' : 'Are you sure you want to reset settings?')) {
            alert(this.currentLanguage === 'ar' ? 'تم إعادة تعيين الإعدادات' : 'Settings reset');
        }
    }

    clearCache() {
        if (confirm(this.currentLanguage === 'ar' ? 'هل أنت متأكد من مسح التخزين المؤقت؟' : 'Are you sure you want to clear cache?')) {
            alert(this.currentLanguage === 'ar' ? 'تم مسح التخزين المؤقت' : 'Cache cleared');
        }
    }

    updateAnalytics() {
        const period = document.getElementById('analytics-period').value;
        console.log('Updating analytics for period:', period);
        this.updateAnalyticsCharts();
    }

    updateTranslations() {
        // Update all translatable elements
        const elements = document.querySelectorAll('[data-ar][data-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLanguage}`);
            if (text) {
                element.textContent = text;
            }
        });

        // Reload data with new language
        this.loadUsersData();
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});

// Global functions for onclick handlers
function addNewUser() {
    window.adminPanel.addNewUser();
}

function exportUsers() {
    window.adminPanel.exportUsers();
}

function addNewContent() {
    window.adminPanel.addNewContent();
}

function manageArticles() {
    window.adminPanel.manageArticles();
}

function manageVideos() {
    window.adminPanel.manageVideos();
}

function manageOffers() {
    window.adminPanel.manageOffers();
}

function manageMedia() {
    window.adminPanel.manageMedia();
}

function addNewProduct() {
    window.adminPanel.addNewProduct();
}

function importProducts() {
    window.adminPanel.importProducts();
}

function saveSettings() {
    window.adminPanel.saveSettings();
}

function resetSettings() {
    window.adminPanel.resetSettings();
}

function clearCache() {
    window.adminPanel.clearCache();
}