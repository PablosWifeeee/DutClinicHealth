// Receptionist Dashboard JavaScript

// Enhanced sample feedback data with more ratings
const sampleFeedback = [
    {
        id: 1,
        nurseName: "Nurse Jackson",
        rating: 5,
        comment: "Very professional and caring. Explained everything clearly.",
        date: "2024-10-28",
        patientId: "anonymous"
    },
    {
        id: 2,
        nurseName: "Nurse Mukwevho",
        rating: 4,
        comment: "Good service but had to wait a bit long.",
        date: "2024-10-29",
        patientId: "anonymous"
    },
    {
        id: 3,
        nurseName: "Nurse Dhlomo",
        rating: 5,
        comment: "Excellent care and very thorough examination.",
        date: "2024-10-30",
        patientId: "anonymous"
    },
    {
        id: 4,
        nurseName: "Nurse Jackson",
        rating: 3,
        comment: "Service was okay, but could be more attentive.",
        date: "2024-10-25",
        patientId: "anonymous"
    },
    {
        id: 5,
        nurseName: "Nurse Mukwevho",
        rating: 5,
        comment: "Very friendly and made me feel comfortable throughout the visit.",
        date: "2024-10-26",
        patientId: "anonymous"
    },
    {
        id: 6,
        nurseName: "Nurse Dhlomo",
        rating: 4,
        comment: "Professional service, but waiting area was crowded.",
        date: "2024-10-27",
        patientId: "anonymous"
    },
    {
        id: 7,
        nurseName: "Nurse Jackson",
        rating: 2,
        comment: "Seemed rushed and didn't explain medication properly.",
        date: "2024-10-24",
        patientId: "anonymous"
    },
    {
        id: 8,
        nurseName: "Nurse Mukwevho",
        rating: 5,
        comment: "Outstanding care and attention to detail. Highly recommended!",
        date: "2024-10-23",
        patientId: "anonymous"
    },
    {
        id: 9,
        nurseName: "Nurse Dhlomo",
        rating: 4,
        comment: "Good bedside manner and professional approach.",
        date: "2024-10-22",
        patientId: "anonymous"
    },
    {
        id: 10,
        nurseName: "Nurse Jackson",
        rating: 5,
        comment: "Went above and beyond to ensure I understood my treatment.",
        date: "2024-10-21",
        patientId: "anonymous"
    }
];

// Navigation functions
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.add('active');
    
    // Activate selected menu item
    event.currentTarget.classList.add('active');
    
    // Load data if needed
    if (sectionName === 'feedback') {
        loadFeedbackData();
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../index.html';
    }
}

// Feedback Management
function loadFeedbackData() {
    displayFeedbackResults(sampleFeedback);
    generateSummaryCharts(sampleFeedback);
}

function applyFilters() {
    const nurseFilter = document.getElementById('nurseFilter').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const ratingFilter = document.getElementById('ratingFilter').value;

    let filteredFeedback = sampleFeedback.filter(feedback => {
        let matches = true;
        
        if (nurseFilter && feedback.nurseName !== nurseFilter) {
            matches = false;
        }
        
        if (dateFrom && new Date(feedback.date) < new Date(dateFrom)) {
            matches = false;
        }
        
        if (dateTo && new Date(feedback.date) > new Date(dateTo)) {
            matches = false;
        }
        
        if (ratingFilter && feedback.rating.toString() !== ratingFilter) {
            matches = false;
        }
        
        return matches;
    });

    displayFeedbackResults(filteredFeedback);
    generateSummaryCharts(filteredFeedback);
}

function clearFilters() {
    document.getElementById('nurseFilter').value = '';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    document.getElementById('ratingFilter').value = '';
    
    displayFeedbackResults(sampleFeedback);
    generateSummaryCharts(sampleFeedback);
}

