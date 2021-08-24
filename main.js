const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const header = $("header h2");
const cdThumb = $(".cd .cd-thumb");
const audio = $("#audio");
const playsong = $(".btn.btn-toggle-play");
const player = $(".player");
var playing = false;
var i = 0;
const volume=$("#volume");
const progress = $("#progress");
const nextsong = $(".btn.btn-next");
const prevsong = $(".btn.btn-prev");
const random = $(".btn.btn-random");
let checkRandom = false;
let checkRepeat = false;
const repeat = $(".btn.btn-repeat");
const playlist = $(".playlist");
const songs = [
  {
    name: "Bule",
    singer: "big bang",
    path: "./mp3/Blue-BIGBANG-6292792.mp3",
    img: "img/artworks-000081636224-6gpqsz-t500x500.jpg",
  },
  {
    name: "Có hẹn với thanh xuân",
    singer: "Monstar",
    path: "./mp3/cohenvoithanhxuan-MONSTAR-7050201.mp3",
    img: "img/cohenvsthanhxuan.jpg",
  },
  {
    name: "Haru haru",
    singer: "BIGBANG",
    path: "mp3/HaruHaru-BIGBANG-6291516.mp3",
    img: "img/bigbang3.jpg",
  },
  {
    name: "3107-3",
    singer: "WNDuonggNau",
    path: "mp3/31073-WNDuonggNautitie-7059323.mp3",
    img: "img/3107_3.jpg",
  },
  {
    name: "Lần hẹn hò đầu tiên",
    singer: "Huyền Trâm",
    path: "mp3/Lần Hẹn Hò Đầu Tiên (Single) - Album 320 lossless.mp3",
    img: "img/huyentram.jpg",
  },
  {
    name: "Covid nhanh đi đi",
    singer: "Monstar",
    path: "./mp3/Covid Nhanh Đi Đi - Nhiều nghệ sĩ - Bài hát, lyrics.mp3",
    img: "img/kicm_eedu.jpg",
  },
];
function start() {
  renderSongs();
  handleEvent();
  loadsong();
  playmusic();
}
start();
function renderSongs() {
  const html = songs.map((song, index) => {
    return `
        <div class="song ${index === i ? "active" : ""}" data-index="${index}">
                    <div class="thumb" style="background-image: url(${
                      song.img
                    })">
                    </div>
                    <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
        `;
  });
  playlist.innerHTML = html.join("\n");
}
function handleEvent() {
  const cd = $(".cd");
  const cdWidth = cd.offsetWidth;
  document.onscroll = () => {
    const scrollTOP = window.scrollY || document.documentElement.scrollTop;
    const newWith = cdWidth - scrollTOP;
    cd.style.width = newWith > 0 ? newWith + "px" : 0;
  };
  addactiverandom();
  addactiverepeat();
  nextsong.onclick = () => {
    if (checkRandom) randomMusic();
    else nextmusic();
  };
  prevsong.onclick = () => {
    if (checkRandom) randomMusic();
    else prevmusic();
  };
  selectMusic();
}
function loadsong() {
  header.textContent = songs[i].name;
  cdThumb.style.backgroundImage = `url(${songs[i].img})`;
  audio.src = songs[i].path;
}
const animate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
    duration: 10000,
    iterations: Infinity,
  });
  animate.pause();
function playmusic() {
  
  volume.onchange = () => {
    const volumechange=volume.value;
    audio.volume = volumechange;
  }
  playsong.onclick = () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    audio.onplay = () => {
      player.classList.add("playing");
      animate.play();
      playing = true;
    };
    audio.onpause = () => {
      player.classList.remove("playing");
      animate.pause();
      playing = false;
    };
  };
    audio.ontimeupdate = () => {
      if (audio.duration) {
        let currentprogress = (audio.currentTime / audio.duration) * 100;
        progress.value = currentprogress;
      }
    };
    
    progress.onchange = () => {
      const seekTime = (audio.duration / 100) * progress.value;
      audio.currentTime = seekTime;
    };
    audio.onended = () => {
      if (checkRepeat) audio.play();
      else if (checkRandom) randomMusic();
      else nextmusic();
    };
 
}
function nextmusic() {
  i++;
  if (i >= songs.length) i = 0;
  loadsong();
  audio.play();
  renderSongs();
  audio.onplay = () => {
    player.classList.add("playing");
    animate.play();
    playing = true;
  };
}
function prevmusic() {
  i--;
  if (i < 0) i = songs.length - 1;
  loadsong();
  audio.play();
  renderSongs();
  audio.onplay = () => {
    player.classList.add("playing");
    animate.play();
    playing = true;
  };
}
function addactiverandom() {
  random.onclick = () => {
    checkRandom = !checkRandom;
    random.classList.toggle("active", checkRandom);
  };
}
function addactiverepeat() {
  repeat.onclick = () => {
    checkRepeat = !checkRepeat;
    repeat.classList.toggle("active", checkRepeat);
  };
}
function randomMusic() {
  var newindex = i;
  while (i === newindex) {
    newindex = Math.floor(Math.random() * songs.length);
  }
  i = newindex;
  loadsong();
  renderSongs();
  audio.play();
}
function selectMusic() {
  playlist.onclick = (e) => {
    var songnode = e.target.closest(".song:not(.active)");
    if (songnode && !e.target.closest(".option")) {
      console.log(songnode.getAttribute("data-index"));
      i = Number(songnode.getAttribute("data-index"));
      loadsong();
      renderSongs();
      audio.play();
      audio.onplay = () => {
        player.classList.add("playing");
        animate.play();
        playing = true;
      };
    }
  };
}
