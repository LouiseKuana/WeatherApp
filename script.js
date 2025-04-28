const apiKey = "22f6b2f6d1d0927a3dab60dcc3915110"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            showError();
            return;
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError();
    }
}
function updateWeatherUI(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    switch (data.weather[0].main) {
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "images/mist.png";
            break;
        default:
            weatherIcon.src = "";
            break;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

}
function showError() {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
}

// Handle button click
searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    if (city) {
        checkWeather(city);
    }
});
// Handle "Enter" key press
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});

