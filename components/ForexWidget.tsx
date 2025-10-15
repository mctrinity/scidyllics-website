import React, { useEffect, useState } from "react";

const CURRENCIES = ["USD", "JPY", "CAD", "GBP", "AUD", "SGD"];
// const FRANKFURTER_API_URL = "https://api.frankfurter.app/latest";
const FRANKFURTER_API_URL = "https://api.frankfurter.app/latest";

export default function ForexWidget() {
  const [rates, setRates] = useState<{ [key: string]: number | null }>({});
  const [loading, setLoading] = useState(true);
  const [regionCurrency, setRegionCurrency] = useState<string>("PHP"); // Default to PHP, will be updated

  useEffect(() => {
    async function fetchRegionCurrency() {
      try {
        const res = await fetch("https://ipapi.co/currency/");
        const currency = await res.text();
        setRegionCurrency(currency || "PHP");
      } catch {
        setRegionCurrency("PHP");
      }
    }
    fetchRegionCurrency();
  }, []);

  useEffect(() => {
    async function fetchRates() {
      setLoading(true);
      try {
        // For each currency, get 1 unit to regionCurrency
        const promises = CURRENCIES.map(async base => {
          if (base === regionCurrency) return [base, 1];
          const res = await fetch(`${FRANKFURTER_API_URL}?amount=1&from=${base}&to=${regionCurrency}`);
          const data = await res.json();
          return [base, data.rates?.[regionCurrency] ?? null];
        });
        const results = await Promise.all(promises);
        const filtered: { [key: string]: number | null } = {};
        results.forEach(([base, rate]) => {
          filtered[base] = rate;
        });
        setRates(filtered);
      } catch (e) {
        setRates({});
      }
      setLoading(false);
    }
    if (regionCurrency) fetchRates();
  }, [regionCurrency]);

  // Add framer-motion for entry and hover
  const { motion } = require("framer-motion");
  return (
    <motion.div
          className="forex-widget p-4 rounded-xl bg-gradient-to-br from-yellow-100 via-white to-orange-100 shadow-xl mb-6 border border-yellow-200 hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
    >
      <h4 className="font-bold mb-3 text-sm text-yellow-700 flex items-center gap-2"><span>💱</span> Forex Rates to {regionCurrency}</h4>
      {loading ? (
        <div className="text-xs text-gray-500">Loading...</div>
      ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full justify-items-center">
          {CURRENCIES.map((cur, i) => {
            // Simple currency icon mapping
            const currencyIcons: { [key: string]: string } = {
              USD: "💵", JPY: "💴", CAD: "🇨🇦", GBP: "💷", AUD: "🇦🇺", SGD: "🇸🇬"
            };
            return (
              <motion.li
                key={cur}
                className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm bg-white/60 rounded-lg px-2 py-1 hover:bg-yellow-50 transition-colors w-full md:w-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-semibold text-yellow-900 flex items-center gap-2">
                  <span>{currencyIcons[cur] ?? cur}</span> {cur} to {regionCurrency}: {rates[cur] ? rates[cur].toFixed(2) : "N/A"}
                </span>
              </motion.li>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
}
