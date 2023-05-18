//create variable for indexing
let track_index;

//if no data is stored in cookies set track index to 0
if(JSON.parse(localStorage.getItem("trackMem"))==null){
  track_index=0;
}
//else set track to stored cookie
else{
  track_index=JSON.parse(localStorage.getItem("trackMem"));
}

//create variables
let isPlaying = false;
let updateTimer;

//create variables to hold respective html references
let track_name = document.querySelector(".track-name");
  
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
  
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

//janky way to find if there are any cookies for this site
let firstLoad = true;

//check cookies for stored volume setting. Default to 50 if no cookie found.
if(JSON.parse(localStorage.getItem("volumeMem"))==null){
  volume_slider.value = 50;
}
else{
  volume_slider.value = JSON.parse(localStorage.getItem("volumeMem"));
}

// Create browser persisent track timestamp
let persistentTime;
if(JSON.parse(localStorage.getItem("timeMem"))==null){
  persistentTime = 0;
}
else{
  persistentTime = JSON.parse(localStorage.getItem("timeMem"));
}

// Create the audio element for the player
let curr_track = document.createElement('audio');
// Define the list of tracks that have to be played
let track_list = [
  {
    name: "closer (feat. outercosm & Patrick O'neil)",
    artist: "DJ Re:Code",
    path: "assets/mp3/01.mp3",
  },
  {
    name: "decibel (feat.food house)",
    artist: "DJ Re:Code",
    path: "assets/mp3/02.mp3",
  },
  {
    name: "distance (feat. KONG)",
    artist: "DJ Re:Code",
    path: "assets/mp3/03.mp3",
   
  },
  {
    name: "don't sleep (feat. VLAD)",
    artist: "DJ Re:Code",
    path: "assets/mp3/04.mp3",
  },
  {
    name: "fall out",
    artist: "DJ Re:Code",
    path: "assets/mp3/05.mp3",
  },
  {
    name: "i spy (feat. Left at London)",
    artist: "DJ Re:Code",
    path: "assets/mp3/06.mp3",
  },
  {
    name: "just like you (feat. BIO & mickelbach)",
    artist: "DJ Re:Code",
    path: "assets/mp3/07.mp3",
  },
  {
    name: "of course, i'll remember you",
    artist: "DJ Re:Code",
    path: "assets/mp3/08.mp3",
  },
  {
    name: "something to wait for (feat. Button Maker)",
    artist: "DJ Re:Code",
    path: "assets/mp3/09.mp3",

  },
  {
    name: "waltz (feat. trndytrndy, tracey brakes, dynastic)",
    artist: "DJ Re:Code",
    path: "assets/mp3/10.mp3",
  },
];

//spin up current track
function loadTrack(track_index) {
  // Clear the previous seek timer
  console.log(JSON.parse(localStorage.getItem("trackMem")));
  clearInterval(updateTimer);
  if (!firstLoad){
  resetValues();
  }
  
  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  curr_track.currentTime = persistentTime;
  console.log("Current Time Set To: " + curr_track.currentTime);
  
  // Update details of the track
  track_name.textContent = track_list[track_index].name;
  
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
  
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
  
}

//reset all values to defaults
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  curr_track.currentTime= 0;
  persistentTime = 0;
}
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
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}
  
function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
  
  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}
  
function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1){
    track_index += 1;
    window.localStorage.setItem("trackMem", JSON.stringify(track_index));
  }
  else{
    track_index = 0;
    window.localStorage.setItem("trackMem", JSON.stringify(track_index));
  }
  
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
  firstLoad = false;
}
  
function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0){
    track_index -= 1;
    window.localStorage.setItem("trackMem", JSON.stringify(track_index));
  }
  else{
    track_index = track_list.length - 1;
    window.localStorage.setItem("trackMem", JSON.stringify(track_index));
  }
    
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
  firstLoad = false;
}
function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider 
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);
  
  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}
  
function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
  window.localStorage.setItem("volumeMem", JSON.stringify(volume_slider.value));
}
  
function seekUpdate() {
  let seekPosition = 0;
  window.localStorage.setItem("timeMem",curr_track.currentTime);
  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
    
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
  
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
loadTrack(track_index);