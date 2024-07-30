import React, { useState, useEffect } from "react";

const Weather = ({ setWeatherCondition }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=b6f06d04fd6f7dede359be36f50e6f1b`
        );
        const data = await response.json();
        if (response.ok) {
          setWeather(data);
          setWeatherCondition(data.weather[0].main.toLowerCase()); 
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            setError("Error getting location: " + error.message);
            fetchWeather(41.2995, 69.2401);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        fetchWeather(41.2995, 69.2401);
      }
    };

    getLocation();
  }, [setWeatherCondition]);

  if (error) {
    return <div className="flex items-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center">
      {weather ? (
        <div className="text-center flex gap-3 sm:text-sm">
          <p className="text-1xl font-semibold">{weather.name}</p>
          <p className="sm:text-sm">{weather.main.temp}°C</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
