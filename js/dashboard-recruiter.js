window.onload = function () {
    // Laad de footer door de HTML van 'footer.html' in te voegen
    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);

    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    console.log('userId from localStorage:', userId);
    console.log('role from localStorage:', role);

    if (!userId || !role) {
        console.error('UserId or role is missing. Redirecting to login page.');
        window.location.href = 'login.html';
        return;
    }
    // Controleer de sessie en rol van de gebruiker
    fetch('https://api-android-c020.onrender.com/api/user-info?userId=' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Zorg ervoor dat credentials worden doorgegeven
        body: JSON.stringify({
            userId: userId,
            role: role
        })
    })
        .then(response => {
            console.log(response);
            if (response.status === 401) {
                window.location.href = 'login.html'; // Gebruiker is niet ingelogd, stuur naar loginpagina
            }
            return response.json();
        })
        .then(data => {
            console.log('Data from server:', data);

            if (data && data.role) {
                if (data.role === 1) {
                    window.location.href = 'dashboard-applicant.html'; // Stuur de gebruiker door naar het applicant dashboard
                } else if (data.role !== 2) {
                    window.location.href = 'login.html'; // Gebruiker heeft geen toegang, stuur naar loginpagina
                }
            }
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            window.location.href = 'login.html'; // Fout bij het ophalen van gebruikersinformatie, stuur naar loginpagina
        });
};

// Fetch en laad recente sollicitaties
fetch('https://api-android-c020.onrender.com/api/cvs')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('recent-applications');
        data.forEach(cv => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                   <a href="resumedetail.html?cvId=${cv._id}">
                <strong>${cv.user.username}</strong> - Status: <strong>${cv.status}</strong>
            </a>
                `;
            container.appendChild(listItem);
        });
    });
const userId = localStorage.getItem('userId');
const role = localStorage.getItem('role');
fetch('https://api-android-c020.onrender.com/api/user-details?userId=' + userId, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include', // Zorg ervoor dat credentials worden doorgegeven
    body: JSON.stringify({
        userId: userId,
        role: role
    })
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Foutmelding bij een fout in de response
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log de data om de structuur te bekijken
        // Zet de gebruikersnaam in de welkomsttekst


        const name = data.personName;
        document.getElementById('username').innerText = name || '[Recruiter Naam]'; // Gebruik data.personName of de placeholder
        document.getElementById('email').innerText = data.email || '[recruiter@example.com]';
        document.getElementById('adress').innerText = data.address || '[adres]'; // Corrected naar 'address'
        document.getElementById('gender').innerText = data.gender || '[Geslacht]';
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });

// Fetch en laad vacatures
fetch('https://api-android-c020.onrender.com/api/vacancies')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Foutmelding bij netwerkfout
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('vacancies-container');
        // Wis eventueel bestaande inhoud in de container
        container.innerHTML = '';

        // Controleer of er vacatures zijn
        if (data.length === 0) {
            container.innerHTML = '<p>Geen vacatures beschikbaar.</p>'; // Bericht bij geen vacatures
            return;
        }

        // Loop door elke vacature en maak elementen aan
        data.forEach(vacancy => {
            const vacancyCard = document.createElement('div');
            vacancyCard.className = 'vacancy-card'; // Je kunt deze klasse stylen in CSS

            // Maak de afbeeldingbron van Base64
            const imageSrc = `https://api-android-c020.onrender.com/${vacancy.vacanciePicture}`;

            vacancyCard.innerHTML = `
                    <div style="display: flex; align-items: center;">
            <div style="flex: 1;">
                <h6><strong>${vacancy.vacancieTitel}</strong></h6>
                <p><strong>Omschrijving:</strong> ${vacancy.vacancieText}</p>
                <p><strong>Vereiste vaardigheden:</strong> ${vacancy.skills}</p>
                <div class="btn-group d-flex justify-content-between" role="group" aria-label="Vacancy Actions">
                    <a href="vacancydetail.html?vacancyId=${vacancy._id}" class="btn btn-primary mr-3">Bekijk</a>
                    <a href="editvacancy.html?vacancyId=${vacancy._id}" class="btn btn-primary mr-3">Bewerk</a>
                                <button class="btn btn-primary btn-sm delete-vacancy mr-3" data-id="${vacancy._id}">Verwijderen</button>
                    <a href="applicants-page.html?vacatureId=${vacancy._id}" class="btn btn-primary">Sollicitanten</a>
                </div>
            </div>
            <div style="flex: 0 0 150px; margin-left: 20px;">                                                                                                                                                                                                                                                                                                                    <img src="${imageSrc}" alt="${vacancy.vacancieTitel}" style="width: 100%; height: auto; border-radius: 5px;" />
            </div>
        </div>
                `;

            // Voeg de vacature toe aan de container
            container.appendChild(vacancyCard);
        });

        // Voeg een event listener toe voor het verwijderen van vacatures
        document.querySelectorAll('.delete-vacancy').forEach(button => {
            button.addEventListener('click', function () {
                const vacancyId = this.dataset.id;
                console.log(`Attempting to delete vacancy with ID: ${vacancyId}`);

                fetch(`https://api-android-c020.onrender.com/api/vacancies/${vacancyId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                    .then(response => {
                        console.log(`Delete response status: ${response.status}`);
                        if (!response.ok) {
                            throw new Error('Failed to delete vacancy');
                        }
                        // Verwijder de vacaturekaart uit de DOM na succesvol verwijderen
                        this.closest('.vacancy-card').remove();
                        console.log(`Vacancy with ID: ${vacancyId} successfully deleted`);
                    })
                    .catch(error => {
                        console.error('Error deleting vacancy:', error);
                    });
            });
        });
    })
    .catch(error => {
        console.error('Error fetching vacancies:', error);
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