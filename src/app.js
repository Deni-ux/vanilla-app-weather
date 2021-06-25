function formatDate(timestamp){
  let date = new Date(timestamp);
let hours=date.getHours();
if (hours<10) {
    hours=`0${hours}`;
}
let minutes=date.getMinutes();
if (minutes<10) {
    minutes=`0${minutes}`;
}
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day =days[date.getDay()];

return `${day}, ${hours}:${minutes}`;  
}
let currentDate=document.querySelector("#date");
currentDate.innerHTML=formatDate(new Date);

function displayForecast(){
    let forecastElement=document.querySelector("#forecast");
    
    let forecastHTML=`<div class="row>`;
    let days = ["Sat", "Sun", "Mon"]; //loop through an array
    //use forEach
    days.forEach(function(day){
        forecastHTML = forecastHTML + 
    `
     <div class="row">
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>

                <img
                  src="https://assets.msn.com/bundles/v1/weather/latest/CloudyV3.svg"
                  alt=""
                  width="42px"
                />
                <div class="weather-forecast-temp">
                  <span class="temp-max">18°</span
                  ><span class="temp-min"> 12°</span>
                </div>
              </div>
            </div>`;
 
    })
   
    forecastHTML = forecastHTML+ `</div>`;
    forecastElement.innerHTML= forecastHTML;

}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "b2694a5d8f39bb351277f910bc5d27c4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    document.querySelector("#city").innerHTML=response.data.name;
    celsiusTemperature=Math.round(response.data.main.temp);
   
    document.querySelector("#temperature").innerHTML=celsiusTemperature;
    document.querySelector("#humidity").innerHTML=response.data.main.humidity;
    document.querySelector("#windspeed").innerHTML=Math.round(response.data.wind.speed);
    
    document.querySelector("#weatherDescription").innerHTML=`Currently ${response.data.weather[0].description}`;
    let iconElement = document.querySelector("#weather-icon");
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
 
  getForecast(response.data.coord);
  
 } 

function searchCity(city){
   let apiKey = "b2694a5d8f39bb351277f910bc5d27c4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);
}

function showCities(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value);
}
let form =document.querySelector("#search-form");
form.addEventListener("submit",showCities);
 
function showPosition(position) {
  let apiKey = "b2694a5d8f39bb351277f910bc5d27c4";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getLocalPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", getLocalPosition);

function displayFahrenheitTemp(event){
    event.preventDefault();
    let tempElement=document.querySelector("#temperature");
    let fahrenheitTemp=Math.round((celsiusTemperature*9)/5+32);
    tempElement.innerHTML=fahrenheitTemp;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

}
let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemp);

function displayCelsiusTemp(event){
    event.preventDefault();
    let tempElement=document.querySelector("#temperature");
    tempElement.innerHTML=celsiusTemperature;
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}
let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemp);


let celsiusTemperature=null;





searchCity("London");
displayForecast(); 
