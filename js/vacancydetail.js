window.onload = function () {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);

    // Haal de vacancyId op uit de URL
    const urlParams = new URLSearchParams(window.location.search);
    const vacancyId = urlParams.get('vacancyId');

    // Haal userId en role op uit localStorage
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    // const vacancyId = localStorage.getItem('vacatureId');

    // Controleer of userId bestaat voordat het formulier wordt ingesteld
    if (userId) {
        const cvUploadForm = document.getElementById('cvUploadForm');
        cvUploadForm.action = `https://api-android-c020.onrender.com/api/upload-cv-sys?userId=${userId}&vacatureId=${vacancyId}`;
    } else {
        console.warn("User is not logged in. No userId found.");
    }

    // Stel de vacancyId in het formulier in
    document.getElementById('vacatureId').value = vacancyId;

    // Haal vacaturedetails op
    // Fetch vacancy details
    fetch(`https://api-android-c020.onrender.com/api/vacancies-web/${vacancyId}`, {
        credentials: 'include',
        method: 'GET',
    })
        .then(response => response.json())
        .then(vacancy => {
            document.getElementById('vacancyTitle').innerText = vacancy.vacancieTitel;
            document.getElementById('vacancyText').innerText = vacancy.vacancieText;

            // Check if vacanciePicture path is defined and remove "uploads\\images\\" from the picture path if it exists
            const vacancyPicturePath = vacancy.vacanciePicture ? vacancy.vacanciePicture.replace("uploads\\images\\", "").replace("uploads/images/", "") : "";

            // Set the image source only if the path is available
            if (vacancyPicturePath) {
                document.getElementById('vacancyImage').src = `https://api-android-c020.onrender.com/uploads/images/${vacancyPicturePath}`;

            } else {
                console.warn("No vacancy picture found.");
            }
        })
        .catch(error => {
            console.error('Error fetching vacancy details:', error);
        });
}

document.getElementById('cvUploadForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Voorkom standaard formulier gedrag

    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    const userId = localStorage.getItem('userId'); // Haal userId op uit localStorage
    const vacatureId = document.getElementById('vacatureId').value; // Haal vacatureId uit het formulier


    // Controleer de bestandsgrootte
    if (file.size > 10 * 1024 * 1024) { // 10 MB in bytes
        document.getElementById('uploadResult').innerText = 'Het bestand is te groot. Maximaal 10 MB toegestaan.';
        return;
    }

    const formData = new FormData(this);
    formData.append('userId', userId);      // Voeg userId toe aan FormData
    formData.append('vacatureId', vacatureId);  // Voeg vacatureId toe aan FormData 

    const response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    });

    const result = await response.json();
    if (response.ok) {
        // Toon de modal of een andere feedbackmethode
        $('#successModal').modal('show');  // Toon de succesmodal
        setTimeout(() => window.location.href = 'overview.html', 4000); // Na 4 seconden doorsturen naar overzicht
    } else {
        document.getElementById('uploadResult').innerText = result.error || 'Er is een fout opgetreden tijdens het uploaden.';
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