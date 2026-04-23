const audio = document.getElementById("audio");
const songName = document.getElementById("songName");
const playBtn = document.getElementById("playBtn");
const player = document.getElementById("player");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const songs = [
  {
    name: "Aegen",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista001.mp3",
    cover: "covers/aegen.png"
  },
  {
    name: "Premier Armour",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista002.mp3",
    cover: "covers/PremierArmour.png"
  },
  {
    name: "Le Ciel",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista003.mp3",
    cover: "covers/LeCiel.png"
  },
  {
    name: "Bel Air",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista004.mp3",
    cover: "covers/BelAir.png"
  },
  {
    name: "Gardenia",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista005.mp3",
    cover: "covers/Gardenia.png"
  },
  {
    name: "Au Revoir",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista006.mp3",
    cover: "covers/AuRevoir.png"
  },
  {
    name: "Ma Chérie",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista007.mp3",
    cover: "covers/MaCherie.png"
  },
  {
    name: "Brise",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista008.mp3",
    cover: "covers/Brise.png"
  },
  {
    name: "Baroque",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista009.mp3",
    cover: "covers/Baroque.png"
  },
  {
    name: "Syunikiss",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista010.mp3",
    cover: "covers/Syunikiss.png"
  },
  {
    name: "Honey Vanity",
    artist: "Közi",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista011.mp3",
    cover: "covers/HoneyVanity.png"
  },
  {
    name: "Seraph",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista012.mp3",
    cover: "covers/Seraph.png"
  },
  {
    name: "Uruwashiki Kamen no Sotaijou",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista013.mp3",
    cover: "covers/UKNS.png"
  },
  {
    name: "Gekka no Yasoukyoku",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista014.mp3",
    cover: "covers/Gekka.png"
  },
  {
    name: "Sadness ~ I Know the Reason of her Sadness",
    artist: "Malice Mizer",
    file: "https://raw.githubusercontent.com/leo-m1ne/music/main/pista015.mp3",
    cover: "covers/Sadness.png"
  }
];

let currentSong = 0;
let isPlaying = false;

function loadSong(index) {
  updateSongTitle(songs[index].name);
  audio.src = songs[index].file;
  player.style.backgroundImage = `url(${songs[index].cover})`;
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
  isPlaying = !isPlaying;
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  isPlaying = true;
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  isPlaying = true;
}

audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

/* ✨ TÍTULO CON SCROLL SI ES LARGO */
function updateSongTitle(title) {
  songName.innerHTML = "";
  songName.classList.remove("animate");

  const span1 = document.createElement("span");
  span1.textContent = title;

  const span2 = document.createElement("span");
  span2.textContent = title;

  songName.appendChild(span1);

  // esperar al render REAL
  requestAnimationFrame(() => {
    const containerWidth = songName.parentElement.offsetWidth;
    const textWidth = span1.offsetWidth;

    if (textWidth > containerWidth) {
      songName.appendChild(span2);
      songName.classList.add("animate");
    }
  });
}

const menuBtn = document.getElementById("menuBtn");
const playlist = document.getElementById("playlist");
const playlistInner = document.getElementById("playlistInner");

/* mostrar / ocultar */
menuBtn.addEventListener("click", () => {
  playlist.classList.toggle("show");
});

/* crear lista */
songs.forEach((song, index) => {
  const item = document.createElement("div");
  item.className = "playlist-item";

  item.innerHTML = `
  <img src="${song.cover}">
  <div class="playlist-text">
    <div class="playlist-title">${song.name}</div>
    <div class="playlist-artist">${song.artist}</div>
  </div>
`;

  item.addEventListener("click", () => {
    currentSong = index;
    loadSong(currentSong);
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
    playlist.classList.remove("show");
  });

  playlistInner.appendChild(item);
});

loadSong(currentSong);
