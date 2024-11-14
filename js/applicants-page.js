// Deze functie wordt uitgevoerd wanneer de pagina volledig geladen is
window.onload = function () {
    // Ophalen van de footer-inhoud en invoegen in de pagina
    fetch('./footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);
    fetchVacancyTitle();
    fetchApplicants();
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
// Verkrijg het vacature ID uit de URL
const urlParams = new URLSearchParams(window.location.search);
const vacatureId = urlParams.get('vacatureId');

// Functie om de titel van de vacature op te halen en weer te geven
async function fetchVacancyTitle() {
    if (!vacatureId) {
        // Als geen vacature ID is opgegeven, toon een foutmelding
        document.getElementById('vacancyTitle').textContent = 'Vacature ID ontbreekt in de URL';
        return;
    }

    try {
        // Ophalen van de vacaturegegevens via de API
        const response = await fetch(`https://api-android-c020.onrender.com/api/vacancies/${vacatureId}`);
        if (!response.ok) {
            throw new Error('Vacature niet gevonden');
        }

        // Vacaturegegevens verwerken
        const vacancy = await response.json();


        // De vacaturetitel weergeven
        document.getElementById('vacancyTitle').textContent = `Sollicitanten voor ${vacancy.vacancieTitel || 'Vacature'}`;
    } catch (error) {
        console.error('Error fetching vacancy details:', error);
        // Foutmelding als het ophalen van vacaturegegevens mislukt
        document.getElementById('vacancyTitle').textContent = 'Er is een fout opgetreden bij het ophalen van de vacaturetitel';
    }
}

// Functie om sollicitanten voor de opgegeven vacature op te halen
async function fetchApplicants() {
    try {
        // Ophalen van sollicitanten via de API
        const response = await fetch(`https://api-android-c020.onrender.com/api/vacancy-applicants/${vacatureId}`);
        const candidates = await response.json();
        const candidatesTable = document.getElementById('candidatesTable');
        candidatesTable.innerHTML = ''; // Tabel leegmaken voor nieuwe data

        if (candidates.length > 0) {
            // Als sollicitanten gevonden zijn, voor elke sollicitant een rij toevoegen aan de tabel
            candidates.forEach(candidate => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${candidate.user.username}</td>
                    <td>${candidate.status}</td>
                    <td>${candidate.feedback || 'Geen feedback'}</td>
                    <td>${candidate.matchPercentage}%</td>
                    <td><a href="resumedetail.html?cvId=${encodeURIComponent(candidate._id)}" class="btn btn-info btn-sm">Details</a></td>
                `;
                candidatesTable.appendChild(row);
            });
        } else {
            // Als geen sollicitanten gevonden zijn, toon dit bericht
            candidatesTable.innerHTML = '<tr><td colspan="4">Geen sollicitanten gevonden voor deze vacature.</td></tr>';
        }
    } catch (error) {
        console.error('Error fetching candidates:', error);
        // Foutmelding als het ophalen van sollicitanten mislukt
        document.getElementById('candidatesTable').innerHTML = '<tr><td colspan="4">Er is een fout opgetreden bij het ophalen van sollicitanten.</td></tr>';
    }
}