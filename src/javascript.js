
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
let minutes= currentDate.getMinutes();

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
        if (day_night>=12 && day_night<18){
            let background= document.querySelector("#container");
            background.style.backgroundColor="rgb(147,217,238)";
            background.style.background="linear-gradient(0deg, rgba(147,217,238,1) 0%, rgba(3,104,161,1) 100%)";
        }
        //evening
        else if (day_night>=18 && day_night<24 ) {
        let background=document.querySelector("#container");
           background.style.backgroundColor="rgb(187,100,138)";
            background.style.background="linear-gradient(0deg, rgba(187,100,138,0.7539390756302521) 0%, rgba(15,12,51,1) 93%)";
       }
        //midnight 00:00-03:59 
        else if (day_night>=24 && day_night<4 ){
            let background=document.querySelector("#container");
            background.style.backgroundColor="rgb(27,43,98)";
            background.style.background="linear-gradient(0deg, rgba(27,43,98,0.7539390756302521) 0%, rgba(3,3,20,1) 100%)";

        }
        //morning 04:00-05:59 

        else if (day_night>=4 && day_night<6 ){
            let background=document.querySelector("#container");
            background.style.backgroundColor="rgb(185,113,31)";
            background.style.background="linear-gradient(0deg, rgba(185,113,31,1) 0%, rgba(212,185,119,1) 51%, rgba(33,154,157,1) 100%)";
        }

        else {
            let background=document.querySelector("#container");
            background.style.backgroundColor="rgb(147,217,238)";
            background.style.background="linear-gradient(0deg, rgba(147,217,238,1) 0%, rgba(3,104,161,1) 100%)";
        }
}

dayAndNight();

//display-5-day-Weather-Forecast
function displayForecast(response){
    let forecast= response.data.daily;
    let forecastElement=document.querySelector("#forecast");

    let forecastHTML=`<div class="row" id="five-day-forecast">`;

 forecast.forEach(function(forecastDay, index){
    if (index < 5){
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
        <span class="minTemp">${Math.round(forecastDay.temp.min)}Cºc</span>|<span class="maxTemp">${Math.round(forecastDay.temp.max)}Cº</span>       
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
    weatherIcon.innerHTML= `<img src="img/${response.data.weather[0].icon}.png"/>`;

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