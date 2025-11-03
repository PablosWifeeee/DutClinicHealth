function submitEmergencyRequest() {
    const emergencyType = document.getElementById('emergencyType').value;
    const location = document.getElementById('location').value;
    const exactLocation = document.getElementById('exactLocation').value;
    const patientCondition = document.getElementById('patientCondition').value;
    const patientInfo = document.getElementById('patientInfo').value;
    const notifyContacts = document.getElementById('notifyContacts').checked;
    
    if (!emergencyType || !location || !patientCondition) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (location === 'other' && !exactLocation) {
        showNotification('Please provide specific location details', 'error');
        return;
    }
    
    // Show confirmation popup instead of inline confirmation
    showEmergencyConfirmationPopup({
        emergencyType,
        location,
        exactLocation,
        patientCondition,
        patientInfo,
        notifyContacts
    });
}

function showEmergencyConfirmationPopup(emergencyData) {
    const locationText = emergencyData.location === 'other' ? 
        emergencyData.exactLocation : 
        getLocationText(emergencyData.location);
    
    const confirmationHTML = `
        <div class="modal-overlay" onclick="closeEmergencyConfirmation()">
            <div class="modal-content emergency-confirmation" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>Emergency Request Confirmed! 🚑</h2>
                    <button class="close-btn" onclick="closeEmergencyConfirmation()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="confirmation-content">
                        <div class="confirmation-icon">
                            <i class="fas fa-thumbs-up"></i>
                        </div>
                        <h3>Help is on the way!</h3>
                        <p>Your emergency request has been received and emergency services have been dispatched.</p>
                        
                        <div class="emergency-details">
                            <div class="detail-item">
                                <i class="fas fa-exclamation-triangle"></i>
                                <div>
                                    <strong>Emergency Type</strong>
                                    <span>${document.getElementById('emergencyType').options[document.getElementById('emergencyType').selectedIndex].text}</span>
                                </div>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <strong>Location</strong>
                                    <span>${locationText}</span>
                                </div>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-clock"></i>
                                <div>
                                    <strong>Request Time</strong>
                                    <span>${new Date().toLocaleTimeString()}</span>
                                </div>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-ambulance"></i>
                                <div>
                                    <strong>Estimated Arrival</strong>
                                    <span>3-5 minutes</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="emergency-instructions">
                            <h4>What to do now:</h4>
                            <ul>
                                <li>Stay calm and with the patient if safe to do so</li>
                                <li>Keep your phone accessible for updates</li>
                                <li>Wait at the building entrance to guide emergency team</li>
                                <li>Follow instructions from emergency responders</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="closeEmergencyConfirmation()">
                        Close
                    </button>
                    <button type="button" class="btn btn-danger" onclick="trackEmergencyResponse()">
                        <i class="fas fa-binoculars"></i>
                        Track Response
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmationHTML);
    
    // Add emergency confirmation styles
    if (!document.querySelector('#emergency-confirmation-styles')) {
        const emergencyStyles = `
            <style id="emergency-confirmation-styles">
                .emergency-confirmation {
                    max-width: 500px;
                }
                
                .confirmation-content {
                    text-align: center;
                }
                
                .confirmation-icon {
                    font-size: 4rem;
                    color: var(--success);
                    margin-bottom: 1rem;
                    animation: bounce 1s ease;
                }
                
                .confirmation-content h3 {
                    color: var(--primary-blue);
                    margin-bottom: 1rem;
                }
                
                .emergency-details {
                    background: var(--light-gray);
                    border-radius: 10px;
                    padding: 1.5rem;
                    margin: 1.5rem 0;
                    text-align: left;
                }
                
                .detail-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid var(--medium-gray);
                }
                
                .detail-item:last-child {
                    margin-bottom: 0;
                    padding-bottom: 0;
                    border-bottom: none;
                }
                
                .detail-item i {
                    font-size: 1.2rem;
                    color: var(--accent-blue);
                    width: 20px;
                }
                
                .detail-item div {
                    flex: 1;
                }
                
                .detail-item strong {
                    display: block;
                    color: var(--text-dark);
                    font-size: 0.9rem;
                }
                
                .detail-item span {
                    color: var(--dark-gray);
                    font-size: 0.9rem;
                }
                
                .emergency-instructions {
                    background: rgba(255, 193, 7, 0.1);
                    border: 1px solid rgba(255, 193, 7, 0.3);
                    border-radius: 8px;
                    padding: 1rem;
                    text-align: left;
                }
                
                .emergency-instructions h4 {
                    color: var(--warning);
                    margin-bottom: 0.5rem;
                }
                
                .emergency-instructions ul {
                    margin: 0;
                    padding-left: 1.5rem;
                }
                
                .emergency-instructions li {
                    margin-bottom: 0.25rem;
                    color: var(--text-dark);
                    font-size: 0.9rem;
                }
                
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-10px);
                    }
                    60% {
                        transform: translateY(-5px);
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', emergencyStyles);
    }
    
    // In real app, this would submit the emergency request to backend
    console.log('Emergency request submitted:', emergencyData);
    
    // Simulate emergency response initiation
    simulateEmergencyResponse();
}

function closeEmergencyConfirmation() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
    
    // Reset the form
    document.getElementById('emergencyForm').reset();
    document.getElementById('specificLocation').style.display = 'none';
}

function trackEmergencyResponse() {
    showNotification('Opening emergency tracking...', 'info');
    window.location.href = 'emergency-tracking.html';
}

// Keep the existing simulateEmergencyResponse function
function simulateEmergencyResponse() {
    // Simulate the emergency response process
    setTimeout(() => {
        // This would typically push notifications to the tracking page
        console.log('Emergency response simulation started');
    }, 1000);
}