// ======================
// Elements
// ======================

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playlist = document.getElementById("playlist");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const search = document.getElementById("search");
const category = document.getElementById("category");

// ======================
// Songs
// ======================

const songs = [

{
title:"Perfect",
artist:"Ed Sheeran",
category:"Pop",
src:"songs/perfect.mp3",
cover:"images/cover1.jpg"
},

{
title:"Believer",
artist:"Imagine Dragons",
category:"Rock",
src:"songs/believer.mp3",
cover:"images/cover2.jpg"
},

{
title:"Faded",
artist:"Alan Walker",
category:"Pop",
src:"songs/faded.mp3",
cover:"images/cover3.jpg"
},

// {
// title:"River Flows In You",
// artist:"Yiruma",
// category:"Instrumental",
// src:"songs/rivers.mp3",
// cover:"images/cover4.jpg"
// }

];

// ======================

let songIndex = 0;
let isPlaying = false;

// ======================
// Load Song
// ======================

function loadSong(index){

title.textContent = songs[index].title;
artist.textContent = songs[index].artist;
cover.src = songs[index].cover;
audio.src = songs[index].src;

highlightSong(index);

}

// ======================
// Play
// ======================

function playSong(){

audio.play();
isPlaying = true;

playBtn.innerHTML =
'<i class="fa-solid fa-pause"></i>';

}

// ======================
// Pause
// ======================

function pauseSong(){

audio.pause();
isPlaying = false;

playBtn.innerHTML =
'<i class="fa-solid fa-play"></i>';

}

// ======================
// Buttons
// ======================

playBtn.addEventListener("click",()=>{

if(isPlaying){

pauseSong();

}else{

playSong();

}

});

nextBtn.addEventListener("click",nextSong);
prevBtn.addEventListener("click",prevSong);

// ======================
// Next
// ======================

function nextSong(){

songIndex++;

if(songIndex>=songs.length){

songIndex=0;

}

loadSong(songIndex);
playSong();

}

// ======================
// Previous
// ======================

function prevSong(){

songIndex--;

if(songIndex<0){

songIndex=songs.length-1;

}

loadSong(songIndex);
playSong();

}

// ======================
// Playlist
// ======================

function createPlaylist(){

playlist.innerHTML="";

songs.forEach((song,index)=>{

const li=document.createElement("li");

li.innerHTML=`${song.title}<br><small>${song.artist}</small>`;

li.addEventListener("click",()=>{

songIndex=index;
loadSong(songIndex);
playSong();

});

playlist.appendChild(li);

});

}

createPlaylist();

// ======================
// Highlight Song
// ======================

function highlightSong(index){

const items=document.querySelectorAll("#playlist li");

items.forEach(item=>item.classList.remove("active-song"));

if(items[index]){

items[index].classList.add("active-song");

}

}

// ======================
// Progress
// ======================

audio.addEventListener("timeupdate",()=>{

if(audio.duration){

progress.max=audio.duration;
progress.value=audio.currentTime;

currentTime.textContent=formatTime(audio.currentTime);
duration.textContent=formatTime(audio.duration);

}

});

progress.addEventListener("input",()=>{

audio.currentTime=progress.value;

});

// ======================
// Volume
// ======================

volume.addEventListener("input",()=>{

audio.volume=volume.value;

});

audio.volume=1;

// ======================
// Auto Next Song
// ======================

audio.addEventListener("ended",()=>{

nextSong();

});

// ======================
// Time
// ======================

function formatTime(time){

let min=Math.floor(time/60);
let sec=Math.floor(time%60);

if(sec<10){

sec="0"+sec;

}

return `${min}:${sec}`;

}

// ======================
// Search
// ======================

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll("#playlist li").forEach((item,index)=>{

item.style.display=
songs[index].title.toLowerCase().includes(value)
? "block"
: "none";

});

});

// ======================
// Category
// ======================

category.addEventListener("change",()=>{

const value=category.value;

document.querySelectorAll("#playlist li").forEach((item,index)=>{

if(value==="all"){

item.style.display="block";

}

else{

item.style.display=
songs[index].category===value
? "block"
: "none";

}

});

});

// ======================
// Keyboard
// ======================

document.addEventListener("keydown",(e)=>{

if(e.code==="Space"){

e.preventDefault();

if(isPlaying){

pauseSong();

}else{

playSong();

}

}

if(e.code==="ArrowRight"){

nextSong();

}

if(e.code==="ArrowLeft"){

prevSong();

}

});

// ======================
// First Song
// ======================

loadSong(songIndex);