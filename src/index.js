//SWAPPING CELCIUS & FAHRENHEIT

//DATE & TIME

let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

  let formattedDate = `${currentDay} ${currentDate} ${currentMonth} @ ${currentHour}:${currentMinute}`;

  return formattedDate;
}
let datetime = document.querySelector(".datetime");
datetime.innerHTML = formatDate(currentTime);

//CITY INPUT & DISPLAY

//step 2 - after getting HTTP response, display information
function displayWeatherCondition(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#main-temp");
  let cityElement = document.querySelector("#main-city");
  let descriptionElement = document.querySelector("#main-description");
  let humidityElement = document.querySelector("#main-humidity");
  let windElement = document.querySelector("#main-wind");
  let compassElement = document.querySelector("#main-compass");
  let iconElement = document.querySelector("#main-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTMLHTML = Math.round(response.data.wind.speed);
  compassElement.innerHTML = response.data.wind.deg;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//step 4 - on page load show default location - move api call up
function searchCity(city) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//step 7 - when request received display current location

function searchLocation(position) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//step 6 - when button pressed fetch current location from computer
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//step 1 - make API call
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
  //let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";

  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //axios.get(apiUrl).then(displayWeatherCondition);
}
function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");

  elementCelsius.classList.remove("active");
  elementFahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  elementCelsius.classList.add("active");
  elementFahrenheit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-area");
searchForm.addEventListener("submit", handleSubmit);

let elementFahrenheit = document.querySelector("#fahrenheit-link");
elementFahrenheit.addEventListener("click", showFahrenheit);

let elementCelsius = document.querySelector("#celsius-link");
elementCelsius.addEventListener("click", showCelsius);

let currentLocationButton = document.querySelector("#current-location-input");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Sheffield");