function displayFeedbackResults(feedbackArray) {
    const resultsContainer = document.getElementById('feedbackResults');
    
    if (feedbackArray.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No feedback found matching your filters</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = feedbackArray.map(feedback => `
        <div class="feedback-item">
            <div class="feedback-header">
                <span class="feedback-nurse">${feedback.nurseName}</span>
                <div>
                    <span class="feedback-rating">${'★'.repeat(feedback.rating)}${'☆'.repeat(5-feedback.rating)}</span>
                    <span class="feedback-date">${formatDate(feedback.date)}</span>
                </div>
            </div>
            <div class="feedback-comment">${feedback.comment}</div>
        </div>
    `).join('');
}

function generateSummaryCharts(feedbackArray) {
    const summaryContainer = document.getElementById('surveySummary');
    
    // Calculate statistics
    const totalFeedback = feedbackArray.length;
    const averageRating = totalFeedback > 0 ? 
        (feedbackArray.reduce((sum, item) => sum + item.rating, 0) / totalFeedback).toFixed(1) : 0;
    
    // Calculate rating distribution
    const ratingDistribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    feedbackArray.forEach(feedback => {
        ratingDistribution[feedback.rating]++;
    });
    
    // Calculate nurse performance
    const nurseRatings = {};
    feedbackArray.forEach(feedback => {
        if (!nurseRatings[feedback.nurseName]) {
            nurseRatings[feedback.nurseName] = { total: 0, count: 0, ratings: [] };
        }
        nurseRatings[feedback.nurseName].total += feedback.rating;
        nurseRatings[feedback.nurseName].count++;
        nurseRatings[feedback.nurseName].ratings.push(feedback.rating);
    });
    
    // Calculate average for each nurse
    Object.keys(nurseRatings).forEach(nurse => {
        nurseRatings[nurse].average = (nurseRatings[nurse].total / nurseRatings[nurse].count).toFixed(1);
    });
    
    // Generate summary HTML with visual charts
    summaryContainer.innerHTML = `
        <div class="summary-stats">
            <div class="stat-card">
                <div class="stat-value">${totalFeedback}</div>
                <div class="stat-label">Total Feedback</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${averageRating}</div>
                <div class="stat-label">Average Rating</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${Object.keys(nurseRatings).length}</div>
                <div class="stat-label">Nurses Rated</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${Math.max(...Object.values(ratingDistribution))}</div>
                <div class="stat-label">Most Common Rating</div>
            </div>
        </div>
        
        <div class="charts-container">
            <div class="summary-chart">
                <h4>Rating Distribution</h4>
                <div class="chart-container">
                    ${generateRatingBarChart(ratingDistribution)}
                </div>
            </div>
            
            <div class="summary-chart">
                <h4>Nurse Performance</h4>
                <div class="chart-container">
                    ${generateNursePerformanceChart(nurseRatings)}
                </div>
            </div>
        </div>
        
        <div class="detailed-stats">
            <h4>Detailed Statistics</h4>
            <div class="stats-grid">
                ${generateDetailedStats(ratingDistribution, nurseRatings)}
            </div>
        </div>
    `;
}

function generateRatingBarChart(ratingDistribution) {
    const maxCount = Math.max(...Object.values(ratingDistribution));
    const total = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);
    
    return `
        <div class="bar-chart">
            ${[5, 4, 3, 2, 1].map(rating => {
                const count = ratingDistribution[rating] || 0;
                const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                const barHeight = maxCount > 0 ? (count / maxCount) * 100 : 0;
                
                return `
                    <div class="bar-item">
                        <div class="bar-label">
                            <span class="stars">${'★'.repeat(rating)}${'☆'.repeat(5-rating)}</span>
                            <span class="count">${count}</span>
                        </div>
                        <div class="bar-track">
                            <div class="bar-fill" style="height: ${barHeight}%"></div>
                        </div>
                        <div class="bar-percentage">${percentage}%</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function generateNursePerformanceChart(nurseRatings) {
    const nurses = Object.keys(nurseRatings);
    const maxRating = 5;
    
    return `
        <div class="performance-chart">
            ${nurses.map(nurse => {
                const avgRating = nurseRatings[nurse].average;
                const percentage = (avgRating / maxRating) * 100;
                const count = nurseRatings[nurse].count;
                
                return `
                    <div class="performance-item">
                        <div class="nurse-name">${nurse}</div>
                        <div class="rating-bar">
                            <div class="rating-track">
                                <div class="rating-fill" style="width: ${percentage}%"></div>
                            </div>
                            <div class="rating-value">${avgRating}/5</div>
                        </div>
                        <div class="rating-count">(${count} reviews)</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function generateDetailedStats(ratingDistribution, nurseRatings) {
    const totalRatings = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);
    const positiveRatings = (ratingDistribution[4] || 0) + (ratingDistribution[5] || 0);
    const satisfactionRate = totalRatings > 0 ? ((positiveRatings / totalRatings) * 100).toFixed(1) : 0;
    
    // Find best performing nurse
    let bestNurse = { name: 'N/A', rating: 0 };
    Object.keys(nurseRatings).forEach(nurse => {
        if (nurseRatings[nurse].average > bestNurse.rating) {
            bestNurse = { name: nurse, rating: nurseRatings[nurse].average };
        }
    });
    
    return `
        <div class="stat-item">
            <i class="fas fa-smile"></i>
            <div>
                <strong>${satisfactionRate}%</strong>
                <span>Patient Satisfaction</span>
            </div>
        </div>
        <div class="stat-item">
            <i class="fas fa-trophy"></i>
            <div>
                <strong>${bestNurse.name}</strong>
                <span>Best Performing Nurse (${bestNurse.rating}/5)</span>
            </div>
        </div>
        <div class="stat-item">
            <i class="fas fa-star"></i>
            <div>
                <strong>${ratingDistribution[5] || 0}</strong>
                <span>5-Star Ratings</span>
            </div>
        </div>
        <div class="stat-item">
            <i class="fas fa-calendar"></i>
            <div>
                <strong>${getCurrentMonth()}</strong>
                <span>Current Period</span>
            </div>
        </div>
    `;
}

function getCurrentMonth() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const now = new Date();
    return months[now.getMonth()] + ' ' + now.getFullYear();
}

