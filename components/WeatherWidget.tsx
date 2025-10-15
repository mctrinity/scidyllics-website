import React, { useEffect, useState } from "react";

type Weather = {
  name: string;
  temp: number | null;
  desc: string | null;
  icon: string | null;
  city: string | null;
};

const LOCATIONS = [
  { name: "Current Location", query: "auto:ip" },
  { name: "London", query: "London,UK" },
  { name: "Ontario", query: "Ontario,CA" },
  { name: "Tokyo", query: "Tokyo,JP" },
  { name: "Sydney", query: "Sydney,AU" },
  { name: "Miami", query: "Miami,US" },
];

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || process.env.OPENWEATHER_API_KEY || "";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Weather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      const results = await Promise.all(
        LOCATIONS.map(async loc => {
          let city = loc.query;
          if (loc.query === "auto:ip") {
            try {
              const res = await fetch("/api/geo");
              const data = await res.json();
              if (data.city && data.country_code) {
                city = `${data.city},${data.country_code}`;
              } else {
                city = "Manila,PH";
              }
            } catch {
              city = "Manila,PH";
            }
          }
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
          );
          const weatherData = await weatherRes.json();
          return {
            name: loc.name,
            temp: weatherData.main?.temp,
            desc: weatherData.weather?.[0]?.main,
            icon: weatherData.weather?.[0]?.icon,
            city: weatherData.name,
          };
        })
      );
      setWeather(results);
      setLoading(false);
    }
    fetchWeather();
  }, []);

  // Add framer-motion for entry and hover
  // Animate widget entry and pop on hover
  // Animate each weather row
  const { motion } = require("framer-motion");
  return (
    <motion.div
          className="weather-widget p-4 rounded-xl bg-gradient-to-br from-blue-100 via-white to-cyan-100 shadow-xl mb-6 border border-blue-200 hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
    >
      <h4 className="font-bold mb-3 text-sm text-blue-700 flex items-center gap-2"><span>🌤️</span> Weather</h4>
      {loading ? (
        <div className="text-xs text-gray-500">Loading...</div>
      ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full justify-items-center">
          {weather.map((w, i) => (
                <motion.li
                  key={i}
                  className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm bg-white/60 rounded-lg px-2 py-1 hover:bg-blue-50 transition-colors w-full md:w-auto"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-semibold text-blue-900 flex items-center gap-2">
                {w.name === "Current Location" ? w.city : w.name}:
                {w.temp ? ` ${Math.round(w.temp)}°C` : " N/A"}
                {w.desc ? ` ${w.desc}` : ""}
                {w.icon && (
                  <img src={`https://openweathermap.org/img/wn/${w.icon ?? "01d"}.png`} alt={w.desc ?? "weather"} className="w-6 h-6 drop-shadow inline-block align-middle" />
                )}
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
