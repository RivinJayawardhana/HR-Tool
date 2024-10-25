const users = [
    {
        id: 1,
        name: "John Doe",
        forms: {
            "Form A": "submitted",
            "Form B": "pending",
            "Form C": "submitted"
        }
    },
    {
        id: 2,
        name: "Jane Smith",
        forms: {
            "Form A": "pending",
            "Form B": "submitted",
            "Form C": "pending"
        }
    },
    {
        id: 3,
        name: "Alice Johnson",
        forms: {
            "Form A": "submitted",
            "Form B": "submitted",
            "Form C": "pending"
        }
    },
];

const userSelect = document.getElementById('user-select');

function populateUserSelect() {
    userSelect.innerHTML = '<option value="">--Select a user--</option>';
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}

function displayUserForms() {
    const selectedUserId = userSelect.value;
    const formStatus = document.getElementById('form-status');
    formStatus.innerHTML = '';

    if (selectedUserId) {
        const user = users.find(u => u.id == selectedUserId);
        for (const [formName, status] of Object.entries(user.forms)) {
            const formHeading = document.createElement('h3');
            formHeading.textContent = formName;

            if (status === "submitted") {
                formHeading.classList.add("submitted");
            } else {
                formHeading.classList.add("pending");
            }

            formStatus.appendChild(formHeading);
        }
    }
}

// Initialize user select on page load
window.onload = populateUserSelect;

// Sidebar navigation functions
function showAddUser() {
    alert("Add User functionality not implemented in this example.");
}

function showUserDocs() {
    alert("View User Documents functionality not implemented in this example.");
}
