// Nurse specific functionality
function startTriage() {
    showNotification('Starting new patient triage...', 'info');
    setTimeout(() => {
        window.location.href = 'triage.html';
    }, 1000);
}

function startPatientTriage(patientName) {
    showNotification(`Starting triage for ${patientName}...`, 'info');
    // In real app, this would open triage form for specific patient
    console.log(`Triage started for: ${patientName}`);
}

function takeVitals() {
    showNotification('Opening vital signs recording...', 'info');
    setTimeout(() => {
        window.location.href = 'vitals.html';
    }, 1000);
}

function administerMedication() {
    showNotification('Opening medication administration...', 'info');
    setTimeout(() => {
        window.location.href = 'medication.html';
    }, 1000);
}

function requestDiagnostic() {
    showNotification('Opening diagnostic test request...', 'info');
    setTimeout(() => {
        window.location.href = 'diagnostics.html';
    }, 1000);
}

function sendMessage() {
    showNotification('Opening messaging system...', 'info');
    setTimeout(() => {
        window.location.href = 'messaging.html';
    }, 1000);
}

// Initialize nurse dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nurse Dashboard Initialized');
    loadNurseData();
});

function loadNurseData() {
    console.log('Loading nurse patient data and queue...');
    // Simulate loading nurse-specific data
}