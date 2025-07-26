"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
}

export function CryptoWidget() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      setLoading(true);
      // Simulate crypto API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockCrypto: CryptoData[] = [
        {
          symbol: "BTC",
          name: "Bitcoin",
          price: 45230.5,
          change24h: 1250.3,
          changePercent24h: 2.84,
        },
        {
          symbol: "ETH",
          name: "Ethereum",
          price: 3180.75,
          change24h: -85.2,
          changePercent24h: -2.61,
        },
        {
          symbol: "ADA",
          name: "Cardano",
          price: 0.52,
          change24h: 0.03,
          changePercent24h: 6.12,
        },
      ];

      setCryptos(mockCrypto);
      setLoading(false);
    };

    fetchCrypto();
    const interval = setInterval(fetchCrypto, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Crypto Rates</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Crypto Rates</h3>
      </div>
      <div className="space-y-4">
        {cryptos.map((crypto) => (
          <div
            key={crypto.symbol}
            className="flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{crypto.symbol}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {crypto.name}
                </span>
              </div>
              <div className="text-lg font-bold">
                ${crypto.price.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div
                className={`flex items-center gap-1 ${
                  crypto.changePercent24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {crypto.changePercent24h >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">
                  {crypto.changePercent24h >= 0 ? "+" : ""}
                  {crypto.changePercent24h.toFixed(2)}%
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                ${crypto.change24h >= 0 ? "+" : ""}
                {crypto.change24h.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
