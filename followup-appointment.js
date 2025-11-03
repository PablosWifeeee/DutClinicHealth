// Mock patient data
const patients = [
    { id: 1, studentNumber: '22123456', name: 'Banele Mkhize', chronicConditions: ['hypertension'] },
    { id: 2, studentNumber: '22123468', name: 'John Doe', chronicConditions: ['hypertension'] },
    { id: 3, studentNumber: '22123457', name: 'Njabulo Sibisi', chronicConditions: ['diabetes'] },
    { id: 4, studentNumber: '22123458', name: 'Malibongwe Mbatha', chronicConditions: [] },
    { id: 5, studentNumber: '22123459', name: 'Siyasithanda Tema', chronicConditions: ['asthma'] },
    { id: 6, studentNumber: '22123460', name: 'Ritshidze Munyai', chronicConditions: ['diabetes'] },
    { id: 7, studentNumber: '22123461', name: 'Mihle Sigugu', chronicConditions: ['allergies'] },
    { id: 8, studentNumber: '22123462', name: 'Snethemba Ngobese', chronicConditions: [] },
    { id: 9, studentNumber: '22123463', name: 'Hlohonolofatso Dithebe', chronicConditions: [] },
    { id: 10, studentNumber: '22123464', name: 'Sandziso Dlamini', chronicConditions: ['anxiety'] },
    { id: 11, studentNumber: '22123465', name: 'Thando Ndlovu', chronicConditions: [] },
    { id: 12, studentNumber: '22123466', name: 'Lerato Khumalo', chronicConditions: [] },
    { id: 13, studentNumber: '22123467', name: 'Kagiso Van der Merwe', chronicConditions: [] }
];

// Mock recent appointments
const recentAppointments = [
    { 
        id: 1, 
        studentNumber: '22123456', 
        name: 'Banele Mkhize', 
        date: '2025-11-01', 
        reason: 'Headache and fever consultation',
        condition: 'flu'
    },
     { 
        id: 2, 
        studentNumber: '22123468', 
        name: 'John Doe', 
        date: '2025-11-01', 
        reason: 'Routine blood pressure check',
        condition: 'hypertension'
    },
    { 
        id: 3, 
        studentNumber: '22123457', 
        name: 'Njabulo Sibisi', 
        date: '2025-10-30', 
        reason: 'Blood pressure check and medication review',
        condition: 'hypertension'
    },
    { 
        id: 4, 
        studentNumber: '22123458', 
        name: 'Malibongwe Mbatha', 
        date: '2025-10-29', 
        reason: 'Asthma follow-up and inhaler prescription',
        condition: 'asthma'
    },
    { 
        id: 5, 
        studentNumber: '22123459', 
        name: 'Siyasithanda Tema', 
        date: '2025-10-28', 
        reason: 'Sports injury assessment and pain management',
        condition: 'injury'
    },
    { 
        id: 6, 
        studentNumber: '22123460', 
        name: 'Ritshidze Munyai', 
        date: '2025-10-27', 
        reason: 'Diabetes monitoring and insulin adjustment',
        condition: 'diabetes'
    },
    { 
        id: 7, 
        studentNumber: '22123461', 
        name: 'Mihle Sigugu', 
        date: '2025-10-26', 
        reason: 'Allergy testing and antihistamine prescription',
        condition: 'allergies'
    },
    { 
        id: 8, 
        studentNumber: '22123462', 
        name: 'Snethemba Ngobese', 
        date: '2025-10-25', 
        reason: 'Stomach pain and digestive issues',
        condition: 'digestive'
    },
    { 
        id: 9, 
        studentNumber: '22123463', 
        name: 'Hlohonolofatso Dithebe', 
        date: '2025-10-24', 
        reason: 'Skin rash and dermatology consultation',
        condition: 'dermatology'
    },
    { 
        id: 10, 
        studentNumber: '22123464', 
        name: 'Sandziso Dlamini', 
        date: '2025-10-23', 
        reason: 'Anxiety and mental health follow-up',
        condition: 'mental_health'
    },
    { 
        id: 11, 
        studentNumber: '22123465', 
        name: 'Thando Ndlovu', 
        date: '2025-10-22', 
        reason: 'Eye examination and glasses prescription',
        condition: 'vision'
    },
    { 
        id: 12, 
        studentNumber: '22123466', 
        name: 'Lerato Khumalo', 
        date: '2025-10-21', 
        reason: 'Dental check-up and cleaning',
        condition: 'dental'
    },
    { 
        id: 13, 
        studentNumber: '22123467', 
        name: 'Kagiso Van der Merwe', 
        date: '2025-10-20', 
        reason: 'Back pain and physiotherapy referral',
        condition: 'musculoskeletal'
    }
];
let scheduledAppointments = JSON.parse(localStorage.getItem('followupAppointments')) || [];
let selectedPatient = null;

// Load everything when page is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded - JavaScript is working!');
    loadRecentAppointments();
    
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('appointmentDate').min = tomorrow.toISOString().split('T')[0];
    
    // Test if functions are working
    console.log('All functions should be available now');
});

