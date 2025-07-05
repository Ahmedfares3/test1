// Live Chat System for AffiliateHub

class LiveChat {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.unreadCount = 0;
        this.isTyping = false;
        this.botResponses = this.getBotResponses();
        this.currentLanguage = 'ar';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadChatHistory();
        this.setupLanguageObserver();
        this.startWelcomeSequence();
    }
    
    setupEventListeners() {
        // Chat toggle button
        const chatToggle = document.querySelector('.chat-toggle');
        if (chatToggle) {
            chatToggle.addEventListener('click', () => this.toggleChat());
        }
        
        // Chat close button
        const chatClose = document.querySelector('.chat-close');
        if (chatClose) {
            chatClose.addEventListener('click', () => this.toggleChat());
        }
        
        // Send message button
        const sendButton = document.querySelector('.chat-input button');
        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
        }
        
        // Enter key to send message
        const chatInput = document.getElementById('chat-input-field');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
            
            // Typing indicator
            chatInput.addEventListener('input', () => {
                this.handleTyping();
            });
        }
        
        // Click outside to close
        document.addEventListener('click', (e) => {
            const chatWidget = document.getElementById('chat-widget');
            if (chatWidget && !chatWidget.contains(e.target) && this.isOpen) {
                // Don't close if clicking on chat toggle
                if (!e.target.closest('.chat-toggle')) {
                    this.closeChat();
                }
            }
        });
    }
    
    setupLanguageObserver() {
        // Listen for language changes
        if (window.LanguageManager) {
            window.LanguageManager.addObserver((language) => {
                this.currentLanguage = language;
                this.updateChatLanguage();
            });
            this.currentLanguage = window.LanguageManager.getCurrentLanguage();
        }
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        const chatWindow = document.getElementById('chat-window');
        const chatNotification = document.getElementById('chat-notification');
        
        if (chatWindow) {
            chatWindow.classList.add('active');
            this.isOpen = true;
            
            // Clear notification
            this.unreadCount = 0;
            if (chatNotification) {
                chatNotification.style.display = 'none';
            }
            
            // Focus on input
            const chatInput = document.getElementById('chat-input-field');
            if (chatInput) {
                setTimeout(() => chatInput.focus(), 100);
            }
            
            // Mark messages as read
            this.markMessagesAsRead();
        }
    }
    
    closeChat() {
        const chatWindow = document.getElementById('chat-window');
        
        if (chatWindow) {
            chatWindow.classList.remove('active');
            this.isOpen = false;
        }
    }
    
    sendMessage() {
        const chatInput = document.getElementById('chat-input-field');
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateBotResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }
    
    addMessage(content, sender, timestamp = null) {
        const message = {
            id: Date.now() + Math.random(),
            content: content,
            sender: sender,
            timestamp: timestamp || new Date(),
            read: this.isOpen
        };
        
        this.messages.push(message);
        this.renderMessage(message);
        this.saveChatHistory();
        
        // Update notification if chat is closed
        if (!this.isOpen && sender === 'bot') {
            this.updateNotification();
        }
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    renderMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}-message`;
        messageElement.setAttribute('data-message-id', message.id);
        
        const timeString = this.formatMessageTime(message.timestamp);
        
        messageElement.innerHTML = `
            <div class="message-content">${this.escapeHtml(message.content)}</div>
            <div class="message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(messageElement);
        
        // Add animation
        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 10);
    }
    
    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const typingElement = document.createElement('div');
        typingElement.className = 'message bot-message typing-indicator';
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingElement);
        this.scrollToBottom();
        
        // Add typing animation styles if not already added
        if (!document.querySelector('#typing-styles')) {
            const styles = document.createElement('style');
            styles.id = 'typing-styles';
            styles.textContent = `
                .typing-indicator .message-content {
                    padding: 15px 20px;
                }
                
                .typing-dots {
                    display: flex;
                    gap: 4px;
                    align-items: center;
                }
                
                .typing-dots span {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--gray-400);
                    animation: typingDot 1.4s infinite ease-in-out;
                }
                
                .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
                .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
                
                @keyframes typingDot {
                    0%, 80%, 100% {
                        transform: scale(0.8);
                        opacity: 0.5;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        const responses = this.botResponses[this.currentLanguage];
        
        // Check for specific keywords
        for (const [keywords, responseArray] of Object.entries(responses)) {
            if (keywords.split('|').some(keyword => message.includes(keyword))) {
                return responseArray[Math.floor(Math.random() * responseArray.length)];
            }
        }
        
        // Default response
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
    
    getBotResponses() {
        return {
            ar: {
                'مرحبا|أهلا|السلام|هاي': [
                    'أهلاً وسهلاً بك! كيف يمكنني مساعدتك اليوم؟',
                    'مرحباً! أنا هنا لمساعدتك في أي استفسار حول منصة التسويق بالعمولة.',
                    'أهلاً بك! هل تحتاج مساعدة في البدء بالتسويق بالعمولة؟'
                ],
                'كيف|طريقة|بداية|ابدأ': [
                    'للبدء في التسويق بالعمولة، يمكنك إنشاء حساب مجاني والاطلاع على الشروحات التعليمية.',
                    'أولاً، سجل حساباً جديداً، ثم اختر المنتجات التي تريد تسويقها واحصل على روابط العمولة الخاصة بك.',
                    'البداية سهلة! شاهد الفيديوهات التعليمية أولاً لفهم الأساسيات.'
                ],
                'عمولة|ربح|مال|دفع': [
                    'نوفر عمولات تنافسية تصل إلى 50% من قيمة المبيعات.',
                    'يتم دفع العمولات شهرياً عبر عدة طرق دفع مختلفة.',
                    'العمولات تختلف حسب نوع المنتج، ويمكنك مراجعة التفاصيل في لوحة التحكم.'
                ],
                'دعم|مساعدة|مشكلة': [
                    'فريق الدعم متاح 24/7 لمساعدتك في أي مشكلة تواجهها.',
                    'يمكنك التواصل معنا عبر البريد الإلكتروني أو الدردشة المباشرة.',
                    'نحن هنا لمساعدتك! ما هي المشكلة التي تواجهها؟'
                ],
                'تسجيل|حساب|اشتراك': [
                    'يمكنك إنشاء حساب مجاني بالنقر على زر "إنشاء حساب" في أعلى الصفحة.',
                    'التسجيل مجاني وسهل، تحتاج فقط إلى بريد إلكتروني وكلمة مرور.',
                    'بعد التسجيل ستحصل على لوحة تحكم شخصية لإدارة حملاتك التسويقية.'
                ],
                'منتجات|سلع|خدمات': [
                    'لدينا أكثر من 500 منتج وخدمة متنوعة يمكنك تسويقها.',
                    'المنتجات تشمل التكنولوجيا، الصحة، التعليم، والكثير من الفئات الأخرى.',
                    'يمكنك تصفح جميع المنتجات المتاحة في لوحة التحكم بعد التسجيل.'
                ],
                'شكرا|شكراً|ممتاز': [
                    'العفو! أتمنى أن أكون قد ساعدتك.',
                    'لا شكر على واجب! هل تحتاج مساعدة في شيء آخر؟',
                    'سعيد لمساعدتك! لا تتردد في السؤال عن أي شيء آخر.'
                ],
                'default': [
                    'شكراً لتواصلك معنا! هل يمكنك توضيح استفسارك أكثر؟',
                    'أعتذر، لم أفهم سؤالك بوضوح. هل يمكنك إعادة صياغته؟',
                    'يمكنني مساعدتك في أي استفسار حول منصة التسويق بالعمولة. ما هو سؤالك؟',
                    'للحصول على مساعدة مفصلة، يمكنك التواصل مع فريق الدعم المتخصص.'
                ]
            },
            en: {
                'hello|hi|hey|greetings': [
                    'Hello! How can I help you today?',
                    'Hi there! I\'m here to assist you with any questions about affiliate marketing.',
                    'Welcome! Do you need help getting started with affiliate marketing?'
                ],
                'how|start|begin|getting started': [
                    'To start affiliate marketing, you can create a free account and check out our educational tutorials.',
                    'First, register for a new account, then choose products you want to promote and get your affiliate links.',
                    'Getting started is easy! Watch our tutorial videos first to understand the basics.'
                ],
                'commission|earn|money|payment': [
                    'We offer competitive commissions up to 50% of sales value.',
                    'Commissions are paid monthly through various payment methods.',
                    'Commission rates vary by product type, you can check details in your dashboard.'
                ],
                'support|help|problem|issue': [
                    'Our support team is available 24/7 to help you with any issues.',
                    'You can contact us via email or live chat.',
                    'We\'re here to help! What problem are you facing?'
                ],
                'register|account|signup|sign up': [
                    'You can create a free account by clicking the "Register" button at the top of the page.',
                    'Registration is free and easy, you just need an email and password.',
                    'After registration, you\'ll get a personal dashboard to manage your marketing campaigns.'
                ],
                'products|services|items': [
                    'We have over 500 diverse products and services you can promote.',
                    'Products include technology, health, education, and many other categories.',
                    'You can browse all available products in your dashboard after registration.'
                ],
                'thank|thanks|great|awesome': [
                    'You\'re welcome! I hope I was able to help you.',
                    'No problem! Do you need help with anything else?',
                    'Happy to help! Feel free to ask about anything else.'
                ],
                'default': [
                    'Thanks for contacting us! Could you clarify your question?',
                    'I\'m sorry, I didn\'t understand your question clearly. Could you rephrase it?',
                    'I can help you with any questions about our affiliate marketing platform. What\'s your question?',
                    'For detailed assistance, you can contact our specialized support team.'
                ]
            }
        };
    }
    
    updateNotification() {
        const chatNotification = document.getElementById('chat-notification');
        if (chatNotification) {
            this.unreadCount++;
            chatNotification.textContent = this.unreadCount;
            chatNotification.style.display = 'flex';
        }
    }
    
    markMessagesAsRead() {
        this.messages.forEach(message => {
            message.read = true;
        });
        this.saveChatHistory();
    }
    
    scrollToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    }
    
    formatMessageTime(timestamp) {
        if (window.LanguageManager) {
            return window.LanguageManager.getRelativeTime(timestamp);
        }
        
        const now = new Date();
        const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
        
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
    
    updateChatLanguage() {
        // Update chat header
        const chatTitle = document.querySelector('.chat-header h4');
        if (chatTitle) {
            chatTitle.textContent = this.currentLanguage === 'ar' ? 'الدعم المباشر' : 'Live Support';
        }
        
        // Update input placeholder
        const chatInput = document.getElementById('chat-input-field');
        if (chatInput) {
            chatInput.placeholder = this.currentLanguage === 'ar' ? 
                'اكتب رسالتك هنا...' : 
                'Type your message here...';
        }
        
        // Update welcome bubble
        this.updateWelcomeBubble();
        
        // Update existing message times
        this.updateMessageTimes();
    }
    
    updateMessageTimes() {
        const messageElements = document.querySelectorAll('.message');
        messageElements.forEach(element => {
            const messageId = element.getAttribute('data-message-id');
            const message = this.messages.find(m => m.id == messageId);
            if (message) {
                const timeElement = element.querySelector('.message-time');
                if (timeElement) {
                    timeElement.textContent = this.formatMessageTime(message.timestamp);
                }
            }
        });
    }
    
    handleTyping() {
        // Could implement typing indicators for user
        // For now, just a placeholder for future enhancement
    }
    
    saveChatHistory() {
        try {
            localStorage.setItem('chatHistory', JSON.stringify(this.messages));
        } catch (error) {
            console.warn('Could not save chat history:', error);
        }
    }
    
    loadChatHistory() {
        try {
            const savedHistory = localStorage.getItem('chatHistory');
            if (savedHistory) {
                this.messages = JSON.parse(savedHistory).map(msg => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
                
                // Render saved messages
                this.messages.forEach(message => {
                    this.renderMessage(message);
                });
                
                // Update unread count
                this.unreadCount = this.messages.filter(msg => !msg.read && msg.sender === 'bot').length;
                if (this.unreadCount > 0) {
                    this.updateNotificationDisplay();
                }
            }
        } catch (error) {
            console.warn('Could not load chat history:', error);
            this.messages = [];
        }
    }
    
    updateNotificationDisplay() {
        const chatNotification = document.getElementById('chat-notification');
        if (chatNotification && this.unreadCount > 0) {
            chatNotification.textContent = this.unreadCount;
            chatNotification.style.display = 'flex';
        }
    }
    
    startWelcomeSequence() {
        // Add welcome messages if no chat history
        if (this.messages.length === 0) {
            const welcomeMessages = this.currentLanguage === 'ar' ? [
                'أهلاً وسهلاً بك في AffiliateHub! 👋',
                'أنا هنا لمساعدتك في رحلتك نحو النجاح في التسويق بالعمولة',
                'كيف يمكنني مساعدتك اليوم؟ 😊'
            ] : [
                'Welcome to AffiliateHub! 👋',
                'I\'m here to help you succeed in your affiliate marketing journey',
                'How can I help you today? 😊'
            ];
            
            welcomeMessages.forEach((message, index) => {
                setTimeout(() => {
                    this.addMessage(message, 'bot');
                }, (index + 1) * 1500);
            });
        }
        
        // Update welcome bubble text
        this.updateWelcomeBubble();
    }
    
    updateWelcomeBubble() {
        const welcomeBubble = document.getElementById('chat-welcome-bubble');
        if (welcomeBubble) {
            const welcomeText = welcomeBubble.querySelector('.chat-welcome-text');
            if (welcomeText) {
                welcomeText.textContent = this.currentLanguage === 'ar' ? 
                    'أهلاً بك! كيف يمكنني مساعدتك؟' : 
                    'Hello! How can I help you?';
            }
        }
    }
    
    clearChatHistory() {
        this.messages = [];
        this.unreadCount = 0;
        
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
        
        const chatNotification = document.getElementById('chat-notification');
        if (chatNotification) {
            chatNotification.style.display = 'none';
        }
        
        localStorage.removeItem('chatHistory');
        
        // Start welcome sequence again
        this.startWelcomeSequence();
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Public API methods
    sendBotMessage(message) {
        this.addMessage(message, 'bot');
    }
    
    isOpen() {
        return this.isOpen;
    }
    
    getMessageCount() {
        return this.messages.length;
    }
    
    getUnreadCount() {
        return this.unreadCount;
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.liveChat = new LiveChat();
});

// Export for global access
window.LiveChat = LiveChat;

console.log('Live chat system loaded successfully');