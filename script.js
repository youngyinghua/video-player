const player = document.querySelector(".player");

const showControls = document.querySelector(".show-controls");

const video = document.querySelector("video");
const playBtn = document.getElementById("play-btn");
const progressIndicatorBox = document.querySelector(".progress-indicator-box");
const progressIndicator = document.querySelector(".progress-indicator");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const timeElapsed = document.querySelector(".time-elapsed");
const timeDuration = document.querySelector(".time-duration");

const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const volumeIcon = document.getElementById("volume-icon");

const speed = document.getElementById("player-speed");

const fullScreenBtn = document.querySelector(".fullscreen");
const fullScreenIcon = document.getElementById("fullscreen-icon");

const formateTime = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

// Play & Pause ----------------------------------- //
const playVideo = () => {
  if (video.paused) {
    playBtn.className = "fas fa-pause";
    playBtn.title = "Pause";
    video.play();
  } else {
    playBtn.className = "fas fa-play";
    playBtn.title = "Play";
    video.pause();
  }
};

// Progress Bar ---------------------------------- //
const updateProgress = (e) => {
  const { currentTime, duration } = e.target;
  const percentage = currentTime / duration;
  progressBar.style.width = `${percentage * 100}%`;
  timeElapsed.textContent = formateTime(currentTime) + " /";
  timeDuration.textContent = formateTime(duration);
};

const setProgress = (e) => {
  const percentage = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${percentage * 100}%`;
  video.currentTime = percentage * video.duration;
};

const showProgress = () => {
  progressIndicatorBox.style.display = "block";
};

const indicateProgress = (e) => {
  const percentage = e.offsetX / progressRange.offsetWidth;
  indicatorTime = percentage * video.duration;
  progressIndicator.textContent = formateTime(indicatorTime);
  progressIndicatorBox.style.left = e.offsetX - 7.5 + "px";
};

const unshowProgress = () => {
  progressIndicatorBox.style.display = "none";
};

// Volume Controls --------------------------- //
let currentVolume = 1;

const setVolume = (e) => {
  const percentage = e.offsetX / volumeRange.offsetWidth;
  video.volume = percentage > 0.9 ? 1 : percentage < 0.1 ? 0 : percentage;
  currentVolume = video.volume;
  volumeBar.style.width = `${video.volume * 100}%`;
  if (video.volume < 0.3 && video.volume > 0) {
    volumeIcon.className = "fas fa-volume-down";
  } else if (video.volume >= 0.3) {
    volumeIcon.className = "fas fa-volume-up";
  } else {
    volumeIcon.className = "fas fa-volume-mute";
  }
};

const toggleMute = () => {
  if (video.volume) {
    volumeIcon.className = "fas fa-volume-mute";
    volumeIcon.setAttribute("title", "Unmute");
    video.volume = 0;
    volumeBar.style.width = 0;
  } else {
    video.volume = currentVolume;
    volumeBar.style.width = `${video.volume * 100}%`;
    if (video.volume < 0.3 && video.volume > 0) {
      volumeIcon.className = "fas fa-volume-down";
    } else if (video.volume >= 0.3) {
      volumeIcon.className = "fas fa-volume-up";
    } else {
      volumeIcon.className = "fas fa-volume-down";
      video.volume = 0.15;
      volumeBar.style.width = `${video.volume * 100}%`;
      currentVolume = video.volume;
    }
    volumeIcon.setAttribute("title", "Mute");
  }
};

// Change Playback Speed -------------------- //

const setSpeed = () => {
  video.playbackRate = speed.value;
};

// Fullscreen ------------------------------- //

let fullScreen = false;

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  fullScreen = true;
  video.classList.add("video-fullscreen");
  fullScreenIcon.className = "fas fa-compress";
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  fullScreen = false;
  video.classList.remove("video-fullscreen");
  fullScreenIcon.className = "fas fa-expand";
}

const toggleFullscreen = () => {
  fullScreen ? closeFullscreen() : openFullscreen(player);
};

playBtn.addEventListener("click", playVideo);
video.addEventListener("click", playVideo);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("loadeddata", () => {
  timeDuration.textContent = formateTime(video.duration);
});
progressRange.addEventListener("click", setProgress);
progressRange.addEventListener("mouseenter", showProgress);
progressRange.addEventListener("mousemove", indicateProgress);
progressRange.addEventListener("mouseleave", unshowProgress);
volumeRange.addEventListener("click", setVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", setSpeed);
fullScreenBtn.addEventListener("click", toggleFullscreen);
