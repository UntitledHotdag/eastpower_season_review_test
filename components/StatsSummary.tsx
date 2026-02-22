"use client";

import { UserStats } from "@/types";

interface StatsSummaryProps {
  stats: UserStats;
}

export default function StatsSummary({ stats }: StatsSummaryProps) {
  const statItems = [
    {
      label: "觀賽場次",
      value: stats.gamesAttended,
      icon: "🏐",
    },
    {
      label: "總得分",
      value: stats.totalScores.toLocaleString(),
      icon: "⚡",
    },
    {
      label: "總扣殺",
      value: stats.totalSpikes.toLocaleString(),
      icon: "🔥",
    },
    {
      label: "總攔網得分",
      value: stats.totalMonsterBlocks.toLocaleString(),
      icon: "🛡️",
    },
    {
      label: "出場球員數",
      value: stats.uniquePlayers,
      icon: "👥",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        您的賽季統計
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {item.value}
            </div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>
      {stats.avgPointsPerGame && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            平均每場得分: <span className="font-semibold">{stats.avgPointsPerGame}</span>
          </p>
        </div>
      )}
      {stats.favoriteTeam && (
        <div className="mt-2 text-center">
          <p className="text-gray-600">
            最常觀看的隊伍: <span className="font-semibold">{stats.favoriteTeam}</span>
          </p>
        </div>
      )}
    </div>
  );
}
