const bank = document.querySelector("#bank");
const power = document.querySelector("#power");
const url = "https://s3.amazonaws.com/freecodecamp/drums/";
const pads = document.querySelectorAll(".drum-pad");
const audioContainer = document.querySelector(".audios");
const audioVolume = document.querySelector("#audio-volume");
const display = document.querySelector("#display");

const audios = [
    {
        key: "Q",
        files: ["Chord_1.mp3", "Heater-1.mp3"],
        names: ["chord 1", "heater 1"],
    },
    {
        key: "W",
        files: ["Chord_2.mp3", "Heater-2.mp3"],
        names: ["chord 2", "heater 2"],
    },

    {
        key: "E",
        files: ["Chord_3.mp3", "Heater-3.mp3"],
        names: ["chord 3", "heater 3"],
    },

    {
        key: "A",
        files: ["Give_us_a_light.mp3", "Heater-4_1.mp3"],
        names: ["shaker", "heater 4"],
    },

    {
        key: "S",
        files: ["Dry_Ohh.mp3", "Heater-6.mp3"],
        names: ["open hh", "clap"],
    },

    {
        key: "D",
        files: ["Bld_H1.mp3", "Dsc_Oh.mp3"],
        names: ["closed hh", "open hh"],
    },

    {
        key: "Z",
        files: ["punchy_kick_1.mp3", "Kick_n_Hat.mp3"],
        names: ["punchy kick", "kick n' hat"],
    },

    {
        key: "X",
        files: ["side_stick_1.mp3", "RP4_KICK_1.mp3"],
        names: ["side kick", "kick"],
    },

    {
        key: "C",
        files: ["Brk_Snr.mp3", "Cev_H2.mp3"],
        names: ["snare", "closed hh"],
    },
];

pads.forEach((pad) => {
    pad.addEventListener("click", function (e) {
        if (!power.checked) return;
        const key = e.target.innerText;
        const volume = parseInt(audioVolume.value);
        const audioEl = document.getElementById(key);
        const { name } = audioEl.dataset;
        audioEl.volume = volume * 0.1;
        stop();
        audioEl.play();
        display.innerHTML = name;
    });
});

function render() {
    audioContainer.innerHTML = "";
    const text = ["smooth piano kit", "heater kit"];
    const audioIdx = bank.checked ? 0 : 1;

    for (const audio of audios) {
        const el = document.createElement("audio");
        const source = document.createElement("source");

        el.setAttribute("id", audio.key);
        el.dataset.name = audio.names[audioIdx];
        source.src = url + audio.files[audioIdx];
        source.setAttribute("type", "audio/mp3");
        el.appendChild(source);

        audioContainer.appendChild(el);
    }
    display.innerHTML = text[audioIdx];
}
function stop() {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((el) => {
        el.pause();
        el.currentTime = 0;
    });
}

bank.addEventListener("click", render);

render();