function loadRecentAppointments() {
    const container = document.getElementById('recentAppointments');
    if (!container) {
        console.error('Could not find recentAppointments container');
        return;
    }
    
    container.innerHTML = '';

    recentAppointments.forEach(appointment => {
        const appointmentElement = document.createElement('div');
        appointmentElement.className = 'appointment-item';
        appointmentElement.innerHTML = `
            <div class="appointment-header">
                <div class="student-info">
                    <div class="student-name">${appointment.name}</div>
                    <div class="student-number">${appointment.studentNumber}</div>
                </div>
                <div class="appointment-date">${formatDate(appointment.date)}</div>
            </div>
            <div class="appointment-reason">
                <strong>Reason:</strong> ${appointment.reason}
            </div>
            <button class="schedule-btn" onclick="quickSchedule('${appointment.studentNumber}')">
                Schedule Follow-up
            </button>
        `;
        container.appendChild(appointmentElement);
    });
}

function quickSchedule(studentNumber) {
    console.log('Quick schedule clicked for:', studentNumber);
    
    const patient = patients.find(p => p.studentNumber === studentNumber);
    if (patient) {
        selectPatient(patient);
        
        // Auto-fill based on recent appointment
        const recentAppt = recentAppointments.find(a => a.studentNumber === studentNumber);
        if (recentAppt) {
            document.getElementById('chronicCondition').value = recentAppt.condition;
            document.getElementById('followupReason').value = `Follow-up for: ${recentAppt.reason}`;
        }
        
        // Scroll to form
        document.getElementById('appointmentForm').scrollIntoView({ behavior: 'smooth' });
        
        showNotification('Patient selected! Please complete the form below.', 'success');
    } else {
        showNotification('Patient not found in system', 'error');
    }
}

function searchPatients() {
    const searchTerm = document.getElementById('patientSearch').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if (!resultsContainer) {
        console.error('Search results container not found');
        return;
    }
    
    if (searchTerm.length < 2) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        return;
    }

    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm) || 
        patient.studentNumber.includes(searchTerm)
    );

    displaySearchResults(filteredPatients);
}

function displaySearchResults(patients) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
    
    if (patients.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No patients found</div>';
        resultsContainer.style.display = 'block';
        return;
    }

    patients.forEach(patient => {
        const patientElement = document.createElement('div');
        patientElement.className = 'patient-result';
        patientElement.innerHTML = `
            <strong>${patient.name}</strong> (${patient.studentNumber})
            ${patient.chronicConditions.length > 0 ? 
                '<span class="chronic-badge">Chronic Condition</span>' : ''}
        `;
        patientElement.onclick = () => selectPatient(patient);
        resultsContainer.appendChild(patientElement);
    });
    
    resultsContainer.style.display = 'block';
}

function selectPatient(patient) {
    console.log('Selecting patient:', patient);
    selectedPatient = patient;
    
    // Hide search and show form
    document.getElementById('patientSearch').value = '';
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
    
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.style.display = 'block';
    }
    
    // Display patient info
    const patientInfo = document.getElementById('patientInfo');
    if (patientInfo) {
        patientInfo.innerHTML = `
            <strong>Name:</strong> ${patient.name}<br>
            <strong>Student No:</strong> ${patient.studentNumber}<br>
            <strong>Status:</strong> ${patient.chronicConditions.length > 0 ? 
                'Has chronic condition(s)' : 'No chronic conditions'}
        `;
    }
    
    // Auto-select chronic condition if patient has one
    if (patient.chronicConditions.length > 0) {
        document.getElementById('chronicCondition').value = patient.chronicConditions[0];
    }
    
    showNotification(`Patient ${patient.name} selected`, 'success');
}

function cancelSchedule() {
    selectedPatient = null;
    document.getElementById('appointmentForm').style.display = 'none';
    document.getElementById('followupForm').reset();
    showNotification('Schedule cancelled', 'info');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
    });
}

// Handle form submission
document.getElementById('followupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!selectedPatient) {
        showNotification('Please select a patient first', 'error');
        return;
    }

    const doctorSelect = document.getElementById('doctorSelect');
    const selectedDoctor = doctorSelect.options[doctorSelect.selectedIndex].text;
    
    const appointmentData = {
        id: Date.now(),
        patientId: selectedPatient.id,
        patientName: selectedPatient.name,
        studentNumber: selectedPatient.studentNumber,
        chronicCondition: document.getElementById('chronicCondition').value,
        doctor: document.getElementById('doctorSelect').value,
        doctorName: selectedDoctor,
        reason: document.getElementById('followupReason').value,
        appointmentDate: document.getElementById('appointmentDate').value,
        appointmentTime: document.getElementById('appointmentTime').value,
        status: 'scheduled',
        scheduledBy: 'Nurse',
        scheduledAt: new Date().toISOString()
    };

    // Save to localStorage
    scheduledAppointments.push(appointmentData);
    localStorage.setItem('followupAppointments', JSON.stringify(scheduledAppointments));
    
    // Update the button for this student
    updateScheduleButton(selectedPatient.studentNumber, selectedDoctor);
    
    // Show success message
    document.getElementById('successMessage').style.display = 'block';
    
    // Hide form
    document.getElementById('appointmentForm').style.display = 'none';
    
    // Reset form
    document.getElementById('followupForm').reset();
    selectedPatient = null;
    
    // Scroll to success message
    document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Follow-up appointment scheduled successfully!', 'success');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
    }, 5000);
});

