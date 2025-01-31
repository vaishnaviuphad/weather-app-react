import "./App.css";
import { useState } from "react";

const api = {
  key: "76b812928556fddb864e473c33a963d9",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({
    sys: { country: "--" },
    name: "--",
    main: {
      temp: "--",
      humidity: "--",
      temp_min: "--",
      temp_max: "--",
      pressure: "--",
    },
    weather: [{ main: "--" }],
  });
  const [error, setError] = useState("");

  const searchPressed = () => {
    console.log("Search pressed");
    console.log(search);
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod === "404") {
          setError("City not found. Please try again.");
        } else {
          setError("");
          setWeather(result);
          console.log(result);
        }
      })
      .catch((err) => {
        setError("An error occurred while fetching data.");
        console.error(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <div>
        <div className="element-container">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        {error && <p className="error">{error}</p>}
        <table className="weather-table">
          <tbody>
            <tr>
              <td>Country:</td>
              <td>{weather.sys.country}</td>
            </tr>
            <tr>
              <td>City Name:</td>
              <td>{weather.name}</td>
            </tr>
            <tr>
              <td>Temperature:</td>
              <td>{weather.main.temp}°C</td>
            </tr>
            <tr>
              <td>Humidity:</td>
              <td>{weather.main.humidity}%</td>
            </tr>
            <tr>
              <td>Min-Temp:</td>
              <td>{weather.main.temp_min}</td>
            </tr>
            <tr>
              <td>Max-Temp:</td>
              <td>{weather.main.temp_max}</td>
            </tr>
            <tr>
              <td>Condition:</td>
              <td>{weather.weather[0].main}</td>
            </tr>
            <tr>
              <td>Pressure:</td>
              <td>{weather.main.pressure}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;