document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.querySelector('.progress');
    const loadingText = document.querySelector('.loading-text p');
    const medicalIcons = document.querySelectorAll('.icon-circle');
    
    // Simulate loading progress
    let progress = 0;
    const loadingMessages = [
        "Initializing healthcare services...",
        "Loading patient records...",
        "Setting up appointment system...",
        "Configuring emergency services...",
        "Preparing diagnostic tools...",
        "Almost ready..."
    ];
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Update final message
            loadingText.textContent = "Welcome to DUT Clinic Management System";
            
            // Redirect to main application after a brief delay
            setTimeout(() => {
                window.location.href = 'pages/dashboard.html';
            }, 1500);
        }
        
        progressBar.style.width = `${progress}%`;
        
        // Update loading messages based on progress
        if (progress < 20) {
            loadingText.textContent = loadingMessages[0];
        } else if (progress < 40) {
            loadingText.textContent = loadingMessages[1];
        } else if (progress < 60) {
            loadingText.textContent = loadingMessages[2];
        } else if (progress < 80) {
            loadingText.textContent = loadingMessages[3];
        } else if (progress < 95) {
            loadingText.textContent = loadingMessages[4];
        } else {
            loadingText.textContent = loadingMessages[5];
        }
        
        // Add subtle animation to icons based on progress
        medicalIcons.forEach((icon, index) => {
            if (progress > (index + 1) * 20) {
                icon.style.animation = `pulse 1.5s infinite ${index * 0.2}s`;
            }
        });
        
    }, 500);
    
    // Add click event to skip loading (for development)
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            clearInterval(loadingInterval);
            window.location.href = 'pages/dashboard.html';
        }
    });
});