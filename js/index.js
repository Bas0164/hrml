// ------------------Footer-------------------
function loadFooter() {
    fetch('pages/footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data)
        .catch(error => console.error('Error loading footer:', error));
}

// ------------------Logout-------------------
function setupLogoutButton() {
    document.getElementById('logoutBtn').addEventListener('click', function () {

        const clear = localStorage.clear();

        fetch('https://api-android-c020.onrender.com/api/logout', {
            method: 'POST',
            credentials: 'include' // Voer de uitlogactie uit
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Logout failed');
                }
                clear;
                window.location.href = 'pages/login.html'; // Redirect naar loginpagina na succesvol uitloggen
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    });
}

// Roep de functies aan wanneer het venster is geladen
window.onload = function () {
    loadFooter();
    setupLogoutButton();
};

