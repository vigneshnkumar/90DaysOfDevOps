const phoneticAlphabet = {
    'A': 'Alpha',
    'B': 'Bravo',
    'C': 'Charlie',
    'D': 'Delta',
    'E': 'Echo',
    'F': 'Foxtrot',
    'G': 'Golf',
    'H': 'Hotel',
    'I': 'India',
    'J': 'Juliett',
    'K': 'Kilo',
    'L': 'Lima',
    'M': 'Mike',
    'N': 'November',
    'O': 'Oscar',
    'P': 'Papa',
    'Q': 'Quebec',
    'R': 'Romeo',
    'S': 'Sierra',
    'T': 'Tango',
    'U': 'Uniform',
    'V': 'Victor',
    'W': 'Whiskey',
    'X': 'X-ray',
    'Y': 'Yankee',
    'Z': 'Zulu',
    '0': 'Zero',
    '1': 'One',
    '2': 'Two',
    '3': 'Three',
    '4': 'Four',
    '5': 'Five',
    '6': 'Six',
    '7': 'Seven',
    '8': 'Eight',
    '9': 'Nine'
};

const input = document.getElementById('nameInput');
const resultDiv = document.getElementById('result');

input.addEventListener('input', (e) => {
    // Normalize string to decompose accents (e.g., 'é' becomes 'e' + accent mark)
    // Then replace accent marks with empty string to get base character
    const originalText = e.target.value;
    const normalizedText = originalText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

    resultDiv.innerHTML = '';

    // We iterate through the normalized text but we might want to display the original char?
    // The requirement is "If the name has special alphabet it should try its best to give a phoetic sound."
    // So 'é' should probably show as 'E Echo' or maybe 'é Echo'.
    // Let's assume we map the normalized char to the phonetic word, but maybe display the original?
    // But normalizedText length matches originalText length usually (unless composite characters).
    // Let's stick to using normalized text for lookup and display to be safe and consistent with "try its best".

    for (let i = 0; i < normalizedText.length; i++) {
        const char = normalizedText[i];
        const originalChar = originalText[i] ? originalText[i].toUpperCase() : char;

        if (char === ' ') {
             // Add a spacer for space
            const spacer = document.createElement('div');
            spacer.style.height = '10px';
            resultDiv.appendChild(spacer);
            continue;
        }

        const word = phoneticAlphabet[char];
        if (word) {
            const div = document.createElement('div');
            div.className = 'phonetic-word';
            // Display the original char (uppercased) so user sees what they typed, but mapped to the base sound
            div.innerHTML = `<span class="char">${originalChar}</span> ${word}`;
            resultDiv.appendChild(div);
        } else {
             // Handle special characters (symbols) - no phonetic output
            const div = document.createElement('div');
            div.className = 'phonetic-word';
            div.innerHTML = `<span class="char">${originalChar}</span>`;
            resultDiv.appendChild(div);
        }
    }
});
