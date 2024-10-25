const formSteps = [
    { name: 'Form A', details: '', pdf: null, status: 'Pending' },
    { name: 'Form B', details: '', pdf: null, status: 'Pending' },
    { name: 'Form C', details: '', pdf: null, status: 'Pending' },
    { name: 'Form D', details: '', pdf: null, status: 'Pending' },
    { name: 'Form E', details: '', pdf: null, status: 'Pending' },
];

let currentStep = 0;

window.onload = function() {
    displayCurrentForm();
};

// Display the current form based on the currentStep
function displayCurrentForm() {
    const formSection = document.getElementById('submission-form');
    formSection.querySelector('#document-name').value = formSteps[currentStep].name;
    formSection.querySelector('#document-details').value = formSteps[currentStep].details;
    updateSubmittedDocs(); // Update the document list every time the form is displayed
    document.getElementById('current-form-name').textContent = `Fill Out ${formSteps[currentStep].name}`; // Update form title
    updateArrowColors(); // Update arrow colors
}

// Update the displayed submitted documents
function updateSubmittedDocs() {
    const submittedDocsList = document.getElementById('submitted-docs');
    submittedDocsList.innerHTML = ''; // Clear previous submissions

    // Display submitted documents first
    formSteps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = `${step.name}: ${step.status}`;
        li.style.color = step.status === 'Submitted' ? 'green' : 'red'; // Color based on status
        submittedDocsList.appendChild(li);
    });
}

// Update arrow colors based on the step status
function updateArrowColors() {
    for (let i = 1; i <= formSteps.length; i++) {
        const arrow = document.getElementById(`arrow-${i}`);
        if (i <= currentStep + 1) {
            arrow.style.color = 'green'; // Change to green for completed steps
        } else {
            arrow.style.color = 'red'; // Change to red for pending steps
        }
    }
}

// Handle form submission
document.getElementById('submission-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const details = document.getElementById('document-details').value;
    const pdfFile = document.getElementById('document-upload').files[0];

    // Store the details and PDF file
    formSteps[currentStep].details = details;
    formSteps[currentStep].pdf = pdfFile;
    formSteps[currentStep].status = 'Submitted'; // Update status to Submitted

    // Move to the next form
    currentStep++;
    if (currentStep < formSteps.length) {
        displayCurrentForm();
    } else {
        alert('All forms submitted!');
        console.log(formSteps);
    }

    // Clear input fields
    document.getElementById('document-name').value = '';
    document.getElementById('document-details').value = '';
    document.getElementById('additional-info-1').value = '';
    document.getElementById('additional-info-2').value = '';
    document.getElementById('document-upload').value = '';
    updateSubmittedDocs(); // Update the submitted documents list
});
