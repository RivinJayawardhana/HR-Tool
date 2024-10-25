document.addEventListener("DOMContentLoaded", function() {
    const users = [
        { id: 1, name: "User A", submitted: ["Form A1", "Form A2"], pending: ["Form A3"] },
        { id: 2, name: "User B", submitted: ["Form B1"], pending: [] },
        { id: 3, name: "User C", submitted: ["Form C1", "Form C2"], pending: ["Form C3"] }
    ];

    const userSelect = document.getElementById('user-select');
    const submittedList = document.getElementById('submitted-docs');
    const pendingList = document.getElementById('pending-docs');

    // Populate the user selection dropdown
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });

    userSelect.addEventListener('change', function() {
        const selectedUserId = parseInt(this.value);
        const selectedUser = users.find(user => user.id === selectedUserId);

        // Clear previous lists
        submittedList.innerHTML = '';
        pendingList.innerHTML = '';

        if (selectedUser) {
            selectedUser.submitted.forEach(doc => {
                const li = document.createElement('li');
                li.textContent = doc;
                submittedList.appendChild(li);
            });

            selectedUser.pending.forEach(doc => {
                const li = document.createElement('li');
                li.textContent = doc;
                pendingList.appendChild(li);
            });
        }
    });
});
