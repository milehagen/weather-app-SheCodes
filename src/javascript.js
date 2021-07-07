
// Current Date: Monday | May 17th | 12:11pm

let currentDate = new Date();
let h2 = document.querySelector("#current-date");
let days= [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]
let day= days[currentDate.getDay()];
let months= [
    "Dec", "Jan", "Feb", "Mar", "Apr","Jun", "Jul","Aug", "Sept", "Oct", "Nov",
];
let month= months [currentDate.getMonth()];
let date= currentDate.getDate();
let hour=currentDate.getHours();
let minutes= currentDate.getMinutes();


h2.innerHTML= (`${day} | ${month} ${date} | ${hour}:${minutes}`);

//show-city-temp
function showUserTemperature(response){
    console.log(response.data);
    document.querySelector("#wind-speed").innerHTML=`${Math.round(response.data.wind.speed)} Km/hr`;
    document.querySelector("#humidity-percentage").innerHTML=`${response.data.main.humidity}%`;
    document.querySelector("h1").innerHTML= response.data.name.toUpperCase();
    document.querySelector("#current-degrees-display").innerHTML=`${Math.round(response.data.main.temp)}º`;
    document.querySelector("h4").innerHTML= response.data.weather[0].description;
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