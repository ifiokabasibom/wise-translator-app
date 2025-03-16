// Select DOM elements
const startButton = document.getElementById("start-btn");
const originalTextArea = document.getElementById("original-text");
const translatedTextArea = document.getElementById("translated-text");
const speakButton = document.getElementById("speak-btn");
const inputLangSelect = document.getElementById("input-language");
const outputLangSelect = document.getElementById("output-language");

// Check if Speech Recognition API is supported
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("⚠️ Your browser does not support speech recognition. Please use Google Chrome.");
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Stop after first result
    recognition.interimResults = false;

    startButton.addEventListener("click", () => {
        // Set recognition language
        recognition.lang = inputLangSelect.value;
        recognition.start();
        startButton.textContent = "🎤 Listening...";
    });

    recognition.onresult = async (event) => {
        const spokenText = event.results[0][0].transcript;
        originalTextArea.value = spokenText;
        startButton.textContent = "🎤 Start Speaking";

        try {
            const translatedText = await translateText(spokenText, inputLangSelect.value, outputLangSelect.value);
            translatedTextArea.value = translatedText;
        } catch (error) {
            translatedTextArea.value = "⚠️ Translation failed.";
            console.error("Translation Error:", error);
        }
    };

    recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        alert("⚠️ Speech recognition error. Try again.");
        startButton.textContent = "🎤 Start Speaking";
    };
}

// Translation using MyMemory API
async function translateText(text, sourceLang, targetLang) {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const data = await response.json();
        return data.responseData.translatedText || "⚠️ Translation unavailable.";
    } catch (error) {
        console.error("Translation API Error:", error);
        return "⚠️ Translation failed.";
    }
}

// Text-to-Speech (Web Speech API)
speakButton.addEventListener("click", () => {
    if (!translatedTextArea.value.trim()) {
        alert("⚠️ No translated text to read.");
        return;
    }

    const speech = new SpeechSynthesisUtterance(translatedTextArea.value);
    speech.lang = outputLangSelect.value;
    window.speechSynthesis.speak(speech);
});
