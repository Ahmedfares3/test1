// Tutorial Video System for AffiliateHub

class TutorialSystem {
    constructor() {
        this.videos = [];
        this.currentVideo = null;
        this.currentLanguage = 'ar';
        this.player = null;
        
        this.init();
    }
    
    init() {
        this.setupLanguageObserver();
        this.generateVideoData();
        this.renderVideoPlaylist();
        this.setupEventListeners();
        this.loadFirstVideo();
    }
    
    setupLanguageObserver() {
        if (window.LanguageManager) {
            window.LanguageManager.addObserver((language) => {
                this.currentLanguage = language;
                this.updateVideoLanguage();
            });
            this.currentLanguage = window.LanguageManager.getCurrentLanguage();
        }
    }
    
    generateVideoData() {
        this.videos = [
            {
                id: 1,
                title: {
                    ar: 'مقدمة في التسويق بالعمولة',
                    en: 'Introduction to Affiliate Marketing'
                },
                description: {
                    ar: 'تعرف على أساسيات التسويق بالعمولة وكيفية البدء في هذا المجال المربح',
                    en: 'Learn the basics of affiliate marketing and how to start in this profitable field'
                },
                duration: '12:45',
                videoId: 'dQw4w9WgXcQ', // YouTube video ID
                thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                category: {
                    ar: 'أساسيات',
                    en: 'Basics'
                },
                level: {
                    ar: 'مبتدئ',
                    en: 'Beginner'
                },
                views: 15420,
                likes: 1240
            },
            {
                id: 2,
                title: {
                    ar: 'اختيار المنتجات المناسبة',
                    en: 'Choosing the Right Products'
                },
                description: {
                    ar: 'كيفية اختيار المنتجات التي تحقق أعلى معدلات التحويل والعمولات',
                    en: 'How to choose products that achieve the highest conversion rates and commissions'
                },
                duration: '18:32',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                category: {
                    ar: 'استراتيجيات',
                    en: 'Strategies'
                },
                level: {
                    ar: 'متوسط',
                    en: 'Intermediate'
                },
                views: 12350,
                likes: 980
            },
            {
                id: 3,
                title: {
                    ar: 'إنشاء المحتوى التسويقي',
                    en: 'Creating Marketing Content'
                },
                description: {
                    ar: 'تعلم كيفية إنشاء محتوى جذاب وفعال لتسويق المنتجات بالعمولة',
                    en: 'Learn how to create engaging and effective content for affiliate product marketing'
                },
                duration: '25:18',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                category: {
                    ar: 'المحتوى',
                    en: 'Content'
                },
                level: {
                    ar: 'متوسط',
                    en: 'Intermediate'
                },
                views: 9870,
                likes: 756
            },
            {
                id: 4,
                title: {
                    ar: 'استخدام وسائل التواصل الاجتماعي',
                    en: 'Using Social Media Platforms'
                },
                description: {
                    ar: 'استراتيجيات فعالة لاستخدام فيسبوك وإنستغرام وتويتر في التسويق بالعمولة',
                    en: 'Effective strategies for using Facebook, Instagram, and Twitter in affiliate marketing'
                },
                duration: '22:07',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                category: {
                    ar: 'وسائل التواصل',
                    en: 'Social Media'
                },
                level: {
                    ar: 'متقدم',
                    en: 'Advanced'
                },
                views: 11200,
                likes: 890
            },
            {
                id: 5,
                title: {
                    ar: 'تحليل الأداء والإحصائيات',
                    en: 'Performance Analysis and Statistics'
                },
                description: {
                    ar: 'كيفية قراءة وتحليل إحصائيات حملاتك التسويقية لتحسين الأداء',
                    en: 'How to read and analyze your marketing campaign statistics to improve performance'
                },
                duration: '16:43',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                category: {
                    ar: 'تحليلات',
                    en: 'Analytics'
                },
                level: {
                    ar: 'متقدم',
                    en: 'Advanced'
                },
                views: 8650,
                likes: 672
            },
            {
                id: 6,
                title: {
                    ar: 'بناء قائمة بريدية فعالة',
                    en: 'Building an Effective Email List'
                },
                description: {
                    ar: 'استراتيجيات بناء قائمة بريدية قوية واستخدامها في التسويق بالعمولة',
                    en: 'Strategies for building a strong email list and using it in affiliate marketing'
                },
                duration: '19:55',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                category: {
                    ar: 'التسويق الإلكتروني',
                    en: 'Email Marketing'
                },
                level: {
                    ar: 'متوسط',
                    en: 'Intermediate'
                },
                views: 7890,
                likes: 623
            },
            {
                id: 7,
                title: {
                    ar: 'تحسين معدلات التحويل',
                    en: 'Optimizing Conversion Rates'
                },
                description: {
                    ar: 'تقنيات متقدمة لزيادة معدلات التحويل وتحسين أرباحك من العمولات',
                    en: 'Advanced techniques to increase conversion rates and improve your commission profits'
                },
                duration: '21:12',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                category: {
                    ar: 'تحسين',
                    en: 'Optimization'
                },
                level: {
                    ar: 'متقدم',
                    en: 'Advanced'
                },
                views: 10340,
                likes: 834
            },
            {
                id: 8,
                title: {
                    ar: 'أدوات التسويق المجانية',
                    en: 'Free Marketing Tools'
                },
                description: {
                    ar: 'مجموعة من الأدوات المجانية التي ستساعدك في تطوير حملاتك التسويقية',
                    en: 'A collection of free tools that will help you develop your marketing campaigns'
                },
                duration: '14:28',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                category: {
                    ar: 'أدوات',
                    en: 'Tools'
                },
                level: {
                    ar: 'مبتدئ',
                    en: 'Beginner'
                },
                views: 13560,
                likes: 1120
            }
        ];
    }
    
