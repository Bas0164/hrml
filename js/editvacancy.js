// Dit script wordt uitgevoerd zodra de pagina is geladen
window.onload = function () {
    // Haal de footer op via een externe HTML-bestand
    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);

    // Haal de vacancyId op uit de URL
    const urlParams = new URLSearchParams(window.location.search);
    const vacancyId = urlParams.get('vacancyId');

    // Haal de vacaturedetails op van de server met de bijbehorende vacancyId
    fetch(`https://api-android-c020.onrender.com/api/vacancies/${vacancyId}`, {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(vacancy => {
            // Vul de velden op de pagina met de gegevens van de vacature
            document.getElementById('vacancyTitle').innerText = vacancy.vacancieTitel;
            document.getElementById('vacancyText').innerText = vacancy.vacancieText;
            document.getElementById('vacancyImage').src = `https://api-android-c020.onrender.com/${vacancy.vacanciePicture}`;
            document.getElementById('vacancyTitleInput').value = vacancy.vacancieTitel;
            document.getElementById('vacancyTextInput').value = vacancy.vacancieText;
            document.getElementById('skillsInput').value = vacancy.skills;
        })
        .catch(error => {
            // Toon foutmelding als de vacature niet kan worden opgehaald
            console.error('Error fetching vacancy details:', error);
        });
}

// Dit script zorgt voor het verwerken van het formulier om de vacature te bewerken
document.getElementById('editVacancyForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Voorkom standaard formulier gedrag

    const formData = new FormData(this); // Verkrijg de gegevens uit het formulier
    const vacancyId = new URLSearchParams(window.location.search).get('vacancyId');
    const response = await fetch(`https://api-android-c020.onrender.com/api/update-vacancy/${vacancyId}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include'
    });

    const result = await response.json();
    const responseMessage = document.getElementById('responseMessage');
    if (response.ok) {
        // Toon succesbericht en navigeer naar het dashboard
        responseMessage.innerText = 'Vacature succesvol bijgewerkt!';
        responseMessage.classList.add('text-success');
        setTimeout(() => {
            window.location.href = 'dashboard-recruiter.html'; // Navigeer naar het recruiter dashboard
        }, 2000);
    } else {
        // Toon foutmelding als het bewerken mislukt
        responseMessage.innerText = result.error || 'Er is een fout opgetreden tijdens het bijwerken van de vacature.';
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