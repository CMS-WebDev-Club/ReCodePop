let curr_track = document.createElement('audio');
curr_track.load();
curr_track.src ="assets/teaser.mp3";
let isPlaying= false;
let playpause_btn = document.querySelector(".playpause-track");
curr_track.addEventListener("ended", loadSplash);

function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
    
  function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
    
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
    
  function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
    
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }

  function loadSplash(){
    window.location.href = "splash.html";
  }