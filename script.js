console.log("Welcome to Spotify" ); 

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songStatus = 0;


let songs = [
    {songName: "Salam-e", filePath: "song/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Salam-ishq", filePath: "song/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Sishq", filePath: "song/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Salamishq", filePath: "song/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Salahq", filePath: "song/5.mp3", coverPath: "covers/5.jpg"},
]

songItems.forEach((element , i)=>{
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})
// audioElement.play();

// handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        songStatus = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        songStatus = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle'); 
        element.classList.add('fa-play-circle');

    })  
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
    
   
        makeAllPlays();
        songIndex = parseInt(e.target.id);
      
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src =`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        songIndex = 1;
    })

    }
)

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>=4){
        songIndex = 0;
    }
    else{
        songIndex += 1;
        }
        audioElement.src =`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        songStatus = 1;
})


document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex = 4;
    }
    else{
        songIndex -= 1;
        }
        audioElement.src =`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        songStatus = 1;
})

document.getElementsByClassName('songItemPlay').addEventListener('click' , ()=>{
    if(songStatus==1){
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        songStatus = 0;
    }
})