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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="col five-day-forcast-col"`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col five-day-forcast-col">
      
        <img
        src ="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt""
        />
      <p class="forecast-temp">${Math.round(forecastDay.temp.day)}°</p>
      <p>${formatDay(forecastDay.dt)}</p>
    </div> 
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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
  windElement.innerHTML = Math.round(response.data.wind.speed * 2.237);
  compassElement.innerHTML = getDirectionCoordinates(response.data.wind.deg);

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function getDirectionCoordinates(degrees) {
  if (degrees >= 21 && degrees <= 70) {
    return "North East";
  } else if (degrees >= 71 && degrees <= 110) {
    return "East";
  } else if (degrees >= 111 && degrees <= 160) {
    return "South East";
  } else if (degrees >= 161 && degrees <= 200) {
    return "South";
  } else if (degrees >= 201 && degrees <= 250) {
    return "South West";
  } else if (degrees >= 251 && degrees <= 290) {
    return "West";
  } else if (degrees >= 291 && degrees <= 340) {
    return "North West";
  } else {
    return "North ";
  }
}

function searchCity(city) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
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
