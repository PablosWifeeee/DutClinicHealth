function enterAsUser(userType) {
    // Show loading animation
    showLoadingAnimation(userType);
    
    // Redirect to respective dashboard after a brief delay
    setTimeout(() => {
        switch(userType) {
            case 'doctor':
                window.location.href = 'pages/doctor-dashboard.html';
                break;
            case 'nurse':
                window.location.href = 'pages/nurse-dashboard.html';
                break;
            case 'patient':
                window.location.href = 'pages/patient-dashboard.html';
                break;
            case 'pharmacist':
                window.location.href = 'pages/pharmacist-dashboard.html';
                break;
            case 'paramedic':
                window.location.href = 'pages/paramedic-dashboard.html';
                break;
            case 'driver':
                window.location.href = 'pages/driver-dashboard.html';
                break;
            case 'receptionist':
                window.location.href = 'pages/receptionist-dashboard.html';
                break;
            default:
                window.location.href = 'pages/dashboard.html';
        }
    }, 1500);
}

function showLoadingAnimation(userType) {
    const userTypes = {
        'doctor': 'Doctor',
        'nurse': 'Nurse', 
        'patient': 'Patient',
        'pharmacist': 'Pharmacist',
        'paramedic': 'Paramedic',
        'driver': 'Delivery Driver',
        'receptionist': 'Receptionist'
    };
    
    const loadingHTML = `
        <div class="loading-overlay">
            <div class="loading-content">
                <div class="loading-spinner">
                    <i class="fas fa-stethoscope"></i>
                </div>
                <h2>Entering as ${userTypes[userType]}</h2>
                <p>Loading ${userTypes[userType]} Dashboard...</p>
                <div class="loading-bar">
                    <div class="progress"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
    
    // Add loading styles
    const loadingStyles = `
        <style>
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                color: white;
            }
            
            .loading-content {
                text-align: center;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                padding: 3rem;
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .loading-spinner {
                width: 80px;
                height: 80px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 2rem;
                font-size: 2rem;
                animation: pulse 1.5s infinite;
            }
            
            .loading-bar {
                width: 300px;
                height: 6px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                margin: 2rem auto 0;
                overflow: hidden;
            }
            
            .progress {
                height: 100%;
                background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
                border-radius: 10px;
                width: 0%;
                animation: loading 1.5s ease-in-out;
            }
            
            @keyframes loading {
                0% { width: 0%; }
                100% { width: 100%; }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', loadingStyles);
}

// Add keyboard shortcuts for quick access
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey) {
        switch(e.key) {
            case '1':
                enterAsUser('doctor');
                break;
            case '2':
                enterAsUser('nurse');
                break;
            case '3':
                enterAsUser('patient');
                break;
            case '4':
                enterAsUser('pharmacist');
                break;
            case '5':
                enterAsUser('paramedic');
                break;
            case '6':
                enterAsUser('driver');
                break;
            case '7':
                enterAsUser('receptionist');
                break;
        }
    }
});

// Add hover effects
document.addEventListener('DOMContentLoaded', function() {
    const userCards = document.querySelectorAll('.user-icon-card');
    
    userCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('DUT Clinic User Selection Ready');
    console.log('Quick Access: Ctrl+1 (Doctor), Ctrl+2 (Nurse), Ctrl+3 (Patient), etc.');
});

// Add this function to handle the Health Day event button
function showEventDetails() {
    const eventDetails = `
        <div class="event-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>HEALTHDAY AWARENESS EVENT</h2>
                    <button class="close-btn" onclick="closeEventModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="event-highlights">
                        <div class="highlight">
                            <i class="fas fa-heart"></i>
                            <h4>Free Health Screenings</h4>
                            <p>Blood pressure, glucose, BMI checks</p>
                        </div>
                        <div class="highlight">
                            <i class="fas fa-comments"></i>
                            <h4>Wellness Talks</h4>
                            <p>Expert sessions on mental & physical health</p>
                        </div>
                        <div class="highlight">
                            <i class="fas fa-utensils"></i>
                            <h4>Nutrition Guidance</h4>
                            <p>Healthy eating workshops and demos</p>
                        </div>
                    </div>
                    <div class="event-info">
                        <div class="info-item">
                            <i class="fas fa-calendar"></i>
                            <span><strong>Date:</strong> November 4, 2024</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <span><strong>Time:</strong> 09:00 - 16:00</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span><strong>Location:</strong> DUT Main Campus, Student Center</span>
                        </div>
                    </div>
                    <div class="event-actions">
                        <button class="btn-primary" onclick="registerForEvent()">
                            <i class="fas fa-user-plus"></i> Register for Event
                        </button>
                        <button class="btn-secondary" onclick="closeEventModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', eventDetails);
    
    // Add modal styles
    const modalStyles = `
        <style>
            .event-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                border-radius: 20px;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.3);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                border-bottom: 2px solid rgba(255, 255, 255, 0.2);
                padding-bottom: 1rem;
            }
            
            .modal-header h2 {
                color: white;
                font-size: 1.5rem;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s ease;
            }
            
            .close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .event-highlights {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .highlight {
                text-align: center;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .highlight i {
                font-size: 2rem;
                color: #4facfe;
                margin-bottom: 1rem;
            }
            
            .highlight h4 {
                margin-bottom: 0.5rem;
                font-size: 1rem;
            }
            
            .highlight p {
                font-size: 0.85rem;
                opacity: 0.9;
            }
            
            .event-info {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .info-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
            }
            
            .info-item i {
                color: #4facfe;
                width: 20px;
            }
            
            .event-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .btn-primary {
                background: #4facfe;
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .btn-primary:hover {
                background: #3498db;
                transform: translateY(-2px);
            }
            
            .btn-secondary {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 1rem 2rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.3);
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
}

function closeEventModal() {
    const modal = document.querySelector('.event-modal');
    if (modal) {
        modal.remove();
    }
}

function registerForEvent() {
    showNotification('Thank you for registering for HealthDay Awareness! We look forward to seeing you.', 'success');
    closeEventModal();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    if (!document.querySelector('.notification-styles')) {
        const notificationStyles = `
            <style class="notification-styles">
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    z-index: 10001;
                    border-left: 4px solid #4facfe;
                    animation: slideIn 0.3s ease;
                }
                
                .notification.success {
                    border-left-color: #28a745;
                }
                
                .notification i {
                    font-size: 1.2rem;
                }
                
                .notification.success i {
                    color: #28a745;
                }
                
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('event-modal')) {
        closeEventModal();
    }
});
// Keep the existing functions from previous version...
// (enterAsUser, showLoadingAnimation, etc. remain the same);