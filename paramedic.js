// Paramedic specific functionality
function respondToEmergency(emergencyType) {
    showNotification(`Responding to ${emergencyType} emergency...`, 'warning');
    // In real app, this would update emergency status and dispatch ambulance
    console.log(`Emergency response: ${emergencyType}`);
    
    // Simulate ambulance dispatch
    setTimeout(() => {
        showNotification('Ambulance dispatched! Updating status to En Route...', 'success');
        updateAmbulanceStatus('en-route');
    }, 2000);
}

function updateAmbulanceStatus() {
    showNotification('Opening ambulance status update...', 'info');
    // In real app, this would open status update modal
    console.log('Ambulance status update');
}

function logEmergency() {
    showNotification('Opening emergency logging...', 'info');
    setTimeout(() => {
        window.location.href = 'emergency.html';
    }, 1000);
}

function recordOutcome() {
    showNotification('Opening outcome recording...', 'info');
    setTimeout(() => {
        window.location.href = 'emergency-records.html';
    }, 1000);
}

function checkEquipment() {
    showNotification('Opening equipment check...', 'info');
    setTimeout(() => {
        window.location.href = 'equipment.html';
    }, 1000);
}

function updateAmbulanceStatus(status) {
    const statusElement = document.querySelector('.ambulance-status');
    if (statusElement) {
        if (status === 'en-route') {
            statusElement.innerHTML = '<i class="fas fa-ambulance"></i><span>Ambulance 3: EN ROUTE</span>';
            statusElement.className = 'ambulance-status en-route';
            statusElement.style.background = 'rgba(255, 193, 7, 0.1)';
            statusElement.style.color = 'var(--warning)';
            statusElement.style.border = '1px solid rgba(255, 193, 7, 0.3)';
        }
    }
}

// Initialize paramedic dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Paramedic Dashboard Initialized');
    loadParamedicData();
});

function loadParamedicData() {
    console.log('Loading emergency response data...');
}