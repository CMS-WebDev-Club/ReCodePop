let track_index;
if(JSON.parse(localStorage.getItem("trackMem"))==null){
  track_index=0;
}
else{
  track_index=JSON.parse(localStorage.getItem("trackMem"));
}
let isPlaying = false;
let updateTimer;
 // Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
  
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
  
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
// let track_lyrics = document.querySelector(".trackLyrics");
// let track_bio = document.querySelector(".bio");
// let track_feature = document.getElementById("feature");

//jank way to see if page has initially loaded by setting this to true on load
let firstLoad = true;
// Create browser persistent volume
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
    name: "will you remember me? (feat. fishdinner)",
    artist: "DJ Re:Code",
    image: "Image URL",
    path: "assets/mp3/01.mp3",
    lyrics: "",
    featPath:  "assets/chars/Maya_Asset.png",
    bio: "A wizard of audio engineering, Maya is a longtime friend of Riri and a staple in her community as a mysterious master of sound. Blurring vocals into synths and creating complex soundscapes is her forte, and no one can come close. Riri and others wonder if she truly is magic, a question Maya finds a way to dodge time and time again…",
  },
  {
    name: "out of my head (feat. tracey brakes)",
    artist: "DJ Re:Code",
    image: "Image URL",
    lyrics: '<p> I can feel \r\n Out of my Words that I said \r\n Tell me the truth \r\n \r\n I can feel \r\n Out of my head \r\n Things that I said \r\n Make me aloof\r\n Tell me the truth\r\n Live through me\r\n Can\'t see (awoo)\r\n Tell me the truth\r\n\r\n I can feel\r\n Out of my head\r\n Things that I said\r\n Make me aloof\r\n Tell me the truth\r\n Live through me\r\n Can\'t see (awoo)\r\n Tell me the truth\r\n\r\n I can feel\r\n Out of my head\r\n Things that I said\r\n Make me aloof\r\n Tell me the truth\r\n\r\n Tell me the <a href="hiddenmessages/hiddenmessage1.html">truth</a>\r\n\r\n May the sea hide my sorrow\r\n Pray poseidon feels not shallow\r\n These bones unfit and hollow\r\n Foreign vessel interloper\r\n Hide behind, crumbs I find\r\n Scattered pieces of a broken lifetime\r\n Some day I, I will try\r\n To build a bridge between my body and my mind<p>',
    path: "assets/mp3/02.mp3",
    featPath: "assets/chars/Tracey_Asset.png",
    bio: "Twitter celebrity and Los Angeles socialite, Tracey is one of Riri\'s best friends and collaborators. She struts her stuff across the web and is known far and wide for her incredible beatcraft and sample packs, community organizing, and just being an all around babe. Riri has fond memories eating hot wings and getting plastered with her bestie and when the two are together all hell breaks loose - the two are a powerhouse when together and everyone around them wonders why they live across the country from one another.",
  },
  {
    name: "keeper (feat. goji! & BIO)",
    artist: "DJ Re:Code",
    image: "Image URL",
    path: "assets/mp3/03.mp3",
    lyrics: '<p> Balenciaga runners off of eBay \r\n Hit shawty on discord let\'s take an eDate \r\n Gang way, that\'s what we say \r\n I say I\'m a popstar but I cannot be replaced \r\n \r\n Y-3 t-shirt \r\n R-3 knees hurt \r\n Go wherever I want you can never be my keeper \r\n You can never be my keeper \r\n You can never be my <a href="hiddenmessages/hiddenmessage2.html">keeper</a>\r\n Instincts rewire my brain now I\'m in sync \r\n Retire the pain now my focus burning distinct \r\n Progress, distress, kiss me in your pink dress \r\n Always so concerned with all these numbers on the internet \r\n \r\n Y-3 t-shirt \r\n R-3 knees hurt \r\n Go wherever I want you can never be my keeper \r\n Wipe away my tears put some color in my pores \r\n Peer into the mirror I don\'t know them anymore \r\n \r\n Balenciaga runners off of eBay \r\n Hit shawty on discord let\'s take an eDate \r\n Gang way, that\'s what we say \r\n I say I\'m a popstar but I cannot be replaced \r\n \r\n Keep keep keep keep keep keep keeper \r\n \r\n Balenciaga runners off of eBay \r\n Hit shawty on discord let\'s take an eDate \r\n Gang way, that\'s what we say \r\n I say I\'m a popstar but I cannot be replaced </p>',
    featPath: "assets/chars/goji__bio.png",
    bio: " An enigma, a genius, a cat - Bio is everywhere. A sound design legend and maestro behind the scenes, Bio\'s samples and sound design are a staple in the community and are a driving force behind Riri\'s sound. The cat tends to lurk as a shadowy producer behind incredible projects without having much to say, but their influence is felt throughout the entire scene. Riri sometimes wonders how Bio got so orange, a question Bio answers with \"Hi Bio\" and scurries off at lightspeed, leaving many to wonder what is Bio\'s true feelings. No one has swag quite like Goji. A fashion icon and a lyrical craftsman, Goji brings their style and flair into every project they touch and Riri often envy\'s their precision. Riri met Goji through Tracey and after working together in her cramped apartment they became fast friends, spending time together in LA and relating about both having grown up in the frigid east coast.",
   
  },
  {
    name: "adhd (feat. tobre)",
    artist: "DJ Re:Code",
    image: "Image URL",
    path: "assets/mp3/04.mp3",
    lyrics: '<p> I keep tryin\' and tryin\' \r\n I keep tryin\' and tryin\' \r\n \r\n Don\'t be so certain \r\n That I\'m not worth it \r\n I am still learning \r\n And I need patience \r\n \r\n I\'m overcome with emotion I don\'t know how I feel \r\n Is this all really happening it doesn\'t feel real \r\n Every word that you say, just passes me by \r\n I keep tryna listen I keep trying and trying \r\n \r\n I\'m trying to make it all make sense \r\n Everything that I can\'t do is easy for them \r\n Maybe it\'s laziness or maybe I need friends \r\n Maybe I need help \r\n \r\n But I\'m running out of time \r\n So scared of making up my mind \r\n I know that I\'m better off alive \r\n The universe is mine \r\n \r\n But I\'m running out of time \r\n So scared of making up my mind \r\n I know that I\'m better off alive \r\n The universe is mine \r\n \r\n Don\'t be so certain \r\n That I\'m not worth it \r\n I am still learning \r\n And I need patience \r\n \r\n I can\'t wait another minute \r\n Taking me past all my limits \r\n Gotta do what\'s right for me \r\n Living out my fantasy  \r\n \r\n How many times can I explain what you don\'t wanna hear \r\n I get the same response I know I\'m patient but I taste the fear \r\n \r\n It feels like masochism \r\n Say what you wanna say \r\n Don\'t hold it back and tell me how it feels to stay away \r\n \r\n I know for sure I\'m not going back \r\n I am lost but still on the track \r\n Cuz I know for sure I\'m not going back \r\n I keep trying and trying and trying \r\n But I\'m running out of time \r\n So scared of making up my mind \r\n I know that I\'m better off alive \r\n The universe is mine \r\n \r\n Hard to breathe \r\n Every time I think of me \r\n Feels like real life fantasy \r\n Got me thinking I could be \r\n <a href="hiddenmessages/hiddenmessage3.html">Beautiful</a>, beautiful \r\n \r\n Hard to breathe \r\n Feels like real life fantasy \r\n Feels like I have ADHD \r\n Hard to breathe \r\n Every time I think of me \r\n Feels like real life fantasy \r\n Got me thinking I could be \r\n Beautiful, beautiful </p>',
    featPath: "assets/chars/Tobre_Asset.png",
    bio: " One of Riri\'s best and trusted friends, Londonite Isaac is a pop icon and lyrical and production genius. Co-founding Rock Angelz and having worked together on the classic pop anthem \"Love Connect,\" Isaac and Riri are an inseparable duo and are happy to be reunited again on ReCodePop! Riri, possessed by Isaac\'s classic \"ILYL,\" unable to stop singing its infectious chorus, dm\'d Isaac out of obsessive fervor desperate to work together, and ever since the two hit it off and have been in a bestie trio with the legendary Ryl0 and other pop icons. Isaac is a master of camp, and his connections to the drag community and the trans community in England show his devotion to queer craft. Riri has been dying to fly to London to spend some time with her bestie, but things just keep getting in the way.",
  },
  {
    name: "surrender (feat. dynastic)",
    artist: "DJ Re:Code",
    image: "Image URL",
    path: "assets/mp3/05.mp3",
    lyrics: '<p> I feel really weird \r\n My head\'s caught in a blender \r\n It\'s like all of the words you say come straight out of a webster \r\n \r\n Bloodstream filled with drugs \r\n Feeling of surrender \r\n Feel all these emotions slow down and hold me tender \r\n \r\n I feel really weird \r\n \r\n Sour like the ocean \r\n I\'m higher than the sky \r\n Feeling all the words you said Im feeling all the light \r\n Just to keep you off my mind \r\n Just to keep you off my mind \r\n \r\n I feel so weird \r\n Like a cat in a mousetrap \r\n Crying in silence, the bruise on my kneecaps \r\n Your treasure box \r\n I bury it deeper \r\n Cracks on the lock see I can\'t be your keeper \r\n \r\n I\'m having dreams of <a href="hiddenmessages/hiddenmessage4.html">you</a> again \r\n \r\n I feel so weird \r\n Like a cat in a mousetrap \r\n Crying in silence, the bruise on my kneecaps \r\n Your treasure box \r\n I bury it deeper \r\n Cracks on the lock see I can\'t be your keeper \r\n \r\n I\'m having dreams of you again </p>',
    featPath: "assets/chars/Dyna_Asset.png",
    bio: "Punkstar, rockstar, hyperpop star - no matter what you want to call Bee their skill is unmatched in all arenas. A member of I\'m Letting Unseen Forces Take the Wheel and an incredible artist in their own right, Bee met Riri through her hunt to find someone to scream on a track at the last minute, only to discover the two work powerfully in tandem and have since become fast friends. Twitter comedian and a hilarious presence to be around, Riri admires Bee\'s work ethic and style and wishes the two worked more, and plan to write guitar work together in the near future (Riri secretly hoping some of Bee\'s amazing guitar skills will rub off on her.)",
  },
  {
    name: "treasure box (feat. iris day)",
    artist: "DJ Re:Code",
    image: "Image URL",
    lyrics: '<p> I want some peace of mind \r\n Am I as good as her or shall I end my life \r\n This life unfair or am I a waste of time \r\n I guess that I just suck, why am I not surprised? \r\n \r\n \r\n Baby I don\'t wanna talk a lot \r\n Baby I just wanna show you that it hurts too much to cry \r\n And I don\'t wanna tell you much \r\n Baby I just wanna show you that it hurts a lot sometimes \r\n \r\n \r\n And it\'s so hard to stay offline \r\n Every day it\'s like im hanging by a lifeline \r\n All my friends always growing on the timeline \r\n And I\'m stuck right here in this grave of mine \r\n \r\n \r\n And I\'m stuck right here in this grave of mine \r\n \r\n \r\n I want some peace of mind \r\n Am I as good as her or shall I end my life \r\n This life unfair or am I a waste of time \r\n I guess that I just suck, why am I not surprised? \r\n \r\n \r\n Baby I don\'t wanna talk a lot \r\n Baby I just wanna show you that it hurts too much to cry \r\n And I don\'t wanna tell you much \r\n Baby I just wanna show you that it hurts a lot sometimes \r\n \r\n \r\n And it\'s so hard to stay offline \r\n Every day it\'s like im hanging by a <a href="hiddenmessages/hiddenmessage5.html">lifeline</a> \r\n All my friends always growing on the timeline \r\n And I\'m stuck right here in this grave of mine \r\n </p>',
    path: "assets/mp3/06.mp3",
    featPath: "assets/chars/Iris_Asset.png",
    bio: "In truth, Riri doesn\'t know much about Melancholia, besides that she\'s a South African lyrical prodigy and emo genius. Serious and to the point, Riri has immense respect for Mela and her influence in the scene is immense, and Riri is looking forward to a trip to see both her and their longtime mutual friend Boxkitty.",
  },
  {
    name: "threads [azure sky]",
    artist: "DJ Re:Code",
    image: "Image URL",
    path: "assets/mp3/07.mp3",
    lyrics: ' <p> I miss when \r\n I was small \r\n Didn\'t fall \r\n I stood tall \r\n \r\n \r\n You told me to go \r\n On ahead, no more threads \r\n On my little head \r\n \r\n \r\n I miss when \r\n I was small \r\n Didn\'t fall \r\n I stood tall \r\n \r\n \r\n You told me to go \r\n On ahead, no more threads \r\n On my little head, on my little head \r\n \r\n \r\n I can\'t lose you \r\n I\'m not alone \r\n You\'re the <a href="hiddenmessages/hiddenmessage6.html"> azure </a> sky \r\n I know, I know \r\n \r\n \r\n I can\'t lose you \r\n I\'m not alone \r\n You\'re the azure sky \r\n I know, I know \r\n </p>',
    featPath: "assets/chars/Recode2_Asset.png",
    bio: "DJ, producer, artist, performer and community organizer - Re:Code (also known as Riri by those close to her) is a jack of all trades, running from one exciting project to the next. She\'s worked with artists near and far, expanding her catalog and planning large scale community projects with her group the Rock Angelz. A lover of 90\'s grunge, 2000\'s pop, bloghouse, dubstep and hyperpop, Riri tries to blend as many of her influences into each of her projects,working to create a musical style all her own, recently dubbing it \"Recodepop.\" Her friends might describe her as extroverted, friendly, bubbly, even explosive at times, but alone she can be very quiet and anxious, and loves her alone time to spend tinkering on remixes and planning months into the future, daydreaming. A trans lesbian, Riri is extremely proud of her identity and makes sure her presence is known wading through the vast community, embracing the challenges she may face along the way. Her (lesbian) boyfriend would describe her as stubborn, bullheaded, yet extremely determined and affectionate, and he loves watching Riri fix her motorbike and take long cat naps. The only thing he doesn\'t seem to know is the details of Riri\'s clouded past, which according to her she remembers very little of. All he knows for sure is Riri left home at a young age and has been reinventing herself ever since, producing and DJing in the underground for many years. He also claims Riri can see ghosts, which she always chalks up to dissociating when on stage or writing music - while in the zone."
  },
  {
    name: "45 (feat. mothgirl)",
    artist: "DJ Re:Code",
    image: "Image URL",
    path: "assets/mp3/08.mp3",
    lyrics: '<p> Forty five minute drive \r\n Memories flow like water \r\n Crystal blue skies \r\n Forgive sins of the mother \r\n \r\n \r\n I apologize for my actions \r\n Words that cut like knives \r\n When I\'m alone my heart splinters, factions \r\n With you I can thrive \r\n \r\n \r\n Forty five minute drive \r\n To the other side \r\n Melancholy sunrise \r\n Spread your wings and fly \r\n \r\n \r\n Bottle up those sapphire tears \r\n Roll the windows down \r\n There\'s nothing to fear \r\n As long as I\'m around \r\n \r\n \r\n Adverse conditions up ahead \r\n We\'ll brave the stormy weather \r\n No matter what happens till the end \r\n We\'ll get through it together \r\n \r\n \r\n Adverse conditions up ahead \r\n We\'ll brave the stormy weather \r\n No matter what happens till the end \r\n We\'ll get through it together \r\n \r\n \r\n Forty five minute drive \r\n Till the other side \r\n Melancholy sunrise \r\n Spread your wings and fly \r\n \r\n \r\n Bottle up those sapphire tears \r\n Roll the windows down \r\n There\'s nothing to fear \r\n As long as I\'m around \r\n \r\n \r\n The box is shattered on one side \r\n She says it\'s my fault but I\'m not sure how \r\n It still seems clear to me but she says \r\n Now she has to get out of this house \r\n Is this something I could\'ve prevented? \r\n When I don\'t even know what I\'ve done wrong? \r\n \r\n \r\n Give me one more chance to redeem myself my only friend \r\n What happened when we said It was just us till the<a href="hiddenmessages/hiddenmessage7.html"> bitter</a> end \r\n \r\n \r\n Abstract thoughts fill my head when I drown in silence I feel dead \r\n Give me strength to go on now and if you don\'t I\'m sure I\'ll find a way \r\n \r\n \r\n Adverse conditions up ahead \r\n We\'ll brave the stormy weather \r\n No matter what happens till the end \r\n We\'ll get through it together \r\n \r\n \r\n We\'ll get through it together \r\n \r\n \r\n No matter what happens till the end \r\n We\'ll get through it together \r\n \r\n \r\n We\'ll get through it together \r\n </p>',
    featPath: "assets/chars/Astra_Asset 2.png",
    bio:"Despite having known Astra for well under a year\'s span, Astra and Riri have become besties and have worked both through the web and together in person. The immensely tall and stunning moth woman never ceases to surprise Riri with her talents and can seemingly write captivating music in almost any genre, and the two are regularly chatting on the timeline and shooting the shit together in text. Riri wishes Tracey could come visit so the three could party together, as all three of their energies would likely gel into a hilarious blend of internet nonsense and fun. Riri has immense respect for Astra\'s unflinching seriousness when it comes to internet drama and feels grounded by her presence.",
  },
  {
    name: "near",
    artist: "DJ Re:Code",
    image: "Image URL",
    path: "assets/mp3/09.mp3",
    lyrics: "",
    featPath: "assets/chars/Recode2_Asset.png",
    bio: "DJ, producer, artist, performer and community organizer - Re:Code (also known as Riri by those close to her) is a jack of all trades, running from one exciting project to the next. She\'s worked with artists near and far, expanding her catalog and planning large scale community projects with her group the Rock Angelz. A lover of 90\'s grunge, 2000\'s pop, bloghouse, dubstep and hyperpop, Riri tries to blend as many of her influences into each of her projects,working to create a musical style all her own, recently dubbing it \"Recodepop.\" Her friends might describe her as extroverted, friendly, bubbly, even explosive at times, but alone she can be very quiet and anxious, and loves her alone time to spend tinkering on remixes and planning months into the future, daydreaming. A trans lesbian, Riri is extremely proud of her identity and makes sure her presence is known wading through the vast community, embracing the challenges she may face along the way. Her (lesbian) boyfriend would describe her as stubborn, bullheaded, yet extremely determined and affectionate, and he loves watching Riri fix her motorbike and take long cat naps. The only thing he doesn\'t seem to know is the details of Riri\'s clouded past, which according to her she remembers very little of. All he knows for sure is Riri left home at a young age and has been reinventing herself ever since, producing and DJing in the underground for many years. He also claims Riri can see ghosts, which she always chalks up to dissociating when on stage or writing music - while in the zone."

  },
  {
    name: "out of my head [pt. 2] (feat. 65finally)",
    artist: "DJ Re:Code",
    image: "Image URL",
    path: "assets/mp3/10.mp3",
    lyrics: " I can feel \r\n Out of my head \r\n Words that I said \r\n Tell me the truth \r\n \r\n \r\n I can feel \r\n Out of my head \r\n Things that I said \r\n Make me aloof \r\n Tell me the truth \r\n \r\n \r\n Live through me \r\n Can\'t see (awoo) \r\n Tell me the truth \r\n \r\n \r\n I can feel \r\n Out of my head \r\n Things that I said \r\n Make me aloof \r\n Tell me the truth \r\n \r\n \r\n Live through me \r\n Can\'t see (awoo) \r\n Tell me the truth \r\n \r\n \r\n I can feel \r\n Out of my head \r\n Things that I said \r\n Make me aloof \r\n Tell me the truth \r\n \r\n \r\n Tell me the truth ",
    featPath: "assets/chars/Judas._Asset.png",
    bio: "One of the funniest people Riri knows, Judas\'s dark humor and bewildering internet presence can trick one into thinking they must be an abstract experimental musician, but Judas has a golden voice and their harmonies alone can make Riri cry. Ever since listening to Judas sing a breathtaking rendition of a Ween\'s \"What\'s Deaner Talking About,\" Riri has been possessed to work with the mysterious artist and is happy to have finally have their velvet melodies on one of her songs.",
  },
];
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
  // track_art.style.backgroundImage = 
  //    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  // track_artist.textContent = track_list[track_index].artist;
  // track_lyrics.innerHTML = track_list[track_index].lyrics;
  // track_bio.textContent = track_list[track_index].bio;
  // track_feature.src= track_list[track_index].featPath;
  
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
  
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
  
  // Apply a random background color
  // random_bg_color();
}
  
// function random_bg_color() {
//   // Get a random number between 64 to 256
//   // (for getting lighter colors)
//   let red = Math.floor(Math.random() * 256) + 64;
//   let green = Math.floor(Math.random() * 256) + 64;
//   let blue = Math.floor(Math.random() * 256) + 64;
  
//   // Construct a color withe the given values
//   let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
  
//   // Set the background to the new color
//   document.body.style.background = bgColor;
// }
  
// Function to reset all values to their default
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
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
  
function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
  
  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
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