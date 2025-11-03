// Enhanced Patient Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Patient Dashboard Initialized');
    loadPatientData();
    loadPatientAppointments();
});

function loadPatientData() {
    console.log('Loading patient appointments and records...');
    // In real app, this would fetch from API
}

function loadPatientAppointments() {
    const patientAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '[]');
    const noAppointmentsDiv = document.getElementById('noAppointments');
    const appointmentListDiv = document.getElementById('appointmentList');
    
    if (patientAppointments.length === 0) {
        noAppointmentsDiv.style.display = 'block';
        appointmentListDiv.style.display = 'none';
    } else {
        noAppointmentsDiv.style.display = 'none';
        appointmentListDiv.style.display = 'block';
        
        // Show only upcoming appointments (not past appointments)
        const upcomingAppointments = patientAppointments.filter(apt => {
            const appointmentDate = new Date(apt.date + 'T' + apt.time);
            return appointmentDate >= new Date();
        });
        
        if (upcomingAppointments.length === 0) {
            noAppointmentsDiv.style.display = 'block';
            appointmentListDiv.style.display = 'none';
            return;
        }
        
        appointmentListDiv.innerHTML = upcomingAppointments.map(appointment => `
            <div class="patient-appointment ${appointment.type}">
                <div class="appointment-header">
                    <span class="appointment-type-badge ${appointment.type}">
                        ${appointment.type === 'virtual' ? 'Virtual' : 'Physical'}
                    </span>
                    <div class="appointment-datetime">
                        <span class="appointment-date">
                            ${new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        <span class="appointment-time">${appointment.time}</span>
                    </div>
                </div>
                
                <div class="appointment-details">
                    <div class="appointment-detail">
                        <h4>Consultation</h4>
                        <p>${getConsultationTypeText(appointment.consultationType)}</p>
                        <p>With: ${getProviderName(appointment.provider)}</p>
                    </div>
                    
                    <div class="appointment-detail">
                        <h4>Details</h4>
                        <p>${appointment.type === 'virtual' ? 'Video Consultation' : 'Clinic Visit'}</p>
                        ${appointment.type === 'physical' ? 
                            `<p>At: ${getCampusName(appointment.typeDetails?.campus)}</p>` : 
                            `<p>Platform: ${getPlatformName(appointment.typeDetails?.platform)}</p>`
                        }
                    </div>
                    
                    <div class="appointment-detail">
                        <h4>Status</h4>
                        <p class="status confirmed">Confirmed</p>
                        <p>Booked: ${new Date(appointment.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                
                <div class="appointment-actions">
                    ${appointment.type === 'virtual' ? 
                        `<button class="btn btn-small" onclick="joinVideoCall('${appointment.id}')">
                            <i class="fas fa-video"></i> Join Call
                        </button>` :
                        `<button class="btn btn-small" onclick="viewLocation('${appointment.id}')">
                            <i class="fas fa-map-marker-alt"></i> Location
                        </button>`
                    }
                    <button class="btn btn-outline" onclick="rescheduleAppointment('${appointment.id}')">
                        Reschedule
                    </button>
                    <button class="btn btn-outline" onclick="cancelAppointment('${appointment.id}')">
                        Cancel
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Missing function: getProviderName
function getProviderName(providerId) {
    const providers = {
        'any': 'Any Available Doctor',
        'dr-mkhize': 'Dr. Banele Mkhize',
        'dr-johnson': 'Dr. Johnson',
        'nurse-sarah': 'Nurse Sarah',
        'nurse-temba': 'Nurse Temba'
    };
    return providers[providerId] || 'Healthcare Provider';
}

function getConsultationTypeText(type) {
    const types = {
        'general': 'General Check-up',
        'followup': 'Follow-up Visit',
        'vaccination': 'Vaccination',
        'test-results': 'Test Results Review',
        'prescription': 'Prescription Refill',
        'mental-health': 'Mental Health Consultation',
        'sports-physio': 'Sports Physiology',
        'nutrition': 'Nutrition Counseling',
        'other': 'Other Consultation'
    };
    return types[type] || type;
}

function getPlatformName(platform) {
    const platforms = {
        'teams': 'Microsoft Teams',
        'zoom': 'Zoom',
        'google-meet': 'Google Meet',
        'whatsapp': 'WhatsApp Video'
    };
    return platforms[platform] || platform;
}

function getCampusName(campus) {
    const campuses = {
        'steve-biko': 'Steve Biko Campus',
        'ritson': 'Ritson Campus',
        'ml-sultan': 'ML Sultan Campus',
        'brickfield': 'Brickfield Campus'
    };
    return campuses[campus] || campus;
}

function joinVideoCall(appointmentId) {
    showNotification('Joining video consultation...', 'info');
    // In real app, this would connect to video call
    console.log('Join video call:', appointmentId);
}

function viewLocation(appointmentId) {
    showNotification('Opening location details...', 'info');
    // In real app, this would show clinic location
    console.log('View location:', appointmentId);
}

function rescheduleAppointment(appointmentId) {
    showNotification('Opening rescheduling options...', 'info');
    // In real app, this would open rescheduling interface
    console.log('Reschedule appointment:', appointmentId);
}

function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        // Remove from localStorage
        let patientAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '[]');
        patientAppointments = patientAppointments.filter(apt => apt.id !== appointmentId);
        localStorage.setItem('patientAppointments', JSON.stringify(patientAppointments));
        
        showNotification('Appointment cancelled successfully', 'success');
        loadPatientAppointments(); // Refresh the list
    }
}

// Quick Access Functions
function viewMedicalRecords() {
    showNotification('Opening medical records...', 'info');
    setTimeout(() => {
        window.location.href = 'patient-records.html';
    }, 1000);
}

function viewPrescriptions() {
    showNotification('Opening prescriptions...', 'info');
    setTimeout(() => {
        window.location.href = 'patient-prescriptions.html';
    }, 1000);
}

function sendMessageToDoctor() {
    showNotification('Opening doctor messaging...', 'info');
    setTimeout(() => {
        window.location.href = 'messaging.html';
    }, 1000);
}

function requestDelivery() {
    showNotification('Opening medication delivery request...', 'info');
    // In real app, this would open delivery request form
    console.log('Medication delivery request');
}

function viewLabResults() {
    showNotification('Opening lab results...', 'info');
    setTimeout(() => {
        window.location.href = 'diagnostics.html';
    }, 1000);
}

function giveFeedback() {
    showFeedbackForm();
}

// Dashboard appointment functions
function joinVideoCall() {
    showNotification('Joining video consultation...', 'info');
    // In real app, this would connect to video call
    console.log('Video call initiated');
}

function rescheduleAppointment() {
    showNotification('Opening rescheduling options...', 'info');
    // In real app, this would open rescheduling interface
    console.log('Appointment rescheduling');
}

function viewDetails() {
    showNotification('Loading appointment details...', 'info');
}

// Feedback Form Functions
function showFeedbackForm() {
    const feedbackHTML = `
        <div class="modal-overlay" onclick="closeFeedbackForm()">
            <div class="modal-content feedback-modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>Consultation Feedback</h2>
                    <button class="close-btn" onclick="closeFeedbackForm()">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="feedback-form" id="feedbackForm">
                        <div class="feedback-question">
                            <label>1. How would you rate the overall consultation?</label>
                            <div class="star-rating">
                                <span class="star" onclick="rateQuestion(1, 1)">★</span>
                                <span class="star" onclick="rateQuestion(1, 2)">★</span>
                                <span class="star" onclick="rateQuestion(1, 3)">★</span>
                                <span class="star" onclick="rateQuestion(1, 4)">★</span>
                                <span class="star" onclick="rateQuestion(1, 5)">★</span>
                            </div>
                        </div>
                        
                        <div class="feedback-question">
                            <label>2. How satisfied are you with the healthcare provider's communication?</label>
                            <div class="star-rating">
                                <span class="star" onclick="rateQuestion(2, 1)">★</span>
                                <span class="star" onclick="rateQuestion(2, 2)">★</span>
                                <span class="star" onclick="rateQuestion(2, 3)">★</span>
                                <span class="star" onclick="rateQuestion(2, 4)">★</span>
                                <span class="star" onclick="rateQuestion(2, 5)">★</span>
                            </div>
                        </div>
                        
                        <div class="feedback-question">
                            <label>3. How would you rate the waiting time?</label>
                            <div class="star-rating">
                                <span class="star" onclick="rateQuestion(3, 1)">★</span>
                                <span class="star" onclick="rateQuestion(3, 2)">★</span>
                                <span class="star" onclick="rateQuestion(3, 3)">★</span>
                                <span class="star" onclick="rateQuestion(3, 4)">★</span>
                                <span class="star" onclick="rateQuestion(3, 5)">★</span>
                            </div>
                        </div>
                        
                        <div class="feedback-question">
                            <label>4. How clean and comfortable was the facility?</label>
                            <div class="star-rating">
                                <span class="star" onclick="rateQuestion(4, 1)">★</span>
                                <span class="star" onclick="rateQuestion(4, 2)">★</span>
                                <span class="star" onclick="rateQuestion(4, 3)">★</span>
                                <span class="star" onclick="rateQuestion(4, 4)">★</span>
                                <span class="star" onclick="rateQuestion(4, 5)">★</span>
                            </div>
                        </div>
                        
                        <div class="feedback-question">
                            <label>5. How likely are you to recommend our clinic to others?</label>
                            <div class="star-rating">
                                <span class="star" onclick="rateQuestion(5, 1)">★</span>
                                <span class="star" onclick="rateQuestion(5, 2)">★</span>
                                <span class="star" onclick="rateQuestion(5, 3)">★</span>
                                <span class="star" onclick="rateQuestion(5, 4)">★</span>
                                <span class="star" onclick="rateQuestion(5, 5)">★</span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="additionalComments">Additional Comments or Suggestions</label>
                            <textarea id="additionalComments" rows="3" placeholder="Please share any additional feedback..."></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="closeFeedbackForm()">
                        Cancel
                    </button>
                    <button type="button" class="btn btn-primary" onclick="submitFeedback()">
                        Submit Feedback
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', feedbackHTML);
    
    // Add feedback styles if not already added
    if (!document.querySelector('#feedback-styles')) {
        const feedbackStyles = `
            <style id="feedback-styles">
                .feedback-modal {
                    max-width: 600px;
                }
                
                .feedback-question {
                    margin-bottom: 2rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid var(--light-gray);
                }
                
                .feedback-question:last-child {
                    border-bottom: none;
                }
                
                .feedback-question label {
                    display: block;
                    margin-bottom: 1rem;
                    font-weight: 600;
                    color: var(--text-dark);
                }
                
                .star-rating {
                    display: flex;
                    gap: 0.5rem;
                }
                
                .star {
                    font-size: 2rem;
                    color: var(--medium-gray);
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
                
                .star:hover,
                .star.active {
                    color: #ffc107;
                }
                
                .star-rating:hover .star {
                    color: #ffc107;
                }
                
                .star-rating .star:hover ~ .star {
                    color: var(--medium-gray);
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', feedbackStyles);
    }
}

let feedbackRatings = {};

function rateQuestion(questionNumber, rating) {
    feedbackRatings[questionNumber] = rating;
    
    // Update star display
    const stars = document.querySelectorAll(`.feedback-question:nth-child(${questionNumber}) .star`);
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function submitFeedback() {
    const totalQuestions = 5;
    const questionsRated = Object.keys(feedbackRatings).length;
    
    if (questionsRated < totalQuestions) {
        showNotification('Please rate all questions before submitting', 'error');
        return;
    }
    
    const additionalComments = document.getElementById('additionalComments').value;
    
    // Calculate average rating
    const totalRating = Object.values(feedbackRatings).reduce((sum, rating) => sum + rating, 0);
    const averageRating = (totalRating / totalQuestions).toFixed(1);
    
    showNotification(`Thank you for your feedback! Average rating: ${averageRating}/5`, 'success');
    
    // In real app, this would submit to backend
    console.log('Feedback submitted:', {
        ratings: feedbackRatings,
        averageRating: averageRating,
        comments: additionalComments
    });
    
    closeFeedbackForm();
}

function closeFeedbackForm() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
    feedbackRatings = {};
}

// Temporary debug function - remove in production
function debugBooking() {
    console.log('Book appointment clicked');
    // Simulate having an appointment for testing
    const testAppointment = {
        id: 'TEST-' + Date.now(),
        type: 'virtual',
        consultationType: 'general',
        provider: 'dr-mkhize',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        time: '10:00',
        symptoms: 'Test symptoms',
        typeDetails: { platform: 'teams', contactNumber: '+27 XXX XXX XXXX' },
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    
    let patientAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '[]');
    patientAppointments.push(testAppointment);
    localStorage.setItem('patientAppointments', JSON.stringify(patientAppointments));
    
    showNotification('Test appointment added! Refresh to see it.', 'success');
    setTimeout(() => {
        loadPatientAppointments();
    }, 1000);
}