window.onload = function () {
    // Laad de footer-inhoud van een extern bestand
    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);

    // Haal de cvId op uit de URL
    const urlParams = new URLSearchParams(window.location.search);
    const cvId = urlParams.get('cvId');

    // Haal de CV-gegevens op via de API
    fetch(`https://api-android-c020.onrender.com/api/cvs/${cvId}`, {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(cv => {
            document.getElementById('cvTitle').innerText = `CV van ${cv.user.username}`; // Zet de titel van het CV
            document.getElementById('cvText').innerText = cv.cvText; // Zet de tekst van het CV
        })
        .catch(error => {
            console.error('Error fetching CV details:', error); // Errorhandling
        });

    // Functie om de status van het CV bij te werken
    async function updateStatus(status) {
        try {
            const response = await fetch(`https://api-android-c020.onrender.com/api/update-cv-status/${cvId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: status }) // Stuur de nieuwe status naar de server
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Laat een succesbericht zien
            } else {
                alert(`Fout: ${data.error}`); // Toon een foutmelding als de status niet kan worden bijgewerkt
            }
        } catch (error) {
            console.error('Error updating status:', error); // Errorhandling
            alert('Er is een fout opgetreden tijdens het bijwerken van de status.'); // Errormelding
        }
    }

    // Event listeners voor de status buttons
    document.getElementById('acceptBtn').addEventListener('click', () => updateStatus('geaccepteerd'));
    document.getElementById('inProgressBtn').addEventListener('click', () => updateStatus('in behandeling'));
    document.getElementById('rejectBtn').addEventListener('click', () => updateStatus('afgewezen'));

    // Feedbackformulier verzenden
    document.getElementById('feedbackForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Voorkom standaard formulier gedrag

        const feedback = document.getElementById('feedback').value;

        fetch(`https://api-android-c020.onrender.com/api/feedback/${cvId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback: feedback }) // Stuur feedback naar de server
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message); // Toon succesbericht
                } else {
                    alert(`Fout: ${data.error}`); // Toon foutmelding
                }
            })
            .catch(error => {
                console.error('Error submitting feedback:', error); // Errorhandling
                alert('Er is een fout opgetreden tijdens het versturen van de feedback.'); // Errormelding
            });
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