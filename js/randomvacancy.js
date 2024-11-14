document.getElementById('cvUploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Voorkomt dat het formulier de pagina opnieuw laadt
    document.getElementById('uploadResult').innerText = 'Ben je serieus?? Niemand gaat toch de sfeer kunnen verbeteren in Roosendaal.';
    // Toon een boodschap wanneer het formulier wordt ingediend
});

document.getElementById('audioButton').addEventListener('click', function () {
    const audio = document.getElementById('audio');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

window.onload = function () {
    fetch('footer.html')  // Haal de footer-inhoud op
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