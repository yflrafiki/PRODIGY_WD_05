// script.js

// API key from OpenWeatherMap
const apiKey = '94b78c08066802dd3cd90e4c56cba005';

// DOM elements
const locationInput = document.getElementById('locationInput');
const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const weatherInfo = document.getElementById('weatherInfo');

// Fetch weather data by city name
fetchWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeatherByCity(location);
    } else {
        alert('Please enter a location');
    }
});

// Fetch weather data using the user's current location
currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        }, (error) => {
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
});

// Fetch weather data by city name
function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
}

// Fetch weather data by coordinates
function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
}

// Fetch weather data from the API
function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });
}

// Display weather data
function displayWeatherData(data) {
    if (data.cod === 200) {
        const { name, main, weather } = data;
        weatherInfo.innerHTML = `
            <p><strong>Location:</strong> ${name}</p>
            <p><strong>Temperature:</strong> ${main.temp} &deg;C</p>
            <p><strong>Weather:</strong> ${weather[0].description}</p>
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
            <p><strong>Pressure:</strong> ${main.pressure} hPa</p>
        `;
    } else {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
}
