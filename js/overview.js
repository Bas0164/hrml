window.onload = function () {
    const vacancyId = localStorage.getItem('vacatureId');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    console.log('Ingelogd als gebruiker met ID:', userId, 'en rol:', role);

    // Haal de vacatures op via een API-aanroep
    fetch('https://api-android-c020.onrender.com/api/vacancies')
        .then(response => response.json()) // Verwerk de reactie als JSON
        .then(data => {
            const container = document.getElementById('vacancies-container');
            // Voor elke vacature, maak een nieuwe kaart en voeg deze toe aan de container
            data.forEach(vacancy => {
                const card = document.createElement('div');
                card.className = 'col-10 overview-card mb-5 animate__animated animate__fadeInUp';
                card.innerHTML = `
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h5 class="overview-card-title animate__animated animate__fadeInLeft">${vacancy.vacancieTitel}</h5>
                            <a href="vacancydetail.html?vacancyId=${vacancy._id}" class="overview-btn btn-primary">Bekijk Details</a>
                        </div>
                        <p class="card-text mt-3 animate__animated animate__fadeInUp">${vacancy.vacancieText}</p>
                    </div>
                `;
                container.appendChild(card); // Voeg de nieuwe vacaturekaart toe aan de pagina
            });
        })
        .catch(error => {
            console.error('Fout bij het ophalen van vacatures:', error);
        });

    // Laad de footer door de HTML van 'footer.html' in te voegen
    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);
}

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