// Main application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('DUT Clinic Management System initialized');
    
    // Add click handlers for sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            // Add active class to clicked link
            this.parentElement.classList.add('active');
        });
    });
    
    // Initialize tooltips
    initializeTooltips();
    
    // Load initial data
    loadDashboardData();
}

function initializeTooltips() {
    // Simple tooltip implementation
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    elementsWithTooltip.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'var(--text-dark)';
    tooltip.style.color = 'var(--white)';
    tooltip.style.padding = '0.5rem';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '0.8rem';
    tooltip.style.zIndex = '1000';
    
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
    
    this.currentTooltip = tooltip;
}

function hideTooltip() {
    if (this.currentTooltip) {
        this.currentTooltip.remove();
        this.currentTooltip = null;
    }
}

function loadDashboardData() {
    // Simulate loading data from API
    console.log('Loading dashboard data...');
    
    // In a real application, you would fetch data from your backend
    // fetch('/api/dashboard')
    //     .then(response => response.json())
    //     .then(data => updateDashboard(data));
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        border-left: 4px solid var(--${type});
        animation: slideInRight 0.3s ease;
    `;
    
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
        success: 'check-circle',
        warning: 'exclamation-triangle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--dark-gray);
        padding: 0.25rem;
    }
    
    .notification-close:hover {
        color: var(--text-dark);
    }
`;
document.head.appendChild(notificationStyles);
// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type] || 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = `
            <style id="notification-styles">
                .custom-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--white);
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    z-index: 10000;
                    border-left: 4px solid var(--accent-blue);
                    animation: slideInRight 0.3s ease;
                    max-width: 400px;
                }
                
                .notification-success {
                    border-left-color: var(--success);
                }
                
                .notification-error {
                    border-left-color: var(--danger);
                }
                
                .notification-warning {
                    border-left-color: var(--warning);
                }
                
                .notification-info {
                    border-left-color: var(--info);
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex: 1;
                }
                
                .notification-content i {
                    font-size: 1.2rem;
                }
                
                .notification-success .notification-content i {
                    color: var(--success);
                }
                
                .notification-error .notification-content i {
                    color: var(--danger);
                }
                
                .notification-warning .notification-content i {
                    color: var(--warning);
                }
                
                .notification-info .notification-content i {
                    color: var(--info);
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--dark-gray);
                    padding: 0.25rem;
                    border-radius: 4px;
                    transition: background-color 0.3s ease;
                }
                
                .notification-close:hover {
                    background: var(--light-gray);
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Enhanced sidebar navigation
function initializeSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default for external links
            if (this.getAttribute('href').startsWith('http')) {
                return;
            }
            
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Show loading notification
            const pageName = this.textContent.trim();
            showNotification(`Loading ${pageName}...`, 'info');
            
            // Navigate to page
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 500);
        });
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DUT Clinic Management System Initialized');
    
    // Initialize sidebar navigation
    initializeSidebar();
    
    // Add loading states to buttons
    initializeButtonLoading();
    
    // Add keyboard shortcuts
    initializeKeyboardShortcuts();
});

function initializeButtonLoading() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn') || e.target.closest('.btn')) {
            const button = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
            
            // Add loading state
            button.classList.add('loading');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Remove loading state after operation (simulated)
            setTimeout(() => {
                button.classList.remove('loading');
                button.innerHTML = originalText;
            }, 1500);
        }
    });
}

function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + / to show shortcuts help
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            showKeyboardShortcuts();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function showKeyboardShortcuts() {
    const shortcutsHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>Keyboard Shortcuts</h3>
                    <button class="close-btn" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="shortcut-list">
                        <div class="shortcut-item">
                            <kbd>Ctrl</kbd> + <kbd>1</kbd>
                            <span>Doctor Dashboard</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl</kbd> + <kbd>2</kbd>
                            <span>Nurse Dashboard</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl</kbd> + <kbd>3</kbd>
                            <span>Patient Dashboard</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl</kbd> + <kbd>4</kbd>
                            <span>Pharmacist Dashboard</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl</kbd> + <kbd>5</kbd>
                            <span>Paramedic Dashboard</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl</kbd> + <kbd>6</kbd>
                            <span>Driver Dashboard</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl</kbd> + <kbd>/</kbd>
                            <span>Show this help</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Esc</kbd>
                            <span>Close modals</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', shortcutsHTML);
    
    // Add shortcut styles
    if (!document.querySelector('#shortcut-styles')) {
        const shortcutStyles = `
            <style id="shortcut-styles">
                .shortcut-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .shortcut-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem;
                    background: var(--light-gray);
                    border-radius: 8px;
                }
                
                .shortcut-item kbd {
                    background: var(--text-dark);
                    color: white;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-family: monospace;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', shortcutStyles);
    }
}