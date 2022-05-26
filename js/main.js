const container = document.querySelector(".container"),
musicImg = container.querySelector(".music-image img"),
musicName = container.querySelector(".music-text .name"),
 musicArtist = container.querySelector(".music-text .artist"),
 musicAudio = container.querySelector("#main-audio"),
 playPauseBtn = container.querySelector (".play-pause"),
 nextBtn = document.querySelector("#next"),
 prevBtn = container.querySelector("#prev"),
 progressArea = container.querySelector(".progress-area"),
 progressBar = container.querySelector(".progress-bar"),
 musicList = container.querySelector(".music-list"),
 moreMusic = container.querySelector("#more-music"),
 closeBtn = container.querySelector("#close-btn");

let isPlaying = false;
let musicIndex = 1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingSong();
});

//for the load music function.
//This changes all  info int the array stored to the song-list.file according to the current song playing.

function loadMusic(indexNum){
    musicName.innerText = allSongs[indexNum - 1].name;
    musicArtist.innerText = allSongs[indexNum - 1].artist;
    musicImg.src = `images/${allSongs[indexNum - 1].img}.jpg`;
    musicAudio.src = `songs/${allSongs[indexNum - 1].img}.mp3`;
}

//play music function 
function playMusic(){
    container.classList.add("paused");
    playPauseBtn.querySelector("i").innerText ="pause";
    musicAudio.play();
    isPlaying = true;

}

//Next music function
function nextMusic(){
    musicIndex++;// the music index(songs) should nbe increased by one.
    //if music Index is greater than the array length,the music should start from 1(start) again. or it should just end there.

    if(musicIndex > allSongs.length){
        musicIndex = 1;
    }
    else{
        musicIndex = musicIndex;
    }
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

function prevMusic(){
    musicIndex--;// the music index(songs) should nbe increased by one.
    //if music Index is less than the array length,the music should start from 1(start) again. or it should just end there.
    
    if(musicIndex < 1){
        musicIndex = allSongs.length;
    }
    else{
        musicIndex = musicIndex;
    }
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

//pause music function

function pauseMusic(){
    container.classList.add("paused");
    playPauseBtn.querySelector("i").innerText ="play_arrow";
    musicAudio.pause();
    isPlaying = false;
    
}

//play  or pause button  click event
playPauseBtn.addEventListener("click", ()=>{
    const pauseMyMusic = container.classList.contains("paused");
    //it means the function should pause the current music playing or else play  the current music.
    isPlaying ? pauseMusic() : playMusic();

});

//The next button event
nextBtn.addEventListener("click", ()=> {
    nextMusic();
})

//prev button event.
prevBtn.addEventListener("click", ()=> {
    prevMusic();

});

//the progress-bar width should be updated according to the length of the song.
musicAudio.addEventListener("timeupdate",(e)=>{
    const currentTime = e.target.currentTime;//this is for the playing song current time.
    const duration = e.target.duration;//getting the song total song duration.
    let progressWidth = (currentTime / duration)* 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = container.querySelector(".current-time")
    let musicDuration = container.querySelector(".max-duration");
    musicAudio.addEventListener("loadeddata", ()=>{
    // this is to update the total song duration.
 let mainDuration = musicAudio.duration;
 let totalMin = Math.floor(mainDuration / 60);
 let totalSec = Math.floor(mainDuration/ 60);
  if(totalSec < 10) {
     totalSec = `0${totalSec}`;
 }

 //This updates the time of the current music playing.

 musicDuration.innerText = `${totalMin}:${totalSec}`;

});

    let currentMin = Math.floor(currentTime / 60);
 let currentSec = Math.floor(currentTime % 60);

  if(currentSec < 10) {
     currentSec = `0${currentSec}`;
 }

 musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

});

//This is to update the width of the current song playing to the progress-bar width.

progressArea.addEventListener("click",(e)=> {
    let progressWidth = progressArea.clientWidth; //to get the width of the progress bar.
     let clickedOffsetX = e.offsetX;
     let songDuration = musicAudio.duration; //To get the total song duration.

     musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
     playMusic();  // calling back the play music function.
     // calling back the pause music function.
});

//to change the loop,repeat song or shuffle onclick.

const repeatBtn = container.querySelector("#repeat-music");
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText;

    // using the switch condition to change the icons using innertext  and the set attribute displays what each icon does.
    switch (getText){
        case "repeat":
            repeatBtn.innerText ="repeat_one";
            repeatBtn.setAttribute("title","song looped");
            break;
            case "repeat_one":
            repeatBtn.innerText ="shuffle";
            repeatBtn.setAttribute("title","playback shuffled");
            break;
            case "shuffle":
            repeatBtn.innerText ="repeat";
            repeatBtn.setAttribute("title", "playlist looped");
            break;
    }
});