    renderVideoPlaylist() {
        const playlist = document.getElementById('video-playlist');
        if (!playlist) return;
        
        playlist.innerHTML = '';
        
        this.videos.forEach((video, index) => {
            const videoItem = this.createVideoItem(video, index);
            playlist.appendChild(videoItem);
        });
    }
    
    createVideoItem(video, index) {
        const item = document.createElement('div');
        item.className = 'video-item';
        item.setAttribute('data-video-id', video.id);
        
        const isActive = this.currentVideo && this.currentVideo.id === video.id;
        if (isActive) {
            item.classList.add('active');
        }
        
        item.innerHTML = `
            <div class="video-thumbnail">
                <i class="fas fa-play"></i>
                <div class="video-duration">${video.duration}</div>
                <div class="video-level ${this.getLevelClass(video.level.en)}">${video.level[this.currentLanguage]}</div>
            </div>
            <div class="video-info">
                <h4 class="video-title">${video.title[this.currentLanguage]}</h4>
                <p class="video-description">${video.description[this.currentLanguage]}</p>
                <div class="video-meta">
                    <span class="video-category">${video.category[this.currentLanguage]}</span>
                    <span class="video-stats">
                        <i class="fas fa-eye"></i> ${this.formatNumber(video.views)}
                        <i class="fas fa-thumbs-up"></i> ${this.formatNumber(video.likes)}
                    </span>
                </div>
            </div>
        `;
        
        // Add click handler
        item.addEventListener('click', () => {
            this.playVideo(video);
        });
        
        // Add animation delay
        item.style.animationDelay = `${index * 0.1}s`;
        
        return item;
    }
    
    getLevelClass(level) {
        const classes = {
            'Beginner': 'beginner',
            'Intermediate': 'intermediate',
            'Advanced': 'advanced'
        };
        return classes[level] || 'beginner';
    }
    
    playVideo(video) {
        this.currentVideo = video;
        
        // Update player
        this.updateVideoPlayer(video);
        
        // Update video info
        this.updateVideoInfo(video);
        
        // Update playlist active state
        this.updatePlaylistActiveState(video.id);
        
        // Scroll to player
        this.scrollToPlayer();
    }
    
