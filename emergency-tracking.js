// Emergency Tracking functionality
let emergencies = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Emergency Tracking Page Initialized');
    loadEmergencyRequests();
    startLiveUpdates();
});

function loadEmergencyRequests() {
    // Simulated emergency requests data
    emergencies = [
        {
            id: 'EMG-123456',
            studentName: 'John Doe',
            studentNumber: '22123456',
            emergencyType: 'Breathing Difficulty',
            location: 'Steve Biko Campus - Mens Residence, Room 205',
            campus: 'Steve Biko',
            timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
            status: 'dispatched',
            priority: 'urgent',
            assignedTo: 'Alex Johnson',
            estimatedArrival: '2 minutes'
        },
        {
            id: 'EMG-123457',
            studentName: 'Sarah Smith',
            studentNumber: '22123457',
            emergencyType: 'Severe Allergic Reaction',
            location: 'Ritson Library, Study Area 3',
            campus: 'Ritson',
            timestamp: new Date(Date.now() - 2 * 60000), // 2 minutes ago
            status: 'on-scene',
            priority: 'critical',
            assignedTo: 'Dr. Mkhize',
            estimatedArrival: 'On scene'
        },
        {
            id: 'EMG-123458',
            studentName: 'Mike Wilson',
            studentNumber: '22123458',
            emergencyType: 'Chest Pain',
            location: 'Sports Complex, Gym Area',
            campus: 'Steve Biko',
            timestamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
            status: 'transporting',
            priority: 'critical',
            assignedTo: 'Nurse Sarah',
            estimatedArrival: 'En route to hospital'
        },
        {
            id: 'EMG-123459',
            studentName: 'Lisa Brown',
            studentNumber: '22123459',
            emergencyType: 'Anxiety Attack',
            location: 'ML Sultan Campus, Garden Courts',
            campus: 'ML Sultan',
            timestamp: new Date(Date.now() - 1 * 60000), // 1 minute ago
            status: 'requested',
            priority: 'urgent',
            assignedTo: 'Pending',
            estimatedArrival: '5 minutes'
        }
    ];
    
    renderEmergencyRequests();
    updateStats();
}

function renderEmergencyRequests() {
    const container = document.getElementById('emergencyRequests');
    const statusFilter = document.getElementById('statusFilter').value;
    const campusFilter = document.getElementById('campusFilter').value;
    
    let filteredEmergencies = emergencies;
    
    // Apply filters
    if (statusFilter !== 'all') {
        filteredEmergencies = filteredEmergencies.filter(emergency => 
            emergency.status === statusFilter
        );
    }
    
    if (campusFilter !== 'all') {
        filteredEmergencies = filteredEmergencies.filter(emergency => 
            emergency.campus.toLowerCase().replace(' ', '-') === campusFilter
        );
    }
    
    if (filteredEmergencies.length === 0) {
        container.innerHTML = `
            <div class="no-emergencies">
                <i class="fas fa-check-circle"></i>
                <h3>No Active Emergencies</h3>
                <p>All emergency requests have been responded to.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredEmergencies.map(emergency => `
        <div class="emergency-request ${emergency.priority} ${emergency.status}">
            <div class="request-header">
                <div class="student-info">
                    <div class="student-avatar">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(emergency.studentName)}&background=4facfe&color=fff" alt="${emergency.studentName}">
                    </div>
                    <div class="student-details">
                        <h3>${emergency.studentName}</h3>
                        <p>Student #: ${emergency.studentNumber}</p>
                        <p>Emergency: ${emergency.emergencyType}</p>
                    </div>
                </div>
                <div class="emergency-status">
                    <span class="status-badge ${emergency.status}">${emergency.status.toUpperCase()}</span>
                    <span class="request-time">${formatTime(emergency.timestamp)}</span>
                </div>
            </div>
            
            <div class="request-details">
                <div class="detail-group">
                    <h4>Location Details</h4>
                    <p><i class="fas fa-map-marker-alt"></i> ${emergency.location}</p>
                    <p><i class="fas fa-university"></i> ${emergency.campus} Campus</p>
                </div>
                
                <div class="detail-group">
                    <h4>Response Info</h4>
                    <p><i class="fas fa-user-md"></i> ${emergency.assignedTo}</p>
                    <p><i class="fas fa-clock"></i> ${emergency.estimatedArrival}</p>
                </div>
                
                <div class="detail-group">
                    <h4>Emergency Details</h4>
                    <p><i class="fas fa-stethoscope"></i> ${emergency.emergencyType}</p>
                    <p><i class="fas fa-exclamation-triangle"></i> ${emergency.priority.toUpperCase()} PRIORITY</p>
                </div>
            </div>
            
            <div class="emergency-actions">
                <button class="btn btn-small" onclick="viewEmergencyDetails('${emergency.id}')">
                    <i class="fas fa-eye"></i> Details
                </button>
                <button class="btn btn-primary" onclick="updateEmergencyStatus('${emergency.id}')">
                    <i class="fas fa-edit"></i> Update
                </button>
                <button class="btn btn-outline" onclick="contactStudent('${emergency.id}')">
                    <i class="fas fa-phone"></i> Contact
                </button>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const activeEmergencies = emergencies.filter(e => 
        e.status !== 'transporting' && e.status !== 'resolved'
    ).length;
    
    const respondedEmergencies = emergencies.filter(e => 
        e.status === 'on-scene' || e.status === 'transporting'
    ).length;
    
    document.getElementById('activeEmergencies').textContent = activeEmergencies;
    document.getElementById('respondedEmergencies').textContent = respondedEmergencies;
}

function filterEmergencies() {
    renderEmergencyRequests();
}

function refreshEmergencies() {
    showNotification('Refreshing emergency data...', 'info');
    // In real app, this would fetch from server
    setTimeout(() => {
        loadEmergencyRequests();
        showNotification('Emergency data updated', 'success');
    }, 1000);
}

function viewEmergencyDetails(emergencyId) {
    const emergency = emergencies.find(e => e.id === emergencyId);
    if (emergency) {
        showNotification(`Viewing details for ${emergency.studentName}'s emergency`, 'info');
        // In real app, this would open a detailed modal
        console.log('Emergency details:', emergency);
    }
}

function updateEmergencyStatus(emergencyId) {
    const emergency = emergencies.find(e => e.id === emergencyId);
    if (emergency) {
        showNotification(`Updating status for ${emergency.studentName}`, 'info');
        // In real app, this would open status update modal
    }
}

function contactStudent(emergencyId) {
    const emergency = emergencies.find(e => e.id === emergencyId);
    if (emergency) {
        showNotification(`Calling ${emergency.studentName}...`, 'info');
        // In real app, this would initiate a call
    }
}

function formatTime(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
}

function startLiveUpdates() {
    // Simulate live updates every 30 seconds
    setInterval(() => {
        // In real app, this would fetch new data from server
        console.log('Checking for emergency updates...');
    }, 30000);
}