# HRML - Vacaturebeheer Systeem

![HRML - Vacaturebeheer Systeem](https://hrml.nl/img/logo.png)

## Beschrijving

HRML is een webapplicatie voor het beheren van vacatures. Het biedt functionaliteiten voor recruiters om vacatures toe te voegen, bij te werken en te verwijderen, en voor sollicitanten om te solliciteren op vacatures, hun profiel en CV te beheren, en feedback in te zien. De applicatie ondersteunt ook het uploaden en beheren van CV's en het geven van feedback door recruiters.



## Inhoudsopgave

- [Technologieën en afhankelijkheden](#technologieën-en-afhankelijkheden)
- [Machine Learning Integratie](#machine-learning-integratie)
- [API-documentatie](#api-documentatie)
- [Gebruik](#gebruik)
- [Auteurs](#auteurs)
- [Licentie](#licentie)
- [Contactinformatie](#contactinformatie)
- [Roadmap](#roadmap)
- [Andere Tools](#andere-tools)
- [FAQ](#faq)
- [Afsluiting](#afsluiting)
- [Bigdata](#de-6-vs-van-big-data)

## Technologieën en afhankelijkheden

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Multer (voor bestandsuploads)
  - pdf-parse (voor het verwerken van PDF-bestanden)

- **Frontend:**
  - HTML
  - CSS
  - JavaScript
  - Bootstrap
  - Animate.css

## Machine Learning Integratie

In dit project maken we gebruik van machine learning om de geschiktheid van een CV voor een vacature te beoordelen. Wanneer een sollicitant zijn of haar CV uploadt, wordt het CV geanalyseerd en krijgt het een score die aangeeft hoe goed het past bij de vacature. Deze score wordt berekend door de machine learning-modellen die de overeenkomst tussen de vaardigheden in het CV en de vereisten van de vacature analyseren. Deze functionaliteit is geïmplementeerd met behulp van machine learning-API's die gehost worden op [Render](https://render.com/).

## API-documentatie

### Endpoints

- **POST /api/create-vacancy**
  - Beschrijving: Maak een nieuwe vacature aan.
  - Parameters: `vacancieTitel`, `vacancieText`, `skills`, `vacanciePicture`

- **PUT /api/update-vacancy/:id**
  - Beschrijving: Werk een bestaande vacature bij.
  - Parameters: `vacancieTitel`, `vacancieText`, `skills`, `vacanciePicture`

- **DELETE /api/delete-vacancy/:id**
  - Beschrijving: Verwijder een vacature.
  - Parameters: `id` (vacature ID)

- **POST /api/upload-cv**
  - Beschrijving: Upload een CV.
  - Parameters: `file`, `vacatureId`

- **GET /api/cv/:id**
  - Beschrijving: Haal een CV op.
  - Parameters: `id` (CV ID)

- **POST /api/feedback/:id**
  - Beschrijving: Geef feedback op een CV.
  - Parameters: `cvId`, `feedback`

- **POST /api/register**
  - Beschrijving: Registreer een nieuwe gebruiker of recruiter.
  - Parameters: `username`, `email`, `password`

- **POST /api/login**
  - Beschrijving: Log in met je gebruikersnaam en wachtwoord.
  - Parameters: `username`, `password`

- **GET /api/profile/:id**
  - Beschrijving: Haal het profiel van een gebruiker of recruiter op.
  - Parameters: `id` (gebruikers/recruiter ID)

- **PUT /api/editprofile/:id**
  - Beschrijving: Werk het profiel van een gebruiker of recruiter bij.
  - Parameters: `id` (gebruikers/recruiter ID), `profileData`

## Gebruik

### Gebruiker
1. **Registreren:**
   - Ga naar de registratiepagina en vul de vereiste gegevens in om een account aan te maken.

2. **Inloggen:**
   - Ga naar de inlogpagina, vul je gebruikersnaam en wachtwoord in om in te loggen.

3. **Profiel bewerken:**
   - Ga naar je profielpagina en werk je gegevens bij.

4. **CV uploaden:**
   - Ga naar de vacature detailpagina en upload je CV.

5. **Feedback inzien:**
   - Ga naar het dashboard van je profiel om te zien wat recruiters over je CV hebben gezegd.

### Recruiter
1. **Registreren:**
   - Ga naar de registratiepagina en vul de vereiste gegevens in om een account aan te maken.

2. **Inloggen:**
   - Ga naar de inlogpagina, vul je gebruikersnaam en wachtwoord in om in te loggen.

3. **Profiel bewerken:**
   - Ga naar je profielpagina en werk je gegevens bij.

4. **Vacature toevoegen:**
   - Ga naar de recruiter dashboard en klik op "Voeg Vacature Toe".
   - Vul de details in en upload een afbeelding.
   - Klik op "Vacature Toevoegen".

5. **Vacature bewerken:**
   - Ga naar de recruiter dashboard en klik op "Bewerk" naast de vacature die je wilt bewerken.
   - Werk de details bij en klik op "Vacature Bewerken".

6. **Vacature verwijderen:**
   - Ga naar de recruiter dashboard en klik op "Verwijder" naast de vacature die je wilt verwijderen.

7. **Feedback geven op CV's:**
   - Ga naar de CV's die zijn geüpload door sollicitanten en geef feedback op de CV's.

## Auteurs

- **Naam:** HRML Team02
- **GitHub:** [HRML GitHub](https://github.com/AdA-Informatica)

- **Bas de Bruijn** [GitHub](https://github.com/Bas0164)

- **Alex Chu** [GitHub](https://github.com/AlexChulo)

- **Bere Kanters** [GitHub](https://github.com/BereKanters)

- **Siem van Oers** [GitHub](https://github.com/siemvanoers)



## Licentie

Dit project is gelicentieerd onder de MIT-licentie. Zie het [LICENSE](https://www.bergenopzoom.nl/) bestand voor meer informatie.

## Contactinformatie

- **Naam:** HRML Team
- **E-mail:** hrmlteam02@gmail.com
- **GitHub:** [HRML GitHub](https://github.com/AdA-Informatica)

## Roadmap

- **Versie 1.0:**
  - Basisfunctionaliteiten voor vacaturebeheer.
  - CV-upload en -beheer.
  - Gebruikersauthenticatie en -autorisatie.

- **Versie 1.1:**
  - Verbeterde gebruikersinterface.
  - Zoek- en filterfunctionaliteiten voor vacatures.
  - Notificatiesysteem voor sollicitanten en recruiters.

- **Versie 1.2:**
  - Integratie met externe job boards.
  - Geavanceerde rapportage en analytics.
  - Ondersteuning voor meerdere talen.

## Andere Tools

- **Git**: Versiebeheersysteem voor samenwerking en versiebeheer.
- **Hostinger**: Hostingservice voor de website.
- **Render**: Platform voor het hosten van de API-endpoints.

## FAQ

**1. Hoe kan ik me registreren?**
   - Ga naar de registratiepagina, vul je gegevens in en klik op 'Registreren'.

**2. Hoe kan ik mijn CV uploaden?**
   - Log in op je account, ga naar de vacature detailpagina en klik op 'CV Uploaden'.

**3. Wat moet ik doen als ik geen toegang krijg tot mijn account?**
   - Zorg ervoor dat je de juiste inloggegevens gebruikt en neem contact op met de support als het probleem aanhoudt.

## Afsluiting

Dit project is een volledige webapplicatie voor vacaturebeheer, ontworpen om de efficiëntie van het wervingsproces te verbeteren door middel van moderne technologieën zoals machine learning en een robuuste backend. We blijven het systeem verbeteren en uitbreiden volgens de roadmap en ontvangen graag feedback van gebruikers en ontwikkelaars.

## De 6 V's van Big Data

### Volume
De HRML-applicatie verwerkt grote hoeveelheden gegevens, zoals CV’s, vacatures, profielen en sollicitaties. Deze hoeveelheid data groeit naarmate het platform meer gebruikers krijgt, wat efficiënte opslag en verwerking vereist.

### Snelheid (Velocity)
HRML ondersteunt de real-time verwerking van gegevens. Acties zoals het uploaden van CV’s en feedback geven, worden direct verwerkt, waardoor gebruikers actuele informatie krijgen en een soepele ervaring hebben, zelfs tijdens pieken.

### Variëteit (Variety)
HRML beheert verschillende soorten data: gestructureerde data (bijvoorbeeld tekstvelden en profielen) en ongestructureerde data (zoals PDF’s voor CV’s). Deze variatie stelt gebruikers in staat om verschillende dataformaten te uploaden en verwerken.

### Waarheid (Veracity)
HRML waarborgt de betrouwbaarheid van data door validaties uit te voeren op CV’s en profielen, waardoor de kans op fouten of onjuiste informatie afneemt. Hierdoor kunnen recruiters vertrouwen op de juistheid van gegevens.

### Waarde (Value)
HRML benut data om waarde te creëren. Door middel van geavanceerde matching en machine learning-analyse kan het systeem sollicitanten en vacatures beter koppelen, wat het sollicitatieproces efficiënter maakt.

### Visualisatie (Visualization)
De gebruikersinterface van HRML biedt duidelijke visuele weergaven van vacatures, profielen en feedback. Dit maakt de navigatie eenvoudig en zorgt ervoor dat belangrijke informatie snel inzichtelijk is, wat helpt bij het nemen van datagedreven beslissingen.