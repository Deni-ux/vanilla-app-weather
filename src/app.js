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

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day =date.getDay();
    let days=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    

    return days[day];
}

function displayForecast(response){
    let forecast=response.data.daily;
    let forecastElement=document.querySelector("#forecast");
    
     //loop through an array
    //use forEach (day)
    let forecastHTML =`<div class="row">`;
    
    forecast.forEach(function(forecastDay, index){
        if (index<6) {
            
       
        forecastHTML = forecastHTML + 
    `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
               
                <img
                  src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt=""
                  width="42px"
                />
                <div class="weather-forecast-temp">
                  <span class="temp-max">${Math.round(forecastDay.temp.max)}°</span
                  ><span class="temp-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
                </div>
            `; }

 
    });
   
    forecastHTML = forecastHTML+ `</div>`;
    forecastElement.innerHTML= forecastHTML;

}
//one call api
function getForecast(coordinates){
   
    let apiKey = "b2694a5d8f39bb351277f910bc5d27c4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
   
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


searchCity("London");
 
