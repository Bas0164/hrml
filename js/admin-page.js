const API_URL = 'https://api-android-c020.onrender.com/api/users'; // URL van de API

// Functie die uitgevoerd wordt zodra de pagina geladen is
$(document).ready(function () {
    fetchUsers(); // Haal de lijst van gebruikers op
});

// Haalt de lijst van gebruikers op via een AJAX-request (IK had ook veel liever een Feyenoord-request gehad)
function fetchUsers() {
    $.ajax({
        url: API_URL,
        method: 'GET', // Haal gegevens op met de GET-methode
        success: function (data) {
            const users = Array.isArray(data) ? data : [data]; // Controleer of de data een array is
            $('#user-data').html(''); // Maak de lijst met gebruikers leeg voordat je nieuwe gegevens toevoegt
            users.forEach(user => {
                $('#user-data').append(` <!-- Voeg elke gebruiker toe aan de tabel -->
                            <tr>
                                <td>${user.username}</td>
                                <td>${user.email}</td>
                                <td>
                                    <select class="form-control role-selector" data-user="${user.username}">
                                        <option value="1" ${user.role === 1 ? 'selected' : ''}>Sollicitant</option>
                                        <option value="2" ${user.role === 2 ? 'selected' : ''}>Recruiter</option>
                                        <option value="3" ${user.role === 3 ? 'selected' : ''}>Admin</option>
                                    </select>
                                </td>
                                <td><button class="btn btn-primary update-role" data-user="${user.username}">Update Role</button></td>
                            </tr>
                        `);
            });
            attachEventListeners(); // Voeg event listeners toe aan de knoppen
        },
        error: function () {
            alert("Failed to fetch users."); // Toon een foutmelding als ophalen mislukt
        }
    });
}

// Voegt event listeners toe aan de knoppen die de rol van de gebruiker bijwerken
function attachEventListeners() {
    $('.update-role').on('click', function () {
        const username = $(this).data('user'); // Haal de gebruikersnaam op van de knop
        const newRole = $(`.role-selector[data-user="${username}"]`).val(); // Haal de geselecteerde rol op
        updateRole(username, newRole); // Werk de rol van de gebruiker bij
    });
}

// Functie om de rol van een gebruiker bij te werken
function updateRole(username, role) {
    console.log("Updating role for Username:", username); // Log de gebruikersnaam die geüpdatet wordt

    $.ajax({
        url: `https://api-android-c020.onrender.com/api/users/${encodeURIComponent(username)}/role`, // Update de rol via de API
        method: 'PUT', // Gebruik de PUT-methode om de rol bij te werken
        contentType: 'application/json', // De content is in JSON-formaat
        data: JSON.stringify({ newRole: parseInt(role) }), // Verstuur de nieuwe rol in de request body
        success: function (response) {
            alert(`Role updated to ${role} for ${username}`); // Toon een succesmelding
            fetchUsers(); // Haal de lijst van gebruikers opnieuw op
        },
        error: function (xhr, status, error) {
            console.error("Error updating role:", xhr.responseText || error); // Log een foutmelding
            alert(`Failed to update role: ${xhr.responseText || error}`); // Toon een foutmelding als het bijwerken mislukt
        }
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