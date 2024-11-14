$(document).ready(function () {
    // Functie om de gebruikerssessie te controleren en door te sturen naar de juiste pagina op basis van de rol
    function checkSession() {
        fetch('https://api-android-c020.onrender.com/api/user-info', {
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 401) {
                    return; // Gebruiker is niet ingelogd, niets doen
                }
                return response.json();
            })
            .then(data => {
                if (data && data.role) {
                    // Doorsturen op basis van de gebruikersrol
                    if (data.role === 1) {
                        window.location.href = 'dashboard-applicant.html'; // Doorsturen naar dashboard voor sollicitant
                    } else if (data.role === 2) {
                        window.location.href = 'dashboard-recruiter.html'; // Doorsturen naar dashboard voor recruiter
                    } else if (data.role === 3) {
                        window.location.href = 'admin-page.html'; // Doorsturen naar admin pagina
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }

    // Controleer de sessie zodra de pagina is geladen
    checkSession();

    // Verwerken van het loginformulier
    $('#loginForm').submit(function (event) {
        event.preventDefault(); // Voorkom de standaard form submission

        const username = $('#username').val();
        const password = $('#password').val();

        // Wachtwoord hashen met CryptoJS
        const hashedPassword = CryptoJS.SHA256(password).toString();

        // Stuur AJAX verzoek voor inloggen (Ik had ook liever Feyenoord gehad)
        $.ajax({
            url: 'https://api-android-c020.onrender.com/api/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: hashedPassword
            }),
            xhrFields: {
                withCredentials: true, // Zorg ervoor dat credentials worden meegegeven
                crossDomain: true // Sta cross-domain requests toe
            },
            success: function (response) {
                $('#responseMessage').text(response.message).show();

                if (response.userId) {
                    // Opslaan van userId en role in localStorage
                    localStorage.setItem('userId', response.userId);
                    localStorage.setItem('role', response.role);

                    console.log('Login successful:', response.userId, response.role);

                    // Doorsturen op basis van de gebruikersrol
                    if (response.role === 1) {
                        window.location.href = 'dashboard-applicant.html'; // Doorsturen naar dashboard voor sollicitant
                    } else if (response.role === 2) {
                        window.location.href = 'dashboard-recruiter.html'; // Doorsturen naar dashboard voor recruiter
                    } else if (response.role === 3) {
                        window.location.href = 'admin-page.html'; // Doorsturen naar admin pagina
                    }
                } else {
                    $('#responseMessage').text('Login failed. Invalid username or password.').show(); // Foutmelding bij mislukte inlog
                }
            },
            error: function (xhr, status, error) {
                console.error('Error response:', xhr);
                console.error('Status:', status);
                console.error('Error:', error);
                $('#responseMessage').text('Je gebruikersnaam en/of wachtwoord is onjuist!').show(); // Algemene foutmelding
            }
        });
    });

});

window.onload = function () {
    fetch('footer.html')  // Haal de footer-inhoud op
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);
}