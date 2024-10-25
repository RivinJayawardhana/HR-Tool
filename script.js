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
        const newUser = { username, password, role: 'user' };
        users.push(newUser);
        document.getElementById('new-user-name').value = '';
        document.getElementById('new-user-password').value = '';
        updateUserList();
    } else {
        alert('Please enter both username and password');
    }
});

function updateUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.username;
        userList.appendChild(li);
    });
}

// User submission form
document.getElementById('submission-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const documentName = document.getElementById('document-name').value.trim();
    const documentDetails = document.getElementById('document-details').value.trim();

    if (documentName && documentDetails) {
        const li = document.createElement('li');
        li.textContent = `${documentName}: ${documentDetails}`;
        document.getElementById('submitted-docs').appendChild(li);
        document.getElementById('document-name').value = '';
        document.getElementById('document-details').value = '';
    } else {
        alert('Please fill out all fields');
    }
});
