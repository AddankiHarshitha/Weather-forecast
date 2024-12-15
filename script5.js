The errors at the "Display weather data" or "Fetch weather by coordinates" sections could arise from the API key, invalid element references, or data access issues. Here's the corrected and enhanced code to avoid such errors.

Corrected JavaScript Code:

// OpenWeatherMap API Key
const API_KEY = 'your_api_key_here'; // Replace with your OpenWeatherMap API key

// Elements
const fetchWeatherBtn = document.getElementById('fetchWeather');
const useLocationBtn = document.getElementById('useLocation');
const cityInput = document.getElementById('cityInput');
const weatherDataDiv = document.getElementById('weatherData');
const locationName = document.getElementById('locationName');
const temperature = document.getElementById('temperature');
const conditions = document.getElementById('conditions');
const humidity = document.getElementById('humidity');
const errorMessage = document.getElementById('errorMessage');

// Fetch weather data by city
fetchWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherByCity(city);
  } else {
    displayError('Please enter a city name.');
  }
});

// Fetch weather data using geolocation
useLocationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      () => {
        displayError('Unable to retrieve your location. Please allow location access.');
      }
    );
  } else {
    displayError('Geolocation is not supported by your browser.');
  }
});

// Fetch weather by city name
function fetchWeatherByCity(city) {
  const url = https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY};
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found. Please check the city name.');
      }
      return response.json();
    })
    .then((data) => displayWeather(data))
    .catch((error) => displayError(error.message));
}

// Fetch weather by coordinates
function fetchWeatherByCoordinates(lat, lon) {
  const url = https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY};
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data.');
      }
      return response.json();
    })
    .then((data) => displayWeather(data))
    .catch((error) => displayError(error.message));
}

// Display weather data
function displayWeather(data) {
  weatherDataDiv.classList.remove('hidden'); // Ensure weather data is shown
  errorMessage.classList.add('hidden'); // Hide error messages

  locationName.textContent = `Location: ${data.name}, ${data.sys.country || ''}`;
  temperature.textContent = `Temperature: ${data.main.temp || 'N/A'} °C`;
  conditions.textContent = Conditions: ${data.weather[0]?.description || 'N/A'};
  humidity.textContent = `Humidity: ${data.main.humidity || 'N/A'}%`;
}

// Display error message
function displayError(message) {
  weatherDataDiv.classList.add('hidden'); // Hide weather data
  errorMessage.classList.remove('hidden'); // Show error message
  errorMessage.textContent = message;
}


