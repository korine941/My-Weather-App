let now = new Date();

let dateTime = document.querySelector("#date-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May.",
  "June.",
  "July.",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec."
];
let month = months[now.getMonth()];
let year = now.getFullYear();

function formatAMPM(now) {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

dateTime.innerHTML = `${day}, ${month} ${date}, ${year} ${formatAMPM(
  new Date()
)}`;

function getPosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiKey = "6c58800525f462282dc866a535006408";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(getPosition);

function showWeather(response) {
  document.querySelector(
    "#current-city"
  ).innerHTML = `${response.data.name} weather as of`;
  document.querySelector("#current-temp").innerHTML = Math.round(
    (response.data.main.temp * 9) / 5 + 32
  );
  document.querySelector(
    "#other-info"
  ).innerHTML = `${response.data.weather[0].description} with a humidity of ${response.data.main.humidity}%`;

  // Convert Temp
  function convertTempC(event) {
    event.preventDefault();
    currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
  }

  let celciusTemp = document.querySelector("#celsius-link");
  celciusTemp.addEventListener("click", convertTempC);

  function convertTempF(event) {
    event.preventDefault();
    currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = Math.round((response.data.main.temp * 9) / 5 + 32);
  }

  let fahrenheitTemp = document.querySelector("#fahrenheit-link");
  fahrenheitTemp.addEventListener("click", convertTempF);
}

function searchCity(city) {
  let apiKey = "809f83a3c3f1056fc8bafdb178a866cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

searchCity("New York");
