window.onload = function () {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);
}

// Voeg een vacature toe wanneer het formulier wordt ingediend
document.getElementById('addVacancyForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Voorkom standaard formulier gedrag

    const formData = new FormData(this);
    const response = await fetch('https://api-android-c020.onrender.com/api/create-vacancy', {
        method: 'POST',
        body: formData,
        credentials: 'include'
    });

    const result = await response.json();
    const responseMessage = document.getElementById('responseMessage');
    if (response.ok) {
        responseMessage.innerText = 'Vacature succesvol toegevoegd!';
        responseMessage.classList.add('text-success');
        setTimeout(() => {
            window.location.href = 'dashboard-recruiter.html'; // Navigeer naar het recruiter dashboard
        }, 2000);
    } else {
        responseMessage.innerText = result.error || 'Er is een fout opgetreden tijdens het toevoegen van de vacature.';
        responseMessage.classList.add('text-danger');
    }
});

// Voeg logout-functionaliteit toe
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
            window.location.href = 'login.html'; // Redirect naar loginpagina na succesvol uitloggen
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
});