    updateVideoPlayer(video) {
        const player = document.getElementById('youtube-player');
        if (player) {
            const embedUrl = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`;
            player.src = embedUrl;
        }
    }
    
    updateVideoInfo(video) {
        const titleElement = document.getElementById('current-video-title');
        const descriptionElement = document.getElementById('current-video-description');
        
        if (titleElement) {
            titleElement.textContent = video.title[this.currentLanguage];
        }
        
        if (descriptionElement) {
            descriptionElement.innerHTML = `
                <p>${video.description[this.currentLanguage]}</p>
                <div class="video-details">
                    <span class="video-category-badge ${this.getLevelClass(video.level.en)}">
                        ${video.category[this.currentLanguage]} - ${video.level[this.currentLanguage]}
                    </span>
                    <div class="video-engagement">
                        <span><i class="fas fa-eye"></i> ${this.formatNumber(video.views)} ${this.currentLanguage === 'ar' ? 'مشاهدة' : 'views'}</span>
                        <span><i class="fas fa-thumbs-up"></i> ${this.formatNumber(video.likes)} ${this.currentLanguage === 'ar' ? 'إعجاب' : 'likes'}</span>
                        <span><i class="fas fa-clock"></i> ${video.duration}</span>
                    </div>
                </div>
            `;
        }
    }
    
    updatePlaylistActiveState(videoId) {
        // Remove active class from all items
        const allItems = document.querySelectorAll('.video-item');
        allItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to current item
        const currentItem = document.querySelector(`[data-video-id="${videoId}"]`);
        if (currentItem) {
            currentItem.classList.add('active');
        }
    }
    
    scrollToPlayer() {
        const player = document.getElementById('main-video-player');
        if (player) {
            player.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }
    
    loadFirstVideo() {
        if (this.videos.length > 0) {
            this.playVideo(this.videos[0]);
        }
    }
    
    setupEventListeners() {
        // Next/Previous video buttons (if added)
        this.setupNavigationButtons();
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Video completion tracking (would need YouTube API)
        this.setupVideoTracking();
    }
    
    setupNavigationButtons() {
        // Add navigation buttons to player
        const playerContainer = document.querySelector('.video-player-container');
        if (playerContainer && !playerContainer.querySelector('.video-navigation')) {
            const navigation = document.createElement('div');
            navigation.className = 'video-navigation';
            navigation.innerHTML = `
                <button class="nav-btn prev-btn" onclick="tutorialSystem.playPreviousVideo()">
                    <i class="fas fa-chevron-left"></i>
                    <span data-ar="السابق" data-en="Previous">${this.currentLanguage === 'ar' ? 'السابق' : 'Previous'}</span>
                </button>
                <button class="nav-btn next-btn" onclick="tutorialSystem.playNextVideo()">
                    <span data-ar="التالي" data-en="Next">${this.currentLanguage === 'ar' ? 'التالي' : 'Next'}</span>
                    <i class="fas fa-chevron-right"></i>
                </button>
            `;
            
            playerContainer.appendChild(navigation);
            
            // Add navigation styles
            this.addNavigationStyles();
        }
    }
    
    addNavigationStyles() {
        if (!document.querySelector('#video-navigation-styles')) {
            const styles = document.createElement('style');
            styles.id = 'video-navigation-styles';
            styles.textContent = `
                .video-navigation {
                    display: flex;
                    justify-content: space-between;
                    padding: var(--spacing-lg);
                    border-top: 1px solid var(--gray-200);
                }
                
                .nav-btn {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    padding: var(--spacing-md) var(--spacing-lg);
                    background: var(--gradient-primary);
                    color: var(--white);
                    border: none;
                    border-radius: var(--radius-lg);
                    cursor: pointer;
                    transition: var(--transition-fast);
                    font-weight: 500;
                }
                
                .nav-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-lg);
                }
                
