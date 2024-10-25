document.addEventListener("DOMContentLoaded", function() {
    const submittedDocs = [
        "Form A - Submitted",
        "Form B - Submitted",
        "Form C - Submitted"
    ];

    const pendingDocs = [
        "Form D - Pending",
        "Form E - Pending"
    ];

    const submittedList = document.getElementById('submitted-docs');
    const pendingList = document.getElementById('pending-docs');

    submittedDocs.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = doc;
        submittedList.appendChild(li);
    });

    pendingDocs.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = doc;
        pendingList.appendChild(li);
    });
});
