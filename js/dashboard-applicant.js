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
    // Controleer de sessie en rol van de gebruiker om toegang te verifiëren
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
            if (response.status === 401) {
                window.location.href = 'login.html'; // Gebruiker is niet ingelogd, stuur naar loginpagina
            }
            return response.json();
        })
        .then(data => {
            if (data && data.role) {
                if (data.role === 2) {
                    window.location.href = 'dashboard-applicant.html'; // Verwijs gebruiker naar dashboard van sollicitant
                } else if (data.role !== 1) {
                    window.location.href = 'login.html'; // Gebruiker heeft geen toegang, stuur naar loginpagina
                }
            }
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            window.location.href = 'login.html'; // Fout bij ophalen gebruikersinformatie, stuur naar loginpagina
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data); // Footer dynamisch laden

    // Haal gebruikersinformatie op en toon gebruikersnaam
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
        .then(response => response.json())
        .then(data => {
            const name = data.personName; // Zet de naam van de gebruiker
            document.getElementById('username').innerText = name;

            const userId = localStorage.getItem('userId');

            // Haal sollicitaties op voor de ingelogde gebruiker
            fetch(`https://api-android-c020.onrender.com/api/user-cvs-web`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Zorg ervoor dat credentials worden doorgegeven
                body: JSON.stringify({
                    userId: userId,
                })
            })
                .then(response => response.json())
                .then(applications => {
                    const applicationsDiv = document.getElementById('applications');
                    applicationsDiv.innerHTML = ''; // Maak de lijst leeg voor nieuwe data

                    if (applications.length === 0) {
                        applicationsDiv.innerHTML = '<p>Geen sollicitaties gevonden.</p>'; // Toon bericht als er geen sollicitaties zijn
                    } else {
                        applications.forEach(application => {
                            const applicationElement = document.createElement('tr');
                            applicationElement.className = 'application';

                            // Voeg sollicitatiegegevens toe in de tabel
                            applicationElement.innerHTML = `
            <td><a href="vacancydetail.html?vacancyId=${application.vacancyInfo._id}">${application.vacancyInfo.vacancieTitel || 'Titel niet gevonden'}</a></td>
            <td>${application.feedback}</td>
            <td>Status: ${application.status}</td>
        `;
                            applicationsDiv.appendChild(applicationElement); // Voeg de sollicitatie toe aan de tabel
                        });
                    }
                })
                .catch(error => console.error('Error fetching applications:', error));

            // Haal aanbevolen vacatures op met een limiet van 5
            fetch('https://api-android-c020.onrender.com/api/profilevacancies?limit=5', {
                credentials: 'include'
            })
                .then(response => response.json())
                .then(vacancies => {
                    const recommendedJobsDiv = document.getElementById('recommendedJobs');
                    recommendedJobsDiv.innerHTML = ''; // Maak de lijst leeg voor nieuwe data

                    if (vacancies.length === 0) {
                        recommendedJobsDiv.innerHTML = '<p>Geen aanbevolen vacatures gevonden.</p>'; // Toon bericht als er geen aanbevolen vacatures zijn
                    } else {
                        vacancies.forEach(vacancy => {
                            const vacancyElement = document.createElement('div');
                            vacancyElement.className = 'vacancy';
                            vacancyElement.innerHTML = `
                        <a href="vacancydetail.html?vacancyId=${vacancy._id}">${vacancy.vacancieTitel}</a>
                    `;
                            recommendedJobsDiv.appendChild(vacancyElement); // Voeg aanbevolen vacatures toe aan de lijst
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching applications:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });
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