//to craete an action when the song has ended

musicAudio.addEventListener("ended",()=>{
    let getText = repeatBtn.innerText;

switch (getText){
    case "repeat":
        nextMusic();
        //calling the next music fuction so that the next song automatically plays after the current music has ended.
        break;
        case "repeat_one":
       musicAudio.currentTime = 0;//setting the current audio time to 0. 
       loadMusic(musicIndex);//calling the load music function which takes an argument of the current song playing.
       playMusic();//calling the play music function.
        break;
        case "shuffle":
       let randIndex = Math.floor((Math.random() * allSongs.length) + 1);//this is to shuffle the music
        // using the do...while conditional function.
        do{
            randIndex = Math.floor((Math.random() * allSongs.length) + 1);
        }while(musicIndex == randIndex);//this loops run until the next number won't be the same with the current number
        musicIndex = randIndex;//this passes the random number to the music index.
        loadMusic(musicIndex);
        playMusic();
        break;
}
});

// this is use to show the music list
moreMusic.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});

// to exit the music list
closeBtn.addEventListener("click", ()=>{
   moreMusic.click();
});

const ulTag = container.querySelector("ul");

//creating the music li tag according to the allSongs array length list.

for (let i = 0; i < allSongs.length; i++) {
    let liTag = `<li li-index="${i + 1}">
    <div class="row">
        <span>${allSongs[i].name}</span>
        <p>${allSongs[i].artist}</p>
    </div>
    <audio class="${allSongs[i].src}" src="songs/${allSongs[i].src}.mp3"></audio>
    <span id="${allSongs[i].src}" class="audio-duration">1:45</span>
</li>`;

ulTag.insertAdjacentHTML("beforeend", liTag);

let liAudioDurationTag = ulTag.querySelector(`#${allSongs[i].src}`);

let liAudioTag = ulTag.querySelector(`.${allSongs[i].src}`);

// this updates  the duration of the songs in  the music list
liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
     if(totalSec < 10) {
        totalSec = `0${totalSec}`;
     }

     liAudioDurationTag.innerText = `${totalMin} : ${totalSec}`;
});
}

//To play a particular song from the list on click of the li tag.

const allLiTag = ulTag.querySelectorAll("li");
function playingSong() {
    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        //To remove the playing class from all other li except the one which is clicked.
        
        if(allLiTag[j].classList.contains("playing")){
            allLiTag[j].classList.remove("playing");
            //removes the innertext playing
            audioTag.innerText = "";
        }
    
        //if there is an li tag in which li index is equal to musicIndex then the playing class should be added(already style with css) music is going to be pink color while the music is playing.

        if(allLiTag[j].getAttribute("li-index") == musicIndex){
            allLiTag[j].classList.add("playing");
            //adds playing to the current music being played
            audioTag.innerText = "Playing";
        }
    
        //adding onclick event in all the li tags.
        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

//for the songs to automatically play when clicked.
function clicked(element){
    //to get the li index of a particular clicked song.

    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong(); 
}