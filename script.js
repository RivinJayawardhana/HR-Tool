const users = [
    { 
        username: 'user1', 
        password: 'pass1', 
        role: 'user', 
        documents: { A: 'Submitted', B: 'Pending', C: 'Submitted', D: 'Pending', E: 'Submitted' }
    },
    { 
        username: 'user2', 
        password: 'pass2', 
        role: 'user', 
        documents: { A: 'Pending', B: 'Pending', C: 'Submitted', D: 'Pending', E: 'Pending' }
    },
    { 
        username: 'user3', 
        password: 'pass3', 
        role: 'user', 
        documents: { A: 'Submitted', B: 'Submitted', C: 'Pending', D: 'Pending', E: 'Submitted' }
    },
    { 
        username: 'admin', 
        password: 'adminpass', 
        role: 'admin', 
        documents: {} 
    }
];

// Populate user selection on page load
window.onload = function() {
    updateUserSelect();
};

// Admin functionality for adding users
document.getElementById('add-user-btn')?.addEventListener('click', function() {
    const username = document.getElementById('new-user-name').value.trim();
    const password = document.getElementById('new-user-password').value.trim();
    
    if (username && password) {
        const newUser = { username, password, role: 'user', documents: { A: 'Pending', B: 'Pending', C: 'Pending', D: 'Pending', E: 'Pending' } };
        users.push(newUser);
        document.getElementById('new-user-name').value = '';
        document.getElementById('new-user-password').value = '';
        updateUserSelect();
    } else {
        alert('Please enter both username and password');
    }
});

// Update user selection dropdown
function updateUserSelect() {
    const userSelect = document.getElementById('user-select');
    userSelect.innerHTML = '<option value="">--Select a user--</option>'; // Reset dropdown
    users.forEach(user => {
        if (user.role === 'user') {
            const option = document.createElement('option');
            option.value = user.username;
            option.textContent = user.username;
            userSelect.appendChild(option);
        }
    });
}

// Handle user selection to display their submitted documents
document.getElementById('user-select')?.addEventListener('change', function() {
    const selectedUsername = this.value;
    const userDocsList = document.getElementById('user-docs-list');
    userDocsList.innerHTML = ''; // Clear previous documents

    const selectedUser = users.find(user => user.username === selectedUsername);
    if (selectedUser) {
        for (const [form, status] of Object.entries(selectedUser.documents)) {
            const li = document.createElement('li');
            li.textContent = `Form ${form}: ${status}`;
            if (status === 'Submitted') {
                li.style.cursor = 'pointer';
                li.onclick = () => generatePDF(selectedUser.username, form); // Add click event for PDF generation
            }
            userDocsList.appendChild(li);
        }
    }
});

// Generate PDF for the submitted document
function generatePDF(username, form) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add content to PDF
    doc.text(`User: ${username}`, 10, 10);
    doc.text(`Document: Form ${form}`, 10, 20);
    doc.text('Status: Submitted', 10, 30);

    // Save the PDF
    doc.save(`${username}_Form_${form}.pdf`);
}
