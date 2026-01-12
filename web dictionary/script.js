const input = document.getElementById("wordInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

// Search on button click
searchBtn.addEventListener("click", searchWord);

// Search on Enter key
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchWord();
    }
});

function searchWord() {
    const word = input.value.trim();

    // Empty input handling
    if (word === "") {
        alert("Please enter a word!");
        return;
    }

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Word not found");
            }
            return response.json();
        })
        .then(data => {
            displayResult(data[0]);
        })
        .catch(() => {
            resultDiv.innerHTML = `
                <p class="error">Word not found. Please try another word.</p>
            `;
        });
}

function displayResult(data) {
    const meaning = data.meanings[0];
    const definition = meaning.definitions[0];

    const partOfSpeech = meaning.partOfSpeech;
    const meaningText = definition.definition;
    const example = definition.example || "Example not available";

    const phonetic = data.phonetics.find(p => p.text)?.text || "N/A";
    const audio = data.phonetics.find(p => p.audio)?.audio;

    resultDiv.innerHTML = `
        <h2>${data.word}</h2>
        <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
        <p><strong>Meaning:</strong> ${meaningText}</p>
        <p><strong>Example:</strong> ${example}</p>
        <p><strong>Phonetic:</strong> ${phonetic}</p>
        ${
            audio 
            ? `<button onclick="playAudio('${audio}')">🔊 Play Audio</button>`
            : `<p>Audio not available</p>`
        }
    `;
}

function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
}
