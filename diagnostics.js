// Diagnostics page functionality
const testTypes = {
    laboratory: [
        'Complete Blood Count (CBC)',
        'Basic Metabolic Panel',
        'Lipid Panel',
        'Liver Function Tests',
        'Thyroid Function Tests',
        'Hemoglobin A1C',
        'Urinalysis',
        'Culture and Sensitivity'
    ],
    imaging: [
        'Chest X-Ray',
        'Abdominal X-Ray',
        'CT Scan',
        'MRI',
        'Ultrasound',
        'Mammography',
        'Bone Density Scan',
        'Echocardiogram'
    ],
    pathology: [
        'Biopsy Analysis',
        'Cytology',
        'Histology',
        'Molecular Diagnostics',
        'Genetic Testing',
        'Tumor Markers'
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Diagnostics Page Initialized');
    
    // Initialize test types
    updateTestTypes();
    
    // Form submission
    const diagnosticForm = document.getElementById('diagnosticForm');
    if (diagnosticForm) {
        diagnosticForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitTestRequest();
        });
    }
});

function updateTestTypes() {
    const category = document.getElementById('testCategory').value;
    const testTypeSelect = document.getElementById('testType');
    
    // Clear existing options
    testTypeSelect.innerHTML = '<option value="">Select Test Type</option>';
    
    if (category && testTypes[category]) {
        testTypes[category].forEach(test => {
            const option = document.createElement('option');
            option.value = test.toLowerCase().replace(/\s+/g, '-');
            option.textContent = test;
            testTypeSelect.appendChild(option);
        });
    }
}

function requestNewTest() {
    showNotification('Opening test request form...', 'info');
    // Scroll to form
    document.getElementById('diagnosticForm').scrollIntoView({ behavior: 'smooth' });
}

function submitTestRequest() {
    const patient = document.getElementById('patientSelect').value;
    const category = document.getElementById('testCategory').value;
    const testType = document.getElementById('testType').value;
    const urgency = document.getElementById('urgency').value;
    
    if (!patient || !category || !testType) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    showNotification('Test request submitted successfully!', 'success');
    
    // In real app, this would submit to backend
    console.log('Test Request Submitted:', {
        patient,
        category,
        testType,
        urgency
    });
    
    // Reset form
    resetForm();
}

function resetForm() {
    document.getElementById('diagnosticForm').reset();
    updateTestTypes();
    showNotification('Form reset', 'info');
}

function viewTestDetails(testName) {
    showNotification(`Viewing details for ${testName}...`, 'info');
    // In real app, this would open test details modal
    console.log(`Test details: ${testName}`);
}

function uploadResults(testName) {
    showNotification(`Uploading results for ${testName}...`, 'info');
    // In real app, this would open file upload interface
    console.log(`Upload results: ${testName}`);
}

function downloadResults(testName) {
    showNotification(`Downloading results for ${testName}...`, 'info');
    // In real app, this would trigger file download
    console.log(`Download results: ${testName}`);
}

function uploadMedicalImage() {
    showNotification('Opening medical image upload...', 'info');
    setTimeout(() => {
        window.location.href = 'upload-images.html';
    }, 1000);
}

function viewAllResults() {
    showNotification('Opening test results...', 'info');
    setTimeout(() => {
        window.location.href = 'test-results.html';
    }, 1000);
}

function manageTemplates() {
    showNotification('Opening test templates...', 'info');
    // In real app, this would open template management
    console.log('Test template management');
}

function generateReports() {
    showNotification('Generating diagnostic reports...', 'info');
    // In real app, this would open report generator
    console.log('Diagnostic report generation');
}