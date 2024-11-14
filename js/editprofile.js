// Deze functie wordt uitgevoerd zodra de pagina volledig is geladen
window.onload = function () {
    // Haal de footer op en voeg deze toe aan de pagina
    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);

    const userId = localStorage.getItem('userId');
    console.log('Editing profile for user with ID:', userId);

    // Haal de huidige gebruikersinformatie op van de server
    fetch('https://api-android-c020.onrender.com/api/user-details?userId=' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Zorg ervoor dat credentials worden doorgegeven
        body: JSON.stringify({
            userId: userId,
        })
    })
        .then(response => {
            console.log('Fetching user info:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User info received:', data);
            // Vul de formuliervelden in met de opgehaalde gebruikersinformatie
            if (data.personName && data.email && data.address && data.gender) {
                document.getElementById('name').value = data.personName;
                document.getElementById('email').value = data.email;
                document.getElementById('address').value = data.address;
                document.getElementById('gender').value = data.gender;
            } else {
                alert('Kon gebruikersinformatie niet ophalen.');
            }
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            alert('Er is een fout opgetreden bij het ophalen van de gebruikersinformatie.');
        });

    // Verwerk het formulier wanneer de gebruiker het indient
    document.getElementById('editProfileForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Voorkom standaard formuliergedrag
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            address: formData.get('address'),
            gender: formData.get('gender')
        };

        console.log('Submitting form data:', data);

        const userId = localStorage.getItem('userId');
        console.log('Editing profile for user with ID:', userId);

        // Verstuur de gewijzigde gegevens naar de server
        fetch('https://api-android-c020.onrender.com/api/editprofile?userId=' + userId, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Gegevens worden als JSON verstuurd
            },
            credentials: 'include', // Zorg ervoor dat de credentials worden meegestuurd
            body: JSON.stringify(data), // Zet de gegevens om naar JSON-formaat
            userId: userId,
        })
            .then(response => response.json())
            .then(result => {
                console.log('Profile update result:', result);
                if (result.message) {
                    // Haal de bijgewerkte gebruikersinformatie op, inclusief de rol
                    return fetch('https://api-android-c020.onrender.com/api/user-info', {
                        credentials: 'include' // Zorg ervoor dat de credentials worden meegestuurd
                    });
                } else {
                    alert('Er is een fout opgetreden bij het bijwerken van het profiel.');
                    throw new Error('Profile update failed');
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('User info received:', data);
                // Redirect op basis van de rol van de gebruiker
                if (data.role === 1) {
                    window.location.href = 'dashboard-applicant.html'; // Redirect naar het dashboard voor sollicitanten
                } else if (data.role === 2) {
                    window.location.href = 'dashboard-recruiter.html'; // Redirect naar het dashboard voor recruiters
                } else {
                    alert('Onbekende rol. Geen redirect mogelijk.');
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                document.getElementById('responseMessage').textContent = 'Je profiel is succesvol bijgewerkt.';
            });
    });
}