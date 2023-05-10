//SWAPPING CELCIUS & FAHRENHEIT

function showFahrenheit(event) {
  event.preventDefault();
  let clickFahrenheit = document.querySelector(".celcius-current-temp");
  clickFahrenheit.innerHTML = "66°";
}

let elementFahrenheit = document.querySelector("#fahrenheit-link");
elementFahrenheit.addEventListener("click", showFahrenheit);

function showCelcius(event) {
  event.preventDefault();
  let clickCelcius = document.querySelector(".celcius-current-temp");
  clickCelcius.innerHTML = "15°";
}

let elementCelcius = document.querySelector("#celcius-link");
elementCelcius.addEventListener("click", showCelcius);

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
  console.log(response);
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#main-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#main-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#main-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#main-compass").innerHTML = response.data.wind.deg;
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

let searchForm = document.querySelector("#search-area");
searchForm.addEventListener("submit", handleSubmit);

//step 5 - search button for current location
let currentLocationButton = document.querySelector("#current-location-input");
currentLocationButton.addEventListener("click", getCurrentLocation);

//step 3 - define default location
searchCity("Sheffield");

//
