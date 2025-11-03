// Appointment Booking functionality
let selectedTimeSlot = null;
let selectedAppointmentType = null;

console.log('Appointment Booking Script Loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Appointment Booking Page');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        dateInput.min = today;
        console.log('Date input min set to:', today);
    }
    
    // Form submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        console.log('Appointment form found, adding event listener');
        appointmentForm.addEventListener('submit', function(e) {
            console.log('Form submit event triggered');
            e.preventDefault();
            bookAppointment();
        });
    }
    
    // Date change listener
    const preferredDate = document.getElementById('preferredDate');
    if (preferredDate) {
        preferredDate.addEventListener('change', function() {
            console.log('Date changed to:', this.value);
            loadTimeSlots();
        });
    }
    
    console.log('Appointment booking page initialized successfully');
});

function selectAppointmentType(type) {
    console.log('selectAppointmentType called with:', type);
    selectedAppointmentType = type;
    const typeInput = document.getElementById('appointmentType');
    if (typeInput) {
        typeInput.value = type;
    }
    
    // Update UI
    document.querySelectorAll('.type-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('selected');
    }
    
    // Show/hide specific fields
    const virtualFields = document.getElementById('virtualFields');
    const physicalFields = document.getElementById('physicalFields');
    
    if (virtualFields && physicalFields) {
        if (type === 'virtual') {
            virtualFields.style.display = 'block';
            physicalFields.style.display = 'none';
            console.log('Showing virtual fields');
        } else {
            virtualFields.style.display = 'none';
            physicalFields.style.display = 'block';
            console.log('Showing physical fields');
        }
    }
    
    // Reload time slots based on type
    loadTimeSlots();
}

function loadTimeSlots() {
    console.log('loadTimeSlots called');
    const date = document.getElementById('preferredDate').value;
    const timeSlotsContainer = document.getElementById('timeSlots');
    
    if (!timeSlotsContainer) {
        console.error('timeSlots container not found!');
        return;
    }
    
    if (!date) {
        timeSlotsContainer.innerHTML = '<p>Please select a date first</p>';
        return;
    }
    
    if (!selectedAppointmentType) {
        timeSlotsContainer.innerHTML = '<p>Please select appointment type first</p>';
        return;
    }
    
    console.log('Loading time slots for:', date, 'type:', selectedAppointmentType);
    
    // Simulated available time slots
    const timeSlots = [
        { time: '08:00 AM', provider: 'Dr. Mkhize', available: true },
        { time: '09:00 AM', provider: 'Nurse Sarah', available: true },
        { time: '10:00 AM', provider: 'Dr. Johnson', available: true },
        { time: '11:00 AM', provider: 'Any Doctor', available: true },
        { time: '14:00 PM', provider: 'Nurse Temba', available: true },
        { time: '15:00 PM', provider: 'Dr. Mkhize', available: false },
        { time: '16:00 PM', provider: 'Any Doctor', available: true }
    ];
    
    timeSlotsContainer.innerHTML = timeSlots.map(slot => `
        <div class="time-slot ${slot.available ? '' : 'unavailable'} ${selectedTimeSlot === slot.time ? 'selected' : ''}" 
             onclick="${slot.available ? `selectTimeSlot('${slot.time}', '${slot.provider}')` : ''}">
            <span class="time">${slot.time}</span>
            <span class="provider">${slot.provider}</span>
            ${!slot.available ? '<small>Booked</small>' : ''}
        </div>
    `).join('');
    
    console.log('Time slots loaded:', timeSlots.length);
}

function selectTimeSlot(time, provider) {
    console.log('Time slot selected:', time, provider);
    selectedTimeSlot = time;
    document.getElementById('preferredTime').value = time.split(' ')[0];
    loadTimeSlots(); // Re-render to show selection
}

function bookAppointment() {
    console.log('bookAppointment function called!');
    
    if (!selectedAppointmentType) {
        showNotification('Please select appointment type (Virtual or Physical)', 'error');
        console.log('No appointment type selected');
        return;
    }
    
    const consultationType = document.getElementById('consultationType').value;
    const provider = document.getElementById('healthcareProvider').value;
    const date = document.getElementById('preferredDate').value;
    const time = document.getElementById('preferredTime').value;
    const symptoms = document.getElementById('symptoms').value;
    
    console.log('Form values:', { consultationType, provider, date, time, symptoms });
    
    if (!consultationType || !date || !time || !symptoms) {
        showNotification('Please fill in all required fields', 'error');
        console.log('Missing required fields');
        return;
    }
    
    if (!selectedTimeSlot) {
        showNotification('Please select an available time slot', 'error');
        console.log('No time slot selected');
        return;
    }
    
    console.log('All validation passed, proceeding with booking...');
    
    // Prepare appointment data
    const appointmentData = {
        type: selectedAppointmentType,
        consultationType: consultationType,
        provider: provider,
        date: date,
        time: time,
        symptoms: symptoms,
        typeDetails: selectedAppointmentType === 'virtual' ? {
            platform: document.getElementById('videoPlatform').value,
            contactNumber: document.getElementById('contactNumber').value
        } : {
            campus: document.getElementById('preferredCampus').value
        },
        status: 'confirmed'
    };
    
    console.log('Appointment data:', appointmentData);
    
    // Save appointment to patient's record
    savePatientAppointment(appointmentData);
    
    // Show confirmation popup
    showAppointmentConfirmation(appointmentData);
}

