const users = []; // Store users in memory for demo purposes

// Handle login
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        if (user.role === 'admin') {
            window.location.href = 'admin.html'; // Redirect to admin dashboard
        } else {
            window.location.href = 'user.html'; // Redirect to user dashboard
        }
    } else {
        document.getElementById('error-message').textContent = 'Invalid credentials';
    }
});

// Admin functionality
document.getElementById('add-user-btn')?.addEventListener('click', function() {
    const username = document.getElementById('new-user-name').value.trim();
    const password = document.getElementById('new-user-password').value.trim();
    
    if (username && password) {
        const newUser = { username, password, role: 'user', documents: [] };
        users.push(newUser);
        document.getElementById('new-user-name').value = '';
        document.getElementById('new-user-password').value = '';
        updateUserSelect();
    } else {
        alert('Please enter both username and password');
    }
});

function updateUserSelect() {
    const userSelect = document.getElementById('user-select');
    userSelect.innerHTML = '<option value="">--Select a user--</option>'; // Reset dropdown
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.username;
        option.textContent = user.username;
        userSelect.appendChild(option);
    });
}

// Handle user selection to display their submitted documents
document.getElementById('user-select')?.addEventListener('change', function() {
    const selectedUsername = this.value;
    const userDocsList = document.getElementById('user-docs-list');
    userDocsList.innerHTML = ''; // Clear previous documents

    const selectedUser = users.find(user => user.username === selectedUsername);
    if (selectedUser) {
        selectedUser.documents.forEach(doc => {
            const li = document.createElement('li');
            li.textContent = doc;
            userDocsList.appendChild(li);
        });
    }
});

// User submission form
document.getElementById('submission-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const documentName = document.getElementById('document-name').value.trim();
    const documentDetails = document.getElementById('document-details').value.trim();
    
    // Simulate the logged-in user (in a real application, you would use session management)
    const currentUser = users.find(user => user.username === 'currentUser'); // Replace with actual logic
    if (currentUser) {
        currentUser.documents.push(`${documentName}: ${documentDetails}`);
        document.getElementById('document-name').value = '';
        document.getElementById('document-details').value = '';
    }
});