function generateSummary() {
    showNotification('Generating comprehensive survey summary...', 'info');
    setTimeout(() => {
        showNotification('Detailed survey summary generated successfully!', 'success');
    }, 1000);
}

function exportFeedbackPDF() {
    showNotification('Preparing feedback PDF export...', 'info');
    // Simple PDF generation using browser print (basic solution)
    setTimeout(() => {
        const feedbackContent = document.getElementById('feedbackResults').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>DUT Clinic - Feedback Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .feedback-item { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; }
                        .feedback-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
                        .feedback-nurse { font-weight: bold; color: #1e3c72; }
                        .feedback-rating { color: #ffc107; }
                        .feedback-date { color: #666; font-size: 0.9em; }
                        h1 { color: #1e3c72; }
                    </style>
                </head>
                <body>
                    <h1>DUT Clinic - Patient Feedback Report</h1>
                    <p>Generated on: ${new Date().toLocaleDateString()}</p>
                    <div>${feedbackContent}</div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        showNotification('Feedback PDF ready for printing!', 'success');
    }, 1500);
}

function exportSummaryPDF() {
    showNotification('Preparing summary report PDF...', 'info');
    // Simple PDF generation using browser print
    setTimeout(() => {
        const summaryContent = document.getElementById('surveySummary').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>DUT Clinic - Survey Summary Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .summary-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
                        .stat-card { border: 1px solid #1e3c72; padding: 15px; text-align: center; border-radius: 5px; }
                        .stat-value { font-size: 2em; font-weight: bold; color: #1e3c72; }
                        .bar-chart { display: flex; gap: 10px; align-items: end; height: 200px; margin: 20px 0; }
                        .bar-item { flex: 1; text-align: center; }
                        .bar-fill { background: #1e3c72; transition: height 0.3s ease; }
                        h1 { color: #1e3c72; }
                    </style>
                </head>
                <body>
                    <h1>DUT Clinic - Survey Summary Report</h1>
                    <p>Generated on: ${new Date().toLocaleDateString()}</p>
                    <div>${summaryContent}</div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        showNotification('Summary PDF ready for printing!', 'success');
    }, 1500);
}

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-ZA', options);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadFeedbackData();
});
// Sample patient data for analytics
const samplePatientData = [
    { id: 1, gender: 'Male', age: 20, patientType: 'Student', illness: 'Flu', visitDate: '2024-10-28', waitTime: 15 },
    { id: 2, gender: 'Female', age: 22, patientType: 'Student', illness: 'Headache', visitDate: '2024-10-29', waitTime: 20 },
    { id: 3, gender: 'Male', age: 25, patientType: 'Staff', illness: 'Back Pain', visitDate: '2024-10-30', waitTime: 25 },
    { id: 4, gender: 'Female', age: 19, patientType: 'Student', illness: 'Flu', visitDate: '2024-10-25', waitTime: 10 },
    { id: 5, gender: 'Male', age: 21, patientType: 'Student', illness: 'Stomach Issues', visitDate: '2024-10-26', waitTime: 30 },
    { id: 6, gender: 'Female', age: 35, patientType: 'Lecturer', illness: 'Migraine', visitDate: '2024-10-27', waitTime: 18 },
    { id: 7, gender: 'Male', age: 28, patientType: 'Staff', illness: 'Cold', visitDate: '2024-10-24', waitTime: 22 },
    { id: 8, gender: 'Female', age: 23, patientType: 'Student', illness: 'Anxiety', visitDate: '2024-10-23', waitTime: 35 },
    { id: 9, gender: 'Male', age: 26, patientType: 'Lecturer', illness: 'Back Pain', visitDate: '2024-10-22', waitTime: 28 },
    { id: 10, gender: 'Female', age: 20, patientType: 'Student', illness: 'Flu', visitDate: '2024-10-21', waitTime: 12 },
    { id: 11, gender: 'Male', age: 24, patientType: 'Student', illness: 'Sports Injury', visitDate: '2024-10-20', waitTime: 40 },
    { id: 12, gender: 'Female', age: 32, patientType: 'Staff', illness: 'Headache', visitDate: '2024-10-19', waitTime: 16 },
    { id: 13, gender: 'Male', age: 19, patientType: 'Student', illness: 'Cold', visitDate: '2024-10-18', waitTime: 14 },
    { id: 14, gender: 'Female', age: 21, patientType: 'Student', illness: 'Stomach Issues', visitDate: '2024-10-17', waitTime: 26 },
    { id: 15, gender: 'Male', age: 29, patientType: 'Lecturer', illness: 'Migraine', visitDate: '2024-10-16', waitTime: 32 }
];

// Common illnesses at DUT clinic
const commonIllnesses = [
    'Flu', 'Cold', 'Headache', 'Stomach Issues', 'Back Pain', 
    'Migraine', 'Anxiety', 'Sports Injury', 'Allergies', 'Skin Issues'
];

// Analytics functions
function loadAnalyticsData() {
    const dateFrom = document.getElementById('analyticsDateFrom').value;
    const dateTo = document.getElementById('analyticsDateTo').value;
    
    // Filter data by date range
    const filteredData = samplePatientData.filter(patient => {
        return patient.visitDate >= dateFrom && patient.visitDate <= dateTo;
    });
    
    updateAnalyticsMetrics(filteredData);
    generateGenderChart(filteredData);
    generateIllnessChart(filteredData);
    generatePatientTypeChart(filteredData);
    generateTrendChart(filteredData);
    generateAgeChart(filteredData);
    generateDetailedStats(filteredData);
}

function updateAnalyticsMetrics(data) {
    const totalPatients = data.length;
    const malePatients = data.filter(p => p.gender === 'Male').length;
    const femalePatients = data.filter(p => p.gender === 'Female').length;
    const studentVisits = data.filter(p => p.patientType === 'Student').length;
    const staffVisits = data.filter(p => p.patientType === 'Staff').length;
    const lecturerVisits = data.filter(p => p.patientType === 'Lecturer').length;
    const avgWaitTime = data.length > 0 ? 
        Math.round(data.reduce((sum, p) => sum + p.waitTime, 0) / data.length) : 0;
    
    document.getElementById('totalPatients').textContent = totalPatients;
    document.getElementById('malePatients').textContent = malePatients;
    document.getElementById('femalePatients').textContent = femalePatients;
    document.getElementById('studentVisits').textContent = studentVisits;
    document.getElementById('staffVisits').textContent = staffVisits + lecturerVisits;
    document.getElementById('avgWaitTime').textContent = avgWaitTime + 'min';
}

function generateGenderChart(data) {
    const maleCount = data.filter(p => p.gender === 'Male').length;
    const femaleCount = data.filter(p => p.gender === 'Female').length;
    const total = data.length;
    
    const malePercentage = total > 0 ? Math.round((maleCount / total) * 100) : 0;
    const femalePercentage = total > 0 ? Math.round((femaleCount / total) * 100) : 0;
    
    document.getElementById('genderChart').innerHTML = `
        <div class="pie-chart" style="background: conic-gradient(
            #4facfe 0% ${malePercentage}%,
            #ff6b6b ${malePercentage}% 100%
        );"></div>
        <div class="chart-legend">
            <div class="legend-item">
                <div class="legend-color" style="background: #4facfe;"></div>
                <span>Male: ${maleCount} (${malePercentage}%)</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #ff6b6b;"></div>
                <span>Female: ${femaleCount} (${femalePercentage}%)</span>
            </div>
        </div>
    `;
}

function generateIllnessChart(data) {
    const illnessCounts = {};
    commonIllnesses.forEach(illness => {
        illnessCounts[illness] = data.filter(p => p.illness === illness).length;
    });
    
    // Sort by count and take top 5
    const topIllnesses = Object.entries(illnessCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const maxCount = Math.max(...topIllnesses.map(i => i[1]));
    
    document.getElementById('illnessChart').innerHTML = `
        <div class="horizontal-bars">
            ${topIllnesses.map(([illness, count]) => {
                const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                return `
                    <div class="bar-row">
                        <div class="bar-label">${illness}</div>
                        <div class="bar-container">
                            <div class="bar-fill-horizontal" style="width: ${percentage}%; background: linear-gradient(90deg, #4facfe, #00f2fe);">
                                ${count}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function generatePatientTypeChart(data) {
    const typeCounts = {
        'Student': data.filter(p => p.patientType === 'Student').length,
        'Staff': data.filter(p => p.patientType === 'Staff').length,
        'Lecturer': data.filter(p => p.patientType === 'Lecturer').length
    };
    
    const total = data.length;
    const colors = ['#4facfe', '#00f2fe', '#ff6b6b'];
    
    document.getElementById('patientTypeChart').innerHTML = `
        <div class="pie-chart" style="background: conic-gradient(
            ${colors[0]} 0% ${(typeCounts.Student / total) * 100}%,
            ${colors[1]} ${(typeCounts.Student / total) * 100}% ${((typeCounts.Student + typeCounts.Staff) / total) * 100}%,
            ${colors[2]} ${((typeCounts.Student + typeCounts.Staff) / total) * 100}% 100%
        );"></div>
        <div class="chart-legend">
            ${Object.entries(typeCounts).map(([type, count], index) => `
                <div class="legend-item">
                    <div class="legend-color" style="background: ${colors[index]}"></div>
                    <span>${type}: ${count} (${Math.round((count / total) * 100)}%)</span>
                </div>
            `).join('')}
        </div>
    `;
}

function generateTrendChart(data) {
    // Group by week for trend analysis
    const weeklyData = {};
    data.forEach(patient => {
        const week = getWeekNumber(new Date(patient.visitDate));
        if (!weeklyData[week]) weeklyData[week] = 0;
        weeklyData[week]++;
    });
    
    const weeks = Object.keys(weeklyData).sort();
    const maxVisits = Math.max(...Object.values(weeklyData));
    
    document.getElementById('trendChart').innerHTML = `
        <div class="trend-chart">
            ${weeks.map(week => {
                const visits = weeklyData[week];
                const height = maxVisits > 0 ? (visits / maxVisits) * 100 : 0;
                return `
                    <div class="trend-bar" style="height: ${height}%">
                        <div class="trend-label">W${week}</div>
                    </div>
                `;
            }).join('')}
        </div>
        <div style="text-align: center; margin-top: 2rem; color: #6c757d;">
            Weekly Visit Trends (Last ${weeks.length} weeks)
        </div>
    `;
}

function generateAgeChart(data) {
    const ageGroups = {
        '18-21': data.filter(p => p.age >= 18 && p.age <= 21).length,
        '22-25': data.filter(p => p.age >= 22 && p.age <= 25).length,
        '26-30': data.filter(p => p.age >= 26 && p.age <= 30).length,
        '31+': data.filter(p => p.age >= 31).length
    };
    
    const maxCount = Math.max(...Object.values(ageGroups));
    
    document.getElementById('ageChart').innerHTML = `
        <div class="age-chart-container">
            ${Object.entries(ageGroups).map(([group, count]) => {
                const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                return `
                    <div class="age-group">
                        <div class="age-bar" style="height: ${height}px"></div>
                        <div class="age-label">${group}</div>
                        <div class="age-count">${count}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function generateDetailedStats(data) {
    const total = data.length;
    const mostCommonIllness = getMostCommonIllness(data);
    const avgAge = total > 0 ? Math.round(data.reduce((sum, p) => sum + p.age, 0) / total) : 0;
    const busiestDay = getBusiestDay(data);
    
    document.getElementById('detailedStats').innerHTML = `
        <div class="stat-item">
            <i class="fas fa-thermometer-half"></i>
            <div>
                <strong>${mostCommonIllness}</strong>
                <span>Most Common Illness</span>
            </div>
        </div>
        <div class="stat-item">
            <i class="fas fa-birthday-cake"></i>
            <div>
                <strong>${avgAge} yrs</strong>
                <span>Average Patient Age</span>
            </div>
        </div>
        <div class="stat-item">
            <i class="fas fa-calendar-day"></i>
            <div>
                <strong>${busiestDay}</strong>
                <span>Busiest Day</span>
            </div>
        </div>
        <div class="stat-item">
            <i class="fas fa-clock"></i>
            <div>
                <strong>${getPeakHour(data)}</strong>
                <span>Peak Visit Hour</span>
            </div>
        </div>
    `;
}

// Utility functions for analytics
function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getMostCommonIllness(data) {
    const illnessCounts = {};
    data.forEach(patient => {
        illnessCounts[patient.illness] = (illnessCounts[patient.illness] || 0) + 1;
    });
    return Object.entries(illnessCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
}

function getBusiestDay(data) {
    const dayCounts = {};
    data.forEach(patient => {
        const day = new Date(patient.visitDate).toLocaleDateString('en', { weekday: 'long' });
        dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    return Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
}

function getPeakHour(data) {
    // Simulate peak hours (in real app, this would come from actual visit times)
    const hours = ['8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'];
    return hours[Math.floor(Math.random() * hours.length)];
}

// Update navigation to load analytics data
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.add('active');
    
    // Activate selected menu item
    event.currentTarget.classList.add('active');
    
    // Load data if needed
    if (sectionName === 'feedback') {
        loadFeedbackData();
    } else if (sectionName === 'analytics') {
        loadAnalyticsData();
    }
}