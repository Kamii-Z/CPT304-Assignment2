import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [country, setCountry] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [hotel, setHotel] = useState("")

  useEffect(() => {
    if (country) {
      axios
        .get(`https://date.nager.at/api/v3/publicholidays/2023/${country}`)
        .then((response) => setHolidays(response.data));
    }
  }, [country]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleHolidayChange = (event) => {
    const holiday = event.target.value;
    if (city && holiday) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&dt=${holiday.date}&appid=911cba38c0eca975b9d4859416f40404`
        )
        .then((response) => {
          const weather = response.data;
          const holidayWeather = {
            holiday: holiday,
            city: city,
            temp: weather.main.temp,
            description: weather.weather[0].description
          };
          setWeather(holidayWeather);
        });
    }
  };

   const gethotel = (event) => {
      const holiday = event.target.value;
      if (city && holiday) {
        axios
          .get(
            `https://hotels4.p.rapidapi.com/locations/search?query=${city}&locale=en_US`
          )
          .then((response) => {
            const hotel = response.data;
            const holidayHotel = {
              holiday: holiday,
              city: city,
              temp: weather.main.name,
              description: hotel.hotel[0].description
            };
            setHotel(holidayHotel);
          });
      }
    };

  const holidayOptions = holidays.map((holiday) => (
    <option value={holiday.name}>{holiday.name}</option>
  ));

  return (
    <div>
      <h1>Holiday Weather App</h1>
      <div>
        <label>
          Country:
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          City:
          <input type="text" value={city} onChange={handleCityChange} />
        </label>
      </div>
      <div>
        <label>
          Holiday:
          <select onChange={handleHolidayChange}>
            <option value="">Select a holiday</option>
            {holidayOptions}
          </select>
        </label>
      </div>
      {weather && (
        <div>
          <h2>Weather for {weather.holiday} in {weather.city}</h2>
          <p>Temperature: {weather.temp}°F</p>
          <p>Description: {weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
