const users = [
    { id: 1, name: "John Doe", documents: ["Form A", "Form B"] },
    { id: 2, name: "Jane Smith", documents: ["Form C", "Form D"] },
    { id: 3, name: "Alice Johnson", documents: ["Form E"] },
];

document.getElementById('add-user-btn').addEventListener('click', addUser);
const userSelect = document.getElementById('user-select');

function addUser() {
    const username = document.getElementById('new-user-name').value;
    const password = document.getElementById('new-user-password').value;

    if (username && password) {
        const newUser = { id: users.length + 1, name: username, documents: [] };
        users.push(newUser);
        populateUserSelect();
        document.getElementById('new-user-name').value = '';
        document.getElementById('new-user-password').value = '';
    } else {
        alert("Please fill in all fields.");
    }
}

function populateUserSelect() {
    userSelect.innerHTML = '<option value="">--Select a user--</option>';
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}

function displayUserDocs() {
    const selectedUserId = userSelect.value;
    const userDocsList = document.getElementById('user-docs-list');
    userDocsList.innerHTML = '';

    if (selectedUserId) {
        const user = users.find(u => u.id == selectedUserId);
        user.documents.forEach(doc => {
            const li = document.createElement('li');
            li.textContent = doc;
            userDocsList.appendChild(li);
        });
    }
}

// Filter users based on input
function filterUsers() {
    const searchInput = document.getElementById('search-user').value.toLowerCase();
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput));
    userSelect.innerHTML = '<option value="">--Select a user--</option>';
    filteredUsers.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}

// Filter documents based on input
function filterDocuments() {
    const searchInput = document.getElementById('search-doc').value.toLowerCase();
    const userDocsList = document.getElementById('user-docs-list').children;

    for (let li of userDocsList) {
        if (li.textContent.toLowerCase().includes(searchInput)) {
            li.style.display = '';
        } else {
            li.style.display = 'none';
        }
    }
}

// Initialize user select on page load
window.onload = populateUserSelect;
