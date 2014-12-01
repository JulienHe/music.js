var player;
var intv;
var slider;
//Init
//
////////////////////////////
window.onload = function()
{
    document.getElementById('btnPlay').addEventListener('click', playMusic, false);
    document.getElementById('btnPause').addEventListener('click', pauseMusic, false);
    document.getElementById('btnStop').addEventListener('click', stopMusic, false);
    document.getElementById('btnMute').addEventListener('click', muteMusic, false);
    player = document.getElementById('player');
    updateVolume(1);
}


//Play music
function playMusic(){
    player.play();
    intv = setInterval(update, 100);
    //slider.max = player.duration;
    getFullTime();
}

//Pause the music
function pauseMusic(){
    player.pause();
    clearInterval(intv);
}

//Stop the music
function stopMusic(){
    player.pause();
    player.currentTime = 0;
    document.getElementById('currentPourcent').style.width = 0;
    document.getElementById('songTime').innerHTML = millisToMins(player.currentTime);
    clearInterval(intv);
}

//Mute the music
function muteMusic(){
    if(player.muted == true){
        player.muted = false;
        document.getElementById('currentVolume').style.maxWidth = "100%";
    }else{
        player.muted = true;
        document.getElementById('currentVolume').style.maxWidth = "0";
    }
}

function updateVolume(volume){
    player.volume = volume;
    //Reposition the cursor for the player
    updateVolumeWidth();
    document.getElementById('currentVolume').style.maxWidth = "100%";
    if(player.volume > 0){
        player.muted = false;
    }
}

function volUp()
{
    if(player.volume < 1)
    {
        player.volume += 0.1;
    } else {
        player.volume = 1;
    }
    updateVolumeWidth();
}

function volDown()
{
    if(player.volume > 0)
    {
        player.volume -= 0.1;
    } else {
        player.volume = 0;
    }
    updateVolumeWidth();
}

function updateVolumeWidth(){
    document.getElementById('currentVolume').style.width=(player.volume * 100) + "%";
}

//All event to match keyboard event
$("body").keyup(function(e) {
    console.log(e.keyCode);
    switch(e.keyCode) {

        //If we touch Space
        case 32:
            if (player.paused == false) {
                pauseMusic();
            } else {
                playMusic();
            }
        break;
        //If we touche "M" for mute
        case 77:
            muteMusic();
        break;

        //If we touch "+"
        case 187:
            volUp();
        break;

        //If we touch "-"
        case 189:
            volDown();
        break;

        //Default
        default:
            console.log('No keyboard matching');
    }
});


//Function to update the second on the player
function update(){
    document.getElementById('songTime').innerHTML = millisToMins(player.currentTime);
    var currentTimeUp = player.currentTime;
    var durationUp = player.duration;
    var currentPourcent = (currentTimeUp/durationUp) * 100;
    document.getElementById('currentPourcent').style.width = currentPourcent + "%";
    buffer();
}

function buffer(){
    var currentTime = player.currentTime;
    var duration = player.duration;
    var buffer = player.buffered.end(player.buffered.length-1);
    document.getElementById('bufferPourcent').style.width = ( buffer / duration ) * 100 + "%";
}


//Function to get the fulle time of a music
function getFullTime()
{
    document.getElementById('songTimeFull').innerHTML = millisToMins(player.duration);
}

//Function to get second for the music
function millisToMins(seconds)
{
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    if (numseconds >= 10)
    {
        return numminutes + ":" + Math.round(numseconds);
    } else
    {
        return numminutes + ":0" + Math.round(numseconds);
    }
}


//Reposition of audio
function reposition(valuePosition)
{
    player.currentTime = valuePosition;
}