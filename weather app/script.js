async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  if (!location) return alert("Please enter a location.");

  const apiKey = "dc96ac505aa543918c245144242212";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      alert(data.error.message);
      return;
    }

    const { location: loc, current } = data;

    document.getElementById("cityName").textContent = `📍 ${loc.name}, ${loc.country}`;
    document.getElementById("icon").src = `https:${current.condition.icon}`;
    document.getElementById("temperature").textContent = `🌡️ ${current.temp_c}°C`;
    document.getElementById("condition").textContent = `☁️ ${current.condition.text}`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${current.humidity}%`;
    document.getElementById("wind").textContent = `💨 Wind: ${current.wind_kph} km/h`;
    document.getElementById("airQuality").textContent = `🌬️ AQI (PM2.5): ${current.air_quality.pm2_5.toFixed(1)}`;

    document.getElementById("weatherResult").classList.remove("hidden");
  } catch (err) {
    alert("Failed to fetch weather data.");
    console.error(err);
  }
}
