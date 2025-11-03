// Appointments page functionality
let currentView = 'day';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Appointments Page Initialized');
    loadAppointments();
    
    // Add click handlers for appointment blocks
    document.querySelectorAll('.appointment-block').forEach(block => {
        block.addEventListener('click', function() {
            const appointmentId = this.getAttribute('data-appointment');
            viewAppointmentDetails(appointmentId);
        });
    });
    
    // Add click handlers for appointment cards
    document.querySelectorAll('.appointment-card').forEach(card => {
        card.addEventListener('click', function() {
            const appointmentId = this.getAttribute('data-appointment');
            viewAppointmentDetails(appointmentId);
        });
    });
});

function loadAppointments() {
    console.log('Loading appointments data...');
    // In real app, this would fetch appointments from API
}

function switchView(view) {
    currentView = view;
    
    // Update active button
    document.querySelectorAll('.view-options .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    showNotification(`Switched to ${view} view`, 'info');
    
    // In real app, this would reload the schedule for the selected view
    console.log(`View switched to: ${view}`);
}

function bookNewAppointment() {
    showNotification('Opening appointment booking...', 'info');
    setTimeout(() => {
        window.location.href = 'book-appointment.html';
    }, 1000);
}

function startAppointment(appointmentId) {
    showNotification(`Starting appointment ${appointmentId}...`, 'info');
    
    // Update appointment status
    updateAppointmentStatus(appointmentId, 'in-progress');
    
    // In real app, this would open consultation interface
    console.log(`Appointment started: ${appointmentId}`);
}

function completeAppointment(appointmentId) {
    showNotification(`Completing appointment ${appointmentId}...`, 'info');
    
    // Update appointment status
    updateAppointmentStatus(appointmentId, 'completed');
    
    // In real app, this would open completion form
    console.log(`Appointment completed: ${appointmentId}`);
}

function rescheduleAppointment(appointmentId) {
    showNotification(`Rescheduling appointment ${appointmentId}...`, 'info');
    
    // In real app, this would open rescheduling interface
    console.log(`Appointment rescheduled: ${appointmentId}`);
}

function addNotes(appointmentId) {
    showNotification(`Adding notes for appointment ${appointmentId}...`, 'info');
    
    // In real app, this would open notes modal
    console.log(`Add notes for appointment: ${appointmentId}`);
}

function viewAppointmentDetails(appointmentId) {
    showNotification(`Viewing appointment ${appointmentId} details...`, 'info');
    
    // In real app, this would open appointment details modal
    console.log(`Appointment details: ${appointmentId}`);
    
    // Show appointment details in a modal (simulated)
    const appointmentDetails = {
        1: {
            patient: 'John Doe',
            type: 'Follow-up Consultation',
            doctor: 'Dr. Banele Mkhize',
            room: 'Room 201',
            duration: '30 minutes',
            notes: 'Hypertension management follow-up'
        },
        2: {
            patient: 'Sarah Smith',
            type: 'New Patient',
            doctor: 'Dr. Johnson',
            room: 'Room 203',
            duration: '45 minutes',
            notes: 'Initial consultation - respiratory issues'
        },
        3: {
            patient: 'Mike Wilson',
            type: 'Lab Review',
            doctor: 'Nurse Sarah',
            room: 'Room 205',
            duration: '30 minutes',
            notes: 'Blood test results discussion'
        },
        4: {
            patient: 'Lisa Brown',
            type: 'Vaccination',
            doctor: 'Dr. Mkhize',
            room: 'Room 201',
            duration: '15 minutes',
            notes: 'Annual flu vaccination'
        }
    };
    
    const details = appointmentDetails[appointmentId];
    if (details) {
        const modalHTML = `
            <div class="modal-overlay" onclick="closeModal()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3>Appointment Details</h3>
                        <button class="close-btn" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="detail-item">
                            <strong>Patient:</strong> ${details.patient}
                        </div>
                        <div class="detail-item">
                            <strong>Appointment Type:</strong> ${details.type}
                        </div>
                        <div class="detail-item">
                            <strong>Healthcare Provider:</strong> ${details.doctor}
                        </div>
                        <div class="detail-item">
                            <strong>Room:</strong> ${details.room}
                        </div>
                        <div class="detail-item">
                            <strong>Duration:</strong> ${details.duration}
                        </div>
                        <div class="detail-item">
                            <strong>Notes:</strong> ${details.notes}
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-outline" onclick="closeModal()">
                            Close
                        </button>
                        <button class="btn btn-primary" onclick="startAppointment(${appointmentId})">
                            Start Appointment
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add modal styles if not already added
        if (!document.querySelector('#modal-styles')) {
            const modalStyles = `
                <style id="modal-styles">
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 10000;
                    }
                    
                    .modal-content {
                        background: white;
                        border-radius: 15px;
                        padding: 2rem;
                        max-width: 500px;
                        width: 90%;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    }
                    
                    .modal-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 1.5rem;
                        border-bottom: 2px solid var(--light-gray);
                        padding-bottom: 1rem;
                    }
                    
                    .modal-header h3 {
                        color: var(--primary-blue);
                        margin: 0;
                    }
                    
                    .close-btn {
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: var(--dark-gray);
                    }
                    
                    .modal-body {
                        margin-bottom: 2rem;
                    }
                    
                    .detail-item {
                        margin-bottom: 1rem;
                        padding: 0.5rem 0;
                        border-bottom: 1px solid var(--light-gray);
                    }
                    
                    .modal-actions {
                        display: flex;
                        gap: 1rem;
                        justify-content: flex-end;
                    }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', modalStyles);
        }
    }
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function updateAppointmentStatus(appointmentId, status) {
    // Update the status badge
    const statusElement = document.querySelector(`[data-appointment="${appointmentId}"] .status-badge`);
    if (statusElement) {
        statusElement.textContent = status.replace('-', ' ').toUpperCase();
        statusElement.className = `status-badge ${status}`;
    }
    
    // Update the appointment block status
    const blockElement = document.querySelector(`.appointment-block[data-appointment="${appointmentId}"] .appointment-status`);
    if (blockElement) {
        blockElement.textContent = status.replace('-', ' ').toUpperCase();
        blockElement.className = `appointment-status ${status}`;
    }
}

function checkAvailability() {
    showNotification('Checking doctor availability...', 'info');
    setTimeout(() => {
        window.location.href = 'availability.html';
    }, 1000);
}

function sendReminders() {
    showNotification('Sending appointment reminders...', 'info');
    // In real app, this would send SMS/email reminders
    console.log('Appointment reminders sent');
}

function generateSchedule() {
    showNotification('Generating schedule report...', 'info');
    // In real app, this would generate and download schedule PDF
    console.log('Schedule report generated');
}0