const users = [
    {
        id: 1,
        name: "User 1",
        forms: {
            "Form A - submitted": { status: "submitted", content: "This is the content of Form A submitted by John Doe." },
            "Form B - pending": { status: "pending", content: "" },
            "Form C - submitted": { status: "submitted", content: "This is the content of Form C submitted by John Doe." }
        }
    },
    {
        id: 2,
        name: "User 2",
        forms: {
            "Form A - pending ": { status: "pending", content: "" },
            "Form B - submitted": { status: "submitted", content: "This is the content of Form B submitted by Jane Smith." },
            "Form C - pending": { status: "pending", content: "" }
        }
    },
    {
        id: 3,
        name: "User 3",
        forms: {
            "Form A - submitted ": { status: "submitted", content: "This is the content of Form A submitted by Alice Johnson." },
            "Form B - submitted": { status: "submitted", content: "This is the content of Form B submitted by Alice Johnson." },
            "Form C - pending": { status: "pending", content: "" }
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
        for (const [formName, details] of Object.entries(user.forms)) {
            const formDiv = document.createElement('div');
            const formHeading = document.createElement('h3');
            formHeading.textContent = formName;

            if (details.status === "submitted") {
                formHeading.classList.add("submitted");
                const downloadLink = document.createElement('button')
                const edit = document.createElement('button')
                const delet = document.createElement('button');
                edit.textContent = "Delete";
                delet.textContent = "Edit";
                downloadLink.textContent = "Download PDF";
                downloadLink.onclick = () => downloadPDF(formName, details.content);
                formDiv.appendChild(formHeading);
                formDiv.appendChild(downloadLink);
                formDiv.appendChild(edit);
                formDiv.appendChild(delet);
            } else {
                formHeading.classList.add("pending");
                formDiv.appendChild(formHeading);
            }

            formStatus.appendChild(formDiv);
        }
    }
}

// Function to download PDF
function downloadPDF(formName, content) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save(`${formName}.pdf`);
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
