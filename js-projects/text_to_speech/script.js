let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");

function loadVoices() {
    voices = window.speechSynthesis.getVoices();

    voiceSelect.innerHTML = "";

    voices.forEach((voice, i) => {
        let option = new Option(voice.name, i);
        voiceSelect.appendChild(option);
    });

    if (voices.length > 0) {
        speech.voice = voices[0];
    }
}

window.speechSynthesis.onvoiceschanged = loadVoices;

voiceSelect.addEventListener("change", () => {
    let selectedVoice = voiceSelect.value;
    speech.voice = voices[selectedVoice];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);
});