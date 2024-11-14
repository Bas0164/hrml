window.onload = function () {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);
}

document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Voorkomt dat het formulier op de standaard manier wordt verzonden

    // Controleer of "Roosendaal" in het adres voorkomt
    const checkAddress = document.getElementById('address').value;
    if (checkAddress.toLowerCase().includes('roosendaal')) {
        alert('Registratie niet toegestaan voor adressen in Roosendaal.');
        window.location.href = 'https://www.roosendaal.nl/verhuizing-doorgeven'; // Sorry Thomas
        return;
    }


    // Functie voor het hashen van het wachtwoord
    async function hashPassword(password) {
        const encoder = new TextEncoder(); // Maakt een encoder voor de tekst
        const data = encoder.encode(password); // Encodeert het wachtwoord
        const hash = await crypto.subtle.digest('SHA-256', data); // Voert de hashbewerking uit
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join(''); // Zet de hash om in een hexadecimale string
    }

    // Verkrijg de formuliervelden
    const name = document.getElementById('name').value;

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;
    const birth_date = document.getElementById('birthday').value;

    // Hash het wachtwoord
    const hashedPassword = await hashPassword(password);

    // Gegevens die worden verstuurd naar de server
    const formData = {
        name,
        username,
        email,
        password: hashedPassword,
        gender,
        address,
        birth_date
    };

    try {
        // Verstuur het formulier naar de server
        const response = await fetch('https://api-android-c020.onrender.com/api/register', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        // Controleer of de registratie succesvol is
        if (response.ok) {
            // Leeg het formulier na succesvolle registratie
            document.getElementById('registerForm').reset();

            // Toon een succesbericht
            document.getElementById('responseMessage').textContent = 'Registratie geslaagd!';
            document.getElementById('errorMessage').textContent = '';  // Verwijder eventuele foutmeldingen

            // Navigeer naar de loginpagina
            setTimeout(() => window.location.href = 'login.html', 2000); // Na 2 seconden doorsturen naar overzicht

        } else {
            // Toon een foutmelding
            document.getElementById('errorMessage').textContent = `Fout: ${result.error || 'Er is iets mis gegaan'}`;
            document.getElementById('responseMessage').textContent = '';  // Verwijder succesbericht
        }
    } catch (error) {
        console.error('Fout:', error);
        document.getElementById('errorMessage').textContent = 'Fout: Registratie mislukt';
        document.getElementById('responseMessage').textContent = '';  // Verwijder succesbericht

    }
});