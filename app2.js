//Onload functions

function loadMe() { //onload functions
    greeting();
    getWeather();
}

//**********************************************************************

// Global variables and functions of clocking in/out

clockedOut = true;
var clockedIn;

if (clockedOut == true) {
    document.getElementById("greet2").innerHTML = "Would you like to clock in?";
    document.getElementById("btn").addEventListener("click", negClock);
}

function negClock() {
    clockedIn = true;
    clockedOut = false;
    if (clockedIn == true) {
        alert('You successfully clocked in at ' + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
        //document.getElementById("#table").innerHTML = "<div>Clock In:</div>";
        document.getElementById("greet2").innerHTML = "You are clocked in.<br/>Would you like to clock out?";
        document.getElementById("btn").value = "Clock Out";
        document.getElementById("btn").addEventListener("click", posClock);
        document.getElementById("btn").removeEventListener("click", negClock);
    }
}// bottom negclock


function posClock() {
    clockedOut = true;
    clockedIn = false;
    if (clockedOut == true) {
        alert('You successfully clocked out at ' + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
        //document.getElementById("#table").innerHTML = "<div>Clock Out: </div>";
        document.getElementById("greet2").innerHTML = "Would you like to clock in?";
        document.getElementById("btn").value = "Clock In";
        document.getElementById("btn").addEventListener("click", negClock);
        document.getElementById("btn").removeEventListener("click", posClock);
    }

}//bottom posclock

//**********************************************************************

function greeting() { //this funcdtion is run once a second to consistently update time and greeting.

    //defining time variables

    var today = new Date();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();

    //defining greeting based on military time

    if (hour >= 5 && hour < 12) {
        document.getElementById("greet1").innerHTML = "Good morning.";
        document.getElementById("greet1").style.backgroundColor = "#EE7600B3";
    }
    if (hour >= 12 && hour < 18) {
        document.getElementById("greet1").innerHTML = "Good afternoon.";
        document.getElementById("greet1").style.backgroundColor = "#037dd8B3";
    }
    if (hour >= 18 && hour < 22) {
        document.getElementById("greet1").innerHTML = "Good evening.";
        document.getElementById("greet1").style.backgroundColor = "#166f72B3";
    }
    if (hour >= 22 && hour < 25 || hour >= 1 && hour < 5) {
        document.getElementById("greet1").innerHTML = "It's very late.";
        document.getElementById("greet1").style.backgroundColor = "#171616B3";
    }

    //setting meridiem based on military time

    if (hour < 12) {
        meridiem = '<span id="meridiem">A.M.</span>'
    } else {
        meridiem = '<span id="meridiem">P.M.</span>'
    }

    //converting military time to standard for display

    if (hour > 12) {
        hour = hour - 12;
    }

    //including "0" as prefix, when applicable, in time variable strings.

    if (minute < 10) { minute = "0" + minute; }
    if (second < 10) { second = "0" + second; }

    var currTime = hour + ":" + minute + ":" + second + " " /*+ "<br/>"*/ + meridiem;
    document.getElementById("currTime").innerHTML = currTime;



    //***************************************************************

} // bottom of Greeting

setInterval(greeting, 1000);

//**********************************************************************

function getWeather() { // app for current weather display
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=herriman&APPID=2d4218e7c1d0cbbcb95995dfa157e413&units=imperial', true);
    //lat=40&long=112
    xhr.onload = function () {

        if (this.status == 200) {
            var currWeather = JSON.parse(this.responseText);
            document.getElementById('weather').innerHTML = currWeather.name + ', ' + Math.round(currWeather.main.temp) + '<span id="far">&#8457;</span>';
        } else if (this.status == 404) {
            alert("Sorry :/ i'm currently unable to display the weather.")
        }
    }
    xhr.send();
}
