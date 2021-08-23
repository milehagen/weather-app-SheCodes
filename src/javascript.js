
// Current Date: Monday | May 17th | 12:11pm

let currentDate = new Date();
let h2 = document.querySelector("#current-date");
let days= [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday", 
]
let day= days[currentDate.getDay()];

let months= [
    "Dec", 
    "Jan", 
    "Feb", 
    "Mar", 
    "Apr",
    "Jun", 
    "Jul",
    "Aug", 
    "Sept", 
    "Oct", 
    "Nov",
];


let month= months [currentDate.getMonth()];
let date= currentDate.getDate();
let hour=currentDate.getHours();
//timeFormat if hour is less than 10

if (hour<10){
    hour=`0${hour}`;
}
let minutes= currentDate.getMinutes();

//timeFormat if minutes is less than 10
if (minutes<10){
    minutes=`0${minutes}`;
}

//Clean-up date

function formatDay(timeStamp){
    let date = new Date(timeStamp* 1000);
    let day= date.getDay();
    let days = [
    "Sun", 
    "Mon", 
    "Tues", 
    "Wed", 
    "Thur", 
    "Fri", 
    "Sat",]

return days[day];
    }

h2.innerHTML= (`${day} | ${month} ${date} | ${hour}:${minutes}`);


//change background color

function dayAndNight(){
    let current = new Date();
    let day_night = current.getHours();
    //afternoon
        if (day_night>=6 && day_night<18){
            let background= document.querySelector("#container");
            let body=document.querySelector("#body");
            background.style.backgroundColor="rgb(147,217,238)";
            background.style.background="linear-gradient(0deg, rgba(147,217,238,1) 0%, rgba(3,104,161,1) 100%)";
            body.style.backgroundColor="rgb(147,217,238)";
            body.style.background="linear-gradient(0deg, rgba(147,217,238,1) 0%, rgba(3,104,161,1) 100%)";
 
        }
        //early evening
        else if (day_night>=18 && day_night<21 ) {
            let background= document.querySelector("#container");
            let body=document.querySelector("#body");
            background.style.backgroundColor="rgb(187,90,6)";
            background.style.background="linear-gradient(0deg, rgba(187,90,6,1) 14%, rgba(224,186,118,1) 47%, rgba(69,127,190,1) 90%)";
            body.style.backgroundColor="rgb(187,90,6)";
            body.style.background="linear-gradient(0deg, rgba(187,90,6,1) 14%, rgba(224,186,118,1) 47%, rgba(69,127,190,1) 90%)";
       }
        //late evening
        else if (day_night>=21 || day_night<4)  {
            let background= document.querySelector("#container");
            let body=document.querySelector("#body");
            background.style.backgroundColor="rgb(55,79,120)";
            background.style.background="linear-gradient(0deg, rgba(55,79,120,1) 14%, rgba(4,34,68,1) 90%)";
            body.style.backgroundColor="rgb(55,79,120)";
            body.style.background="linear-gradient(0deg, rgba(55,79,120,1) 14%, rgba(4,34,68,1) 90%)";
        }
        
        //morning 04:00-05:59 

        else {
        let background=document.querySelector("#container");
        background.style.backgroundColor="rgb(47,143,217)";
        background.style.background="linear-gradient(180deg, rgba(47,143,217,1) 21%, rgba(235,195,84,0.9570203081232493) 74%, rgba(195,105,31,1) 95%)";
        }
        

}

dayAndNight();

//display-5-day-Weather-Forecast
function displayForecast(response){
    let forecast= response.data.daily;

    let forecastElement=document.querySelector("#forecast");

    let forecastHTML=`<div class="row" id="five-day-forecast">`;

 forecast.forEach(function(forecastDay, index){
    if (index < 6){
    forecastHTML = 
    forecastHTML +

`
      <div  class="col-2">
       <div class="forecast-day"> ${formatDay(forecastDay.dt)}</div>
        <div><img 
        id="icon"
        src="img/${forecastDay.weather[0].icon}.png"
        width=60px;
        alt= "weather image"
        />
        </div>
       
        <div id="max-min-temp"><span class="minTemp">${Math.round(forecastDay.temp.min)}º<br></span><span class="maxTemp">${Math.round(forecastDay.temp.max)}º</span></div>       
    
        `;
     }
    forecastHTML= forecastHTML+`</div>`;
 });

    forecastElement.innerHTML=forecastHTML;

}

//retrieve-city-coordinates

function getCoordinates(coordinates){
    let lat =coordinates.lat;
    let lon= coordinates.lon;
    let units = "metric";
    let apiKey="7bc66b8226689078b2ef89f11a04633c";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
}

//show-user's-cityTemp

function showUserTemperature(response){
    let winSpeed = document.querySelector("#wind-speed");
    let humidity = document.querySelector("#humidity-percentage");
    let cityHeadline = document.querySelector("h1");
    let displayCurrentDegrees=document.querySelector("#current-degrees-display");
    let currentWeatherDescription=document.querySelector("h4");
    let weatherIcon = document.querySelector("#weather-icon");


    winSpeed.innerHTML=`${Math.round(response.data.wind.speed)} Km/hr`;
    humidity.innerHTML=`${response.data.main.humidity}%`;
    cityHeadline.innerHTML= response.data.name.toUpperCase();
    displayCurrentDegrees.innerHTML=`${Math.round(response.data.main.temp)}ºC`;
    currentWeatherDescription.innerHTML= response.data.weather[0].description;
    weatherIcon.setAttribute("src", `img/${response.data.weather[0].icon}.png`);  

    getCoordinates(response.data.coord);
    

}
//Search-city

function search (city){
let apiKey = "7bc66b8226689078b2ef89f11a04633c"; 
        let units = "metric";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
        axios.get(apiUrl).then(showUserTemperature);
        
}

//handle Submit
function handleSubmit(event) {
    event.preventDefault();        
        let city = document.querySelector("#change-city-box").value;

        search(city);
    }

function showUsersLocationWeather(response){
    let apiKey="7bc66b8226689078b2ef89f11a04633c"
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${response.coords.latitude}&lon=${response.coords.longitude}&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(showUserTemperature);
}

//fetch users' current location
function fetchUsersLocation(event){
    event.preventDefault();
navigator.geolocation.getCurrentPosition(showUsersLocationWeather);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

let locationIcon = document.querySelector("#location-icon");
locationIcon.addEventListener("click", fetchUsersLocation)

search ("Oslo");