function testPlaceNameRecognition() {
    const placeName = "Bergen op Zoom";
    const result = isPlaceName(placeName);
    assert.equal(result, true, "De plaatsnaam 'Bergen op Zoom' wordt correct herkend.");
}

function testPlaceNameSplit() {
    const placeName = "Bergen op Zoom";
    const splitResult = placeName.split(" ");
    assert.deepEqual(splitResult, ["Bergen", "op", "Zoom"], "De plaatsnaam wordt correct gesplitst.");
}

function testToLowerCase() {
    const placeName = "Bergen op Zoom";
    const lowerCaseResult = placeName.toLowerCase();
    assert.equal(lowerCaseResult, "bergen op zoom", "De plaatsnaam wordt correct omgezet naar kleine letters.");
}

function testShortenPlaceName() {
    const placeName = "Bergen op Zoom";
    const shortenedName = placeName.split(" ")[0]; // Neem alleen het eerste woord
    assert.equal(shortenedName, "Bergen", "De plaatsnaam wordt correct ingekort tot 'Bergen'.");
}

function testValidPlaceNameLength() {
    const placeName = "Bergen op Zoom";
    const isValidLength = placeName.length >= 5;
    assert.equal(isValidLength, true, "De plaatsnaam voldoet aan de lengte-eis van minimaal 5 karakters.");
}
