import React, { useState, useEffect } from "react";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

const Weather = () => {
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("palma");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const response = await fetch(
        `https://trrip-backend.onrender.com/weather`
      );
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    };
    fetchWeather();
  }, [city]);

  // Function to render the appropriate weather icon with specific colors and size
  const renderWeatherIcon = (condition) => {
    if (condition.includes("clear")) {
      return <WiDaySunny className="text-yellow-500 text-6xl" />;
    } else if (condition.includes("cloud")) {
      return <WiCloud className="text-gray-300 text-6xl" />;
    } else if (condition.includes("rain")) {
      return <WiRain className="text-blue-600 text-6xl" />;
    }
    return <WiDaySunny className="text-yellow-500 text-6xl" />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="w-full max-w-5xl text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          Weather in {city}
        </h1>
        {loading ? (
          <p className="text-lg text-white">Loading...</p>
        ) : weather.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg text-white">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-4">Date</th>
                  <th className="p-4">Temperature (°C)</th>
                  <th className="p-4">Condition</th>
                  <th className="p-4">Icon</th>
                </tr>
              </thead>
              <tbody>
                {weather.map((forecast, index) => (
                  <tr key={index} className="hover:bg-gray-700">
                    <td className="p-4">{forecast.date}</td>
                    <td className="p-4">{forecast.temperature} °C</td>
                    <td className="p-4">{forecast.description}</td>
                    <td className="p-4">
                      {renderWeatherIcon(forecast.description)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-lg text-white">No weather data available.</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
