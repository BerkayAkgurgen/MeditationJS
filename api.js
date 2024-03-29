const app = () => {
    const song = document.querySelector('.song')
    const play = document.querySelector('.play')
    const outline = document.querySelector('.moving-outline circle')
    const video = document.querySelector('.vid-container video')
    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button')
    // Times
    const timeDisplay = document.querySelector('.time-display')
    const timeSelect = document.querySelectorAll('.time-select button')
    // Get the length of the outline
    const outlineLength = outline.getTotalLength()
    // Duration
    let fakeDuration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick Different Sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            checkPlaying(song)
        })
    })
    // Play Sound
    play.addEventListener('click', () => {
        checkPlaying(song)
    })

    // Select Sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time')
            timeDisplay.textContent = `${addZero(Math.floor(fakeDuration / 60))}:${addZero(Math.floor(fakeDuration % 60))}`

        })
    })
    // Create a function specific to stop and play sounds
    const checkPlaying = song => {
        if (song.paused) {
            song.play()
            video.play()
            play.src = './svg/pause.svg'
        } else {
            song.pause()
            video.pause()
            play.src = './svg/play.svg'
        }
    }

    // Animated Circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        let elapsed = fakeDuration - currentTime
        let seconds = Math.floor(elapsed % 60)
        let minutes = Math.floor(elapsed / 60)
        // Animate The Circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        outline.style.strokeDashoffset = progress
        // Animate the text
        timeDisplay.textContent = `${addZero(minutes)}:${addZero(seconds)}`
        if (currentTime >= fakeDuration) {
            song.pause()
            song.currentTime = 0
            play.src = './svg/play.svg'
            video.pause()
        }
    }

    function addZero(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }
}

app()