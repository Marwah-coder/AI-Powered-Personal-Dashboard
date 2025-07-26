"use client";

import { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
} from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setWeather({
        temperature: Math.floor(Math.random() * 30) + 10,
        condition: ["sunny", "cloudy", "rainy"][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        location: "New York, NY",
      });
      setLoading(false);
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <Thermometer className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Weather</h3>
        </div>
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Thermometer className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Weather</h3>
      </div>
      {weather && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{weather.temperature}°C</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {weather.condition}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {weather.location}
              </p>
            </div>
            {getWeatherIcon(weather.condition)}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span>{weather.humidity}% Humidity</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <span>{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
