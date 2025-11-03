// Nurse Consultation functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nurse Consultation Page Initialized');
    
    // Set minimum follow-up date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('followupDate').min = tomorrow.toISOString().split('T')[0];
    
    // Add BMI calculation when height or weight changes
    document.getElementById('height').addEventListener('input', calculateBMI);
    document.getElementById('weight').addEventListener('input', calculateBMI);
});

function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (height > 0 && weight > 0) {
        const bmi = weight / (height * height);
        document.getElementById('bmi').value = bmi.toFixed(1);
    }
}

function saveVitals() {
    const temperature = document.getElementById('temperature').value;
    const bloodPressure = document.getElementById('bloodPressure').value;
    const heartRate = document.getElementById('heartRate').value;
    
    if (!temperature || !bloodPressure || !heartRate) {
        showNotification('Please fill in at least temperature, blood pressure, and heart rate', 'error');
        return;
    }
    
    showNotification('Vital signs saved successfully', 'success');
    
    // In real app, this would save to patient record
    console.log('Vitals saved:', {
        temperature,
        bloodPressure,
        heartRate,
        respiratoryRate: document.getElementById('respiratoryRate').value,
        oxygenSaturation: document.getElementById('oxygenSaturation').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        bmi: document.getElementById('bmi').value
    });
}

function scheduleFollowup() {
    const followupDate = document.getElementById('followupDate').value;
    const followupTime = document.getElementById('followupTime').value;
    const reason = document.getElementById('followupReason').value;
    
    if (!followupDate || !followupTime) {
        showNotification('Please select both date and time for follow-up', 'error');
        return;
    }
    
    const appointmentDateTime = new Date(followupDate + 'T' + followupTime);
    const formattedDate = appointmentDateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = document.getElementById('followupTime').options[document.getElementById('followupTime').selectedIndex].text;
    
    showNotification(`Follow-up scheduled for ${formattedDate} at ${formattedTime}`, 'success');
    
    // In real app, this would create the follow-up appointment
    console.log('Follow-up scheduled:', {
        date: followupDate,
        time: followupTime,
        reason: reason
    });
}

function completeConsultation() {
    const clinicalNotes = document.getElementById('subjectiveNotes').value;
    const findings = document.getElementById('objectiveFindings').value;
    
    if (!clinicalNotes || !findings) {
        if (!confirm('Clinical notes are incomplete. Are you sure you want to complete the consultation?')) {
            return;
        }
    }
    
    showNotification('Consultation completed successfully', 'success');
    
    // In real app, this would finalize the consultation
    console.log('Consultation completed');
    
    // Redirect back to nurse dashboard after delay
    setTimeout(() => {
        window.location.href = 'nurse-dashboard.html';
    }, 2000);
}

function referToDoctor() {
    showNotification('Opening doctor referral form...', 'info');
    // In real app, this would open referral interface
    console.log('Refer to doctor');
}

function prescribeMedication() {
    showNotification('Opening prescription manager...', 'info');
    // In real app, this would open prescription interface
    console.log('Prescribe medication');
}