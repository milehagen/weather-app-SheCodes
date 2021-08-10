
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

h2.innerHTML= (`${day} | ${month} ${date} | ${hour}:${minutes}`);

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

//display-5-day-Weather-Forecast
function displayForecast(response){
    console.log(response.data.daily);
    let forecast= response.data.daily;
 let forecastElement=document.querySelector("#forecast");

 let forecastHTML=`<div class="row">
`;
 forecast.forEach(function(forecastDay, index){
    if (index < 6){
    forecastHTML = 
    forecastHTML +

`
      <div  class="col-2">
        <p>

       <div class="forecast-day"> ${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt= "weather image"
        />
        <br>
            <span class="minTemp">${Math.round(forecastDay.temp.min)}º</span>|<span class="maxTemp">${Math.round(forecastDay.temp.max)}º</span>
           
            </p>          
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
    displayCurrentDegrees.innerHTML=`${Math.round(response.data.main.temp)}º`;
    currentWeatherDescription.innerHTML= response.data.weather[0].description;
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

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