                .nav-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none;
                }
                
                .video-category-badge {
                    display: inline-block;
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                    color: var(--white);
                    margin-bottom: var(--spacing-md);
                }
                
                .video-category-badge.beginner { background: var(--success-color); }
                .video-category-badge.intermediate { background: var(--warning-color); }
                .video-category-badge.advanced { background: var(--error-color); }
                
                .video-engagement {
                    display: flex;
                    gap: var(--spacing-lg);
                    margin-top: var(--spacing-md);
                    color: var(--gray-600);
                    font-size: var(--font-size-sm);
                }
                
                .video-engagement span {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                }
                
                .video-item.active {
                    border: 2px solid var(--primary-color);
                    box-shadow: var(--shadow-lg);
                }
                
                .video-level {
                    position: absolute;
                    top: var(--spacing-sm);
                    left: var(--spacing-sm);
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-sm);
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                    color: var(--white);
                }
                
                [dir="rtl"] .video-level {
                    left: auto;
                    right: var(--spacing-sm);
                }
                
                .video-level.beginner { background: var(--success-color); }
                .video-level.intermediate { background: var(--warning-color); }
                .video-level.advanced { background: var(--error-color); }
                
                .video-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: var(--spacing-sm);
                    font-size: var(--font-size-xs);
                    color: var(--gray-500);
                }
                
                .video-stats {
                    display: flex;
                    gap: var(--spacing-md);
                }
                
                .video-stats i {
                    margin-right: var(--spacing-xs);
                }
                
                [dir="rtl"] .video-stats i {
                    margin-right: 0;
                    margin-left: var(--spacing-xs);
                }
            `;
            document.head.appendChild(styles);
        }
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when not typing in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.playPreviousVideo();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.playNextVideo();
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleVideoPlayback();
                    break;
            }
        });
    }
    
    setupVideoTracking() {
        // This would integrate with YouTube API to track video completion
        // For now, we'll simulate progress tracking
        this.trackVideoProgress();
    }
    
    trackVideoProgress() {
        // Simulate video progress tracking
        if (this.currentVideo) {
            const videoId = this.currentVideo.id;
            const progress = this.getVideoProgress(videoId);
            
            // Update progress in localStorage
            this.saveVideoProgress(videoId, progress);
        }
    }
    
    getVideoProgress(videoId) {
        const saved = localStorage.getItem('videoProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            return progress[videoId] || 0;
        }
        return 0;
    }
    
    saveVideoProgress(videoId, progress) {
        const saved = localStorage.getItem('videoProgress') || '{}';
        const progressData = JSON.parse(saved);
        progressData[videoId] = progress;
        localStorage.setItem('videoProgress', JSON.stringify(progressData));
    }
    
    playNextVideo() {
        if (!this.currentVideo) return;
        
        const currentIndex = this.videos.findIndex(v => v.id === this.currentVideo.id);
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < this.videos.length) {
            this.playVideo(this.videos[nextIndex]);
        }
        
        this.updateNavigationButtons();
    }
    
    playPreviousVideo() {
        if (!this.currentVideo) return;
        
        const currentIndex = this.videos.findIndex(v => v.id === this.currentVideo.id);
        const prevIndex = currentIndex - 1;
        
        if (prevIndex >= 0) {
            this.playVideo(this.videos[prevIndex]);
        }
        
        this.updateNavigationButtons();
    }
    
    updateNavigationButtons() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn && nextBtn && this.currentVideo) {
            const currentIndex = this.videos.findIndex(v => v.id === this.currentVideo.id);
            
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === this.videos.length - 1;
        }
    }
    
    toggleVideoPlayback() {
        // This would require YouTube API integration
        // For now, just a placeholder
        console.log('Toggle video playback');
    }
    
    updateVideoLanguage() {
        // Update all video titles and descriptions
        this.renderVideoPlaylist();
        
        if (this.currentVideo) {
            this.updateVideoInfo(this.currentVideo);
        }
        
        // Update navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn span');
        navButtons.forEach(span => {
            const arText = span.getAttribute('data-ar');
            const enText = span.getAttribute('data-en');
            if (arText && enText) {
                span.textContent = this.currentLanguage === 'ar' ? arText : enText;
            }
        });
    }
    
    formatNumber(number) {
        if (window.LanguageManager) {
            return window.LanguageManager.formatNumber(number);
        }
        
        return new Intl.NumberFormat(
            this.currentLanguage === 'ar' ? 'ar-SA' : 'en-US'
        ).format(number);
    }
    
    // Search functionality
    searchVideos(query) {
        const lowerQuery = query.toLowerCase();
        return this.videos.filter(video => 
            video.title.ar.toLowerCase().includes(lowerQuery) ||
            video.title.en.toLowerCase().includes(lowerQuery) ||
            video.description.ar.toLowerCase().includes(lowerQuery) ||
            video.description.en.toLowerCase().includes(lowerQuery) ||
            video.category.ar.toLowerCase().includes(lowerQuery) ||
            video.category.en.toLowerCase().includes(lowerQuery)
        );
    }
    
    // Filter by category
    filterByCategory(category) {
        return this.videos.filter(video => 
            video.category.ar === category || video.category.en === category
        );
    }
    
    // Filter by level
    filterByLevel(level) {
        return this.videos.filter(video => 
            video.level.ar === level || video.level.en === level
        );
    }
    
    // Get video statistics
    getVideoStats() {
        return {
            totalVideos: this.videos.length,
            totalViews: this.videos.reduce((sum, video) => sum + video.views, 0),
            totalLikes: this.videos.reduce((sum, video) => sum + video.likes, 0),
            categories: [...new Set(this.videos.map(v => v.category.en))],
            levels: [...new Set(this.videos.map(v => v.level.en))]
        };
    }
    
    // Public API methods
    getCurrentVideo() {
        return this.currentVideo;
    }
    
    getAllVideos() {
        return this.videos;
    }
    
    getVideoById(id) {
        return this.videos.find(v => v.id === id);
    }
}

// Initialize tutorial system when DOM is loaded
function loadTutorialVideos() {
    if (!window.tutorialSystem) {
        window.tutorialSystem = new TutorialSystem();
    }
}

// Export for global access
window.TutorialSystem = TutorialSystem;

console.log('Tutorial system loaded successfully');