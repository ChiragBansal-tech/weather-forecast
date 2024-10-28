document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const city = document.getElementById('cityInput').value;
    const apiKey = `79abbbe7bd0197ec3b1d8608886a07a1`;

    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(geoApiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                return fetch(weatherApiUrl);
            } else {
                throw new Error('Location not found');
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherData = `
                    <div class="weather-info">
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Feels Like: ${data.main.feels_like}°C</p>
                        <p>Min Temperature: ${data.main.temp_min}°C</p>
                        <p>Max Temperature: ${data.main.temp_max}°C</p>
                        <p>Weather: ${data.weather[0].description}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Pressure: ${data.main.pressure} hPa</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                        <p>Cloudiness: ${data.clouds.all}%</p>
                        <p>Visibility: ${data.visibility} m</p>
                        <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                        <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
                    </div>
                `;
                document.getElementById('weatherData').innerHTML = weatherData;
                console.log(weatherData);
            }
            else {
                document.getElementById('weatherData').innerHTML = `<p>Location not found.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherData').innerHTML = `<p>Error fetching weather data.</p>`;
        });
});
