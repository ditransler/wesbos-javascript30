'use strict';

const player = document.querySelector('.player');
const video = player.querySelector('.player__video');

const progress = player.querySelector('.player__progress');
const progressFill = player.querySelector('.player__progress-fill');

const toggle = player.querySelector('.player__toggle');
const skipButtons = player.querySelectorAll('.player__skip');
const sliders = player.querySelectorAll('.player__slider');

const fullscreen = player.querySelector('.player__fullscreen');

function togglePlay() {
    const action = video.paused ? 'play' : 'pause';

    video[action]();
}

function updateToggle() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function skip() {
    if (video.currentTime === 0 || video.currentTime === video.duration) {
        return;
    }

    video.currentTime += parseInt(this.dataset.skip, 10);
}

function onSliderUpdate() {
    video[this.name] = this.value;
}

function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFill.style.flexBasis = `${percent}%`;
}

function scrub(evt) {
    video.currentTime = (evt.offsetX / progress.offsetWidth) * video.duration;
}

function toggleFullScreen() {
    if (!isFullscreen) {

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
        }

        isFullscreen = true;

    } else {

        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }

        isFullscreen = false;

    }

}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggle);
video.addEventListener('pause', updateToggle);
video.addEventListener('timeupdate', updateProgress);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

sliders.forEach(slider => slider.addEventListener('input', onSliderUpdate));

let isMouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (evt) => isMouseDown && scrub(evt));
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);

let isFullscreen= false;
fullscreen.addEventListener('click', toggleFullScreen);