function savePatientAppointment(appointmentData) {
    console.log('Saving appointment to localStorage...');
    
    // Get existing appointments or initialize empty array
    let patientAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '[]');
    
    // Add new appointment
    const newAppointment = {
        id: 'APT-' + Date.now(),
        ...appointmentData,
        createdAt: new Date().toISOString(),
        patientName: 'John Doe',
        studentNumber: '22123456'
    };
    
    patientAppointments.push(newAppointment);
    
    // Save back to localStorage
    localStorage.setItem('patientAppointments', JSON.stringify(patientAppointments));
    
    console.log('Appointment saved successfully:', newAppointment);
    showNotification('Appointment booked successfully!', 'success');
}

function showAppointmentConfirmation(appointmentData) {
    console.log('Showing appointment confirmation popup...');
    
    const providerName = getProviderName(appointmentData.provider);
    const consultationTypeText = getConsultationTypeText(appointmentData.consultationType);
    
    // Format date and time nicely
    const appointmentDate = new Date(appointmentData.date + 'T' + appointmentData.time);
    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = appointmentData.time + (parseInt(appointmentData.time) < 12 ? ' AM' : ' PM');
    
    const confirmationHTML = `
        <div class="modal-overlay" onclick="closeAppointmentConfirmation()">
            <div class="modal-content appointment-confirmation" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>Appointment Confirmed! 🎉</h2>
                    <button class="close-btn" onclick="closeAppointmentConfirmation()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="confirmation-content">
                        <div class="confirmation-icon">
                            <i class="fas fa-thumbs-up"></i>
                        </div>
                        <h3>Your appointment has been scheduled successfully!</h3>
                        
                        <div class="appointment-details-confirm">
                            <div class="detail-item">
                                <i class="fas fa-calendar-check"></i>
                                <div>
                                    <strong>Date & Time</strong>
                                    <span>${formattedDate} at ${formattedTime}</span>
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <i class="fas fa-user-md"></i>
                                <div>
                                    <strong>Healthcare Provider</strong>
                                    <span>${providerName}</span>
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <i class="fas fa-stethoscope"></i>
                                <div>
                                    <strong>Appointment Type</strong>
                                    <span>${appointmentData.type === 'virtual' ? 'Virtual Consultation' : 'Physical Visit'} - ${consultationTypeText}</span>
                                </div>
                            </div>
                            
                            ${appointmentData.type === 'virtual' ? `
                                <div class="detail-item">
                                    <i class="fas fa-video"></i>
                                    <div>
                                        <strong>Video Platform</strong>
                                        <span>${getPlatformName(appointmentData.typeDetails.platform)}</span>
                                    </div>
                                </div>
                            ` : `
                                <div class="detail-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <div>
                                        <strong>Clinic Location</strong>
                                        <span>${getCampusName(appointmentData.typeDetails.campus)}</span>
                                    </div>
                                </div>
                            `}
                        </div>
                        
                        <div class="confirmation-reminder">
                            <p><strong>Reminder:</strong> You will receive SMS and email reminders before your appointment.</p>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="closeAppointmentConfirmation()">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" onclick="goToDashboard()">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmationHTML);
    console.log('Confirmation popup displayed');
}

function closeAppointmentConfirmation() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
    
    // Reset the form
    document.getElementById('appointmentForm').reset();
    document.querySelectorAll('.type-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    const virtualFields = document.getElementById('virtualFields');
    const physicalFields = document.getElementById('physicalFields');
    if (virtualFields) virtualFields.style.display = 'none';
    if (physicalFields) physicalFields.style.display = 'none';
    
    selectedAppointmentType = null;
    selectedTimeSlot = null;
    
    // Reload time slots
    loadTimeSlots();
    
    console.log('Confirmation popup closed and form reset');
}

// Helper functions
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
        'steve-biko': 'Steve Biko Campus Clinic',
        'ritson': 'Ritson Campus Clinic',
        'ml-sultan': 'ML Sultan Campus Clinic',
        'brickfield': 'Brickfield Campus Clinic'
    };
    return campuses[campus] || campus;
}

function goToDashboard() {
    window.location.href = 'patient-dashboard.html';
}

function goBack() {
    window.history.back();
}

function checkAvailability() {
    showNotification('Checking availability...', 'info');
    loadTimeSlots();
    setTimeout(() => {
        showNotification('Availability updated', 'success');
    }, 1000);
}

// Test function
function testBooking() {
    console.log('Test booking function called');
    showNotification('Test function working! JavaScript is loaded correctly.', 'success');
    
    // Test with sample data
    const testData = {
        type: 'virtual',
        consultationType: 'general',
        provider: 'dr-mkhize',
        date: '2024-11-20',
        time: '10:00',
        symptoms: 'Test symptoms',
        typeDetails: { platform: 'teams', contactNumber: '+27 123 456 789' }
    };
    
    showAppointmentConfirmation(testData);
}

// Notification function (in case it's not defined elsewhere)
function showNotification(message, type = 'info') {
    // Simple notification implementation
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
}