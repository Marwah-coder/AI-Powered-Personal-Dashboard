"use client";

import { useState, useEffect } from "react";
import { Newspaper, ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
}

export function NewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const mockNews: NewsItem[] = [
        {
          id: "1",
          title: "AI Technology Breakthrough in Healthcare",
          summary:
            "New AI system shows promising results in early disease detection...",
          url: "#",
          publishedAt: "2 hours ago",
        },
        {
          id: "2",
          title: "Climate Change Summit Reaches Agreement",
          summary: "World leaders agree on new carbon reduction targets...",
          url: "#",
          publishedAt: "4 hours ago",
        },
        {
          id: "3",
          title: "Tech Giants Report Strong Q4 Earnings",
          summary: "Major technology companies exceed market expectations...",
          url: "#",
          publishedAt: "6 hours ago",
        },
        {
          id: "4",
          title: "Space Mission Successfully Launches",
          summary:
            "New satellite constellation deployed for global internet...",
          url: "#",
          publishedAt: "8 hours ago",
        },
      ];

      setNews(mockNews);
      setLoading(false);
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <Newspaper className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Latest News</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Latest News</h3>
      </div>
      <div className="h-80 overflow-y-auto">
        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm leading-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {item.summary}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {item.publishedAt}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-500 hover:text-blue-600 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
