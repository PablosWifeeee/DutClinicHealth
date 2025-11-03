// Messaging page functionality
let currentConversation = 'dr-mkhize';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Messaging Page Initialized');
    loadConversations();
});

function loadConversations() {
    console.log('Loading conversations...');
    // In real app, this would fetch conversations from API
}

function searchConversations(query) {
    console.log('Searching conversations:', query);
    // In real app, this would filter conversations based on query
}

function selectConversation(conversationId) {
    currentConversation = conversationId;
    
    // Update active state
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    showNotification(`Loading conversation...`, 'info');
    
    // In real app, this would load conversation messages
    console.log('Selected conversation:', conversationId);
}

function composeMessage() {
    showNotification('Opening message composer...', 'info');
    setTimeout(() => {
        window.location.href = 'compose-message.html';
    }, 1000);
}

function startNewConversation() {
    showNotification('Starting new conversation...', 'info');
    // In real app, this would open contact selection
    console.log('New conversation');
}

function voiceCall() {
    showNotification('Initiating voice call...', 'info');
    // In real app, this would start voice call
    console.log('Voice call initiated');
}

function videoCall() {
    showNotification('Initiating video call...', 'info');
    // In real app, this would start video call
    console.log('Video call initiated');
}

function showConversationInfo() {
    showNotification('Showing conversation details...', 'info');
    // In real app, this would show conversation info modal
    console.log('Conversation info');
}

function attachFile() {
    showNotification('Opening file attachment...', 'info');
    // In real app, this would open file picker
    console.log('File attachment');
}

function insertTemplate() {
    showNotification('Opening message templates...', 'info');
    // In real app, this would show template selection
    console.log('Message templates');
}

function toggleEmoji() {
    showNotification('Opening emoji picker...', 'info');
    // In real app, this would toggle emoji picker
    console.log('Emoji picker');
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function sendMessage() {
    const messageInput = document.querySelector('.message-input textarea');
    const message = messageInput.value.trim();
    
    if (!message) {
        showNotification('Please enter a message', 'error');
        return;
    }
    
    // Add message to chat
    addMessageToChat(message, 'sent');
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Simulate reply
    setTimeout(() => {
        simulateReply();
    }, 2000);
    
    showNotification('Message sent!', 'success');
}

function addMessageToChat(message, type) {
    const chatMessages = document.querySelector('.chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    if (type === 'sent') {
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${timestamp}</span>
            </div>
            <div class="message-avatar">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=4facfe&color=fff" alt="You">
            </div>
        `;
    } else {
        messageElement.innerHTML = `
            <div class="message-avatar">
                <img src="https://ui-avatars.com/api/?name=Dr+Mkhize&background=667eea&color=fff" alt="Dr. Mkhize">
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${timestamp}</span>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function simulateReply() {
    const replies = [
        "Thanks for your message. I'll review this and get back to you shortly.",
        "I understand your concern. Let me check your records and provide more information.",
        "That's a good question. I recommend we discuss this in your next appointment.",
        "I've updated your prescription as requested. You can collect it from the pharmacy.",
        "Your test results look good. Continue with your current treatment plan."
    ];
    
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    addMessageToChat(randomReply, 'received');
}