// Function to update the schedule button
function updateScheduleButton(studentNumber, doctorName) {
    // Find all appointment items
    const appointmentItems = document.querySelectorAll('.appointment-item');
    
    appointmentItems.forEach(item => {
        const studentNumberElement = item.querySelector('.student-number');
        if (studentNumberElement && studentNumberElement.textContent === studentNumber) {
            const button = item.querySelector('.schedule-btn');
            if (button) {
                button.innerHTML = `✓ Scheduled with ${doctorName}`;
                button.style.background = '#95a5a6';
                button.style.cursor = 'default';
                button.onclick = null; // Remove click event
                
                // Add a checkmark icon to the appointment item
                const appointmentHeader = item.querySelector('.appointment-header');
                if (appointmentHeader) {
                    const checkmark = document.createElement('span');
                    checkmark.innerHTML = ' ✓';
                    checkmark.style.color = '#27ae60';
                    checkmark.style.fontWeight = 'bold';
                    checkmark.style.marginLeft = '10px';
                    appointmentHeader.appendChild(checkmark);
                }
            }
        }
    });
}

// Also update the quickSchedule function to check if already scheduled
function quickSchedule(studentNumber) {
    console.log('Quick schedule clicked for:', studentNumber);
    
    // Check if already scheduled
    const existingAppointment = scheduledAppointments.find(apt => apt.studentNumber === studentNumber);
    if (existingAppointment) {
        showNotification(`Appointment already scheduled with ${existingAppointment.doctorName}`, 'info');
        return;
    }
    
    const patient = patients.find(p => p.studentNumber === studentNumber);
    if (patient) {
        selectPatient(patient);
        
        // Auto-fill based on recent appointment
        const recentAppt = recentAppointments.find(a => a.studentNumber === studentNumber);
        if (recentAppt) {
            document.getElementById('chronicCondition').value = recentAppt.condition;
            document.getElementById('followupReason').value = `Follow-up for: ${recentAppt.reason}`;
        }
        
        // Scroll to form
        document.getElementById('appointmentForm').scrollIntoView({ behavior: 'smooth' });
        
        showNotification('Patient selected! Please complete the form below.', 'success');
    } else {
        showNotification('Patient not found in system', 'error');
    }
}

// Update the loadRecentAppointments to show scheduled status
function loadRecentAppointments() {
    const container = document.getElementById('recentAppointments');
    if (!container) {
        console.error('Could not find recentAppointments container');
        return;
    }
    
    container.innerHTML = '';

    recentAppointments.forEach(appointment => {
        const existingAppointment = scheduledAppointments.find(apt => apt.studentNumber === appointment.studentNumber);
        const isScheduled = !!existingAppointment;
        
        const appointmentElement = document.createElement('div');
        appointmentElement.className = 'appointment-item';
        
        if (isScheduled) {
            appointmentElement.innerHTML = `
                <div class="appointment-header">
                    <div class="student-info">
                        <div class="student-name">${appointment.name} ✓</div>
                        <div class="student-number">${appointment.studentNumber}</div>
                    </div>
                    <div class="appointment-date">${formatDate(appointment.date)}</div>
                </div>
                <div class="appointment-reason">
                    <strong>Reason:</strong> ${appointment.reason}
                </div>
                <button class="schedule-btn scheduled" style="background: #95a5a6; cursor: default;">
                    ✓ Scheduled with ${existingAppointment.doctorName}
                </button>
            `;
        } else {
            appointmentElement.innerHTML = `
                <div class="appointment-header">
                    <div class="student-info">
                        <div class="student-name">${appointment.name}</div>
                        <div class="student-number">${appointment.studentNumber}</div>
                    </div>
                    <div class="appointment-date">${formatDate(appointment.date)}</div>
                </div>
                <div class="appointment-reason">
                    <strong>Reason:</strong> ${appointment.reason}
                </div>
                <button class="schedule-btn" onclick="quickSchedule('${appointment.studentNumber}')">
                    Schedule Follow-up
                </button>
            `;
        }
        
        container.appendChild(appointmentElement);
    });
}

    // Save to localStorage
    scheduledAppointments.push(appointmentData);
    localStorage.setItem('followupAppointments', JSON.stringify(scheduledAppointments));
    
    // Show success message
    document.getElementById('successMessage').style.display = 'block';
    
    // Hide form
    document.getElementById('appointmentForm').style.display = 'none';
    
    // Reset form
    document.getElementById('followupForm').reset();
    selectedPatient = null;
    
    // Scroll to success message
    document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Follow-up appointment scheduled successfully!', 'success');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
    }, 5000);
;

function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add styles based on type
    if (type === 'success') {
        notification.style.background = '#27ae60';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else {
        notification.style.background = '#3498db';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Make back button work
function goBack() {
    window.location.href = 'appointments.html';
}