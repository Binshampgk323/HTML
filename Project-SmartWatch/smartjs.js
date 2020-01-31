//index page time and date

window.onload = function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var dy = today.getDate();
    var mn = today.getMonth() + 1;
    var yr = today.getFullYear();
    m = checkTime(m);
    s = checkTime(s);
    mn = checkTime(mn);
    document.getElementById('tm').innerHTML = h + ":" + m + ":" + s;
    document.getElementById('dte').innerHTML = dy + ":" + mn + ":" + yr;
    var t = setTimeout(startTime, 500);

};

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

function todayTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    min = checkTime(min);
    document.getElementById('hd').innerHTML = hr + ":" + min;

}

//end index


// Message button

function openMsg() {
    todayTime();
    document.getElementById('titlename').innerHTML = "Message";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("GET", "msg.html", true);
    xhttp.send();
}

//Music button

function openMusic() {
    todayTime();
    document.getElementById('titlename').innerHTML = "Music";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("GET", "song.html", true);
    xhttp.send();


}

//Stop Watch button

function openClock() {
    todayTime();
    document.getElementById('titlename').innerHTML = "Clock";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "alarm.html", true);
    xhttp.send();
}



// Start music
function display(value) {
    console.log(vaue);
    if (value.style.display === "none")
        value.style.display = "block";
    else
        value.style.display = "none";
}
var music = "";
var index = 0; // used as a index value for changing songs
var singer = "";
var songname = "";

var xhr = new XMLHttpRequest(); // to interact with server without reloading a page
function playpause() //timer method
{
    var m = document.getElementById("plps");
    var n = document.getElementById("music");

    /* var s = document.getElementById("music"); */

    xhr.onload = function() { //to load jason                  
        responseObject = JSON.parse(xhr.responseText); // to convert string to objects
        music = responseObject.songs[index].file;
        singer = responseObject.songs[index].artist;
        songname = responseObject.songs[index].name;

    };
    xhr.open('GET', 'data.json', true);
    xhr.send(null);

    if (m.className == "fa fa fa-play fa-3x") // checking class name
    {

        m.className = "fa fa-pause fa-3x";
        n.src = music;
        document.getElementById("song").innerHTML = songname;
        document.getElementById("singer").innerHTML = singer;
        n.play();

    } else {
        m.className = "fa fa fa-play fa-3x"; // class name change
        n.pause();
    }

}


function previoussong() //previous song fuunction
{
    var n = document.getElementById("music");
    n.pause();
    index--; // decrementing index
    playpause();
}

function nextsong() //next fong function
{
    var n = document.getElementById("music");
    n.pause();
    index++; // incrementing index value
    playpause(); // calling function to play next song
}

// end Music

// Sent message

function msgSent() {
    var num = document.getElementById("txtphone").value;
    var msgg = document.getElementById("txtmessage").value;
    document.getElementById("phno").innerHTML = num;
    document.getElementById("msg").innerHTML = msgg;
}


// Start Stop Watch

var clsStopwatch = function() {
    // Private vars
    var startAt = 0; // Time of last start / resume. (0 if not running)
    var lapTime = 0; // Time on the clock when last stopped in milliseconds

    var now = function() {
        return (new Date()).getTime();
    };

    // Public methods
    // Start or resume
    this.start = function() {
        startAt = startAt ? startAt : now();
    };

    // Stop or pause
    this.stop = function() {
        // If running, update elapsed time otherwise keep it
        lapTime = startAt ? lapTime + now() - startAt : lapTime;
        startAt = 0; // Paused
    };

    // Reset
    this.reset = function() {
        lapTime = startAt = 0;
    };

    // Duration
    this.time = function() {
        return lapTime + (startAt ? now() - startAt : 0);
    };
};

var x = new clsStopwatch();
var $time;
var clocktimer;

function pad(num, size) {
    var s = "0000" + num;
    return s.substr(s.length - size);
}

function formatTime(time) {
    var h = m = s = ms = 0;
    var newTime = '';

    h = Math.floor(time / (60 * 60 * 1000));
    time = time % (60 * 60 * 1000);
    m = Math.floor(time / (60 * 1000));
    time = time % (60 * 1000);
    s = Math.floor(time / 1000);
    ms = time % 1000;

    newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
    return newTime;
}

function show() {
    $time = document.getElementById('time');
    update();
}

function update() {
    $time.innerHTML = formatTime(x.time());
}

function start() {
    clocktimer = setInterval("update()", 1);
    x.start();
}

function stop() {
    x.stop();
    clearInterval(clocktimer);
}

function reset() {
    stop();
    x.reset();
    update();
}

//End Stop Watch