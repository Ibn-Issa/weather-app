// get location input
document
  .getElementById("location-input")
  .addEventListener("change", async () => {
    const location = document.getElementById("location-input").value;

    // fetch the weather data
    const weatherData = await getWeatherData(location);

    // Display Weather data on the page
    displayWeatherData(weatherData);
  });

// function to get weather data
const getWeatherData = async (location) => {
  if (!location) {
    return {};
  }

  const apiKey = "45e71a2579e940ab3dcb26dbc2b00ccf";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`,
  );
  const data = await response.json();

  return data;
};

// function to change background color
function getBackgroundColor(temp) {
  if (temp < 0) {
    return "lightblue";
  } else if (temp < 10) {
    return "lightgreen";
  } else if (temp < 20) {
    return "lightyellow";
  } else if (temp < 30) {
    return "lightsalmon";
  } else {
    return "lightcoral";
  }
}

// Function to display data
const displayWeatherData = (data) => {
  const weatherDataElement = document.getElementById("weather-data");

  if (Object.keys(data).length === 0) {
    weatherDataElement.innerHTML = "Please enter a locaton to see the weather";
  } else {
    const backgroundColor = getBackgroundColor(
      Math.floor(data.main.temp - 273.15),
    );
    weatherDataElement.style.backgroundColor = backgroundColor;

    weatherDataElement.innerHTML = `
            <h3>${document.getElementById("location-input").value}</h3>
            <p>Temperature: ${Math.floor(data.main.temp - 273.15)} Degree Celcius</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
  }
};

window.onload = async () => {
  const weatherData = await getWeatherData();
  displayWeatherData(weatherData);
};
