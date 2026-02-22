"use client";

import { UserStats } from "@/types";
import PlayerParticipation from "./PlayerParticipation";

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
      <h2 className="text-2xl font-bold text-center mb-2 text-[#FAE7D5]">
        您的賽季統計
      </h2>
      <p className="text-center text-sm text-[#FAE7D5]/60 mb-6">臺北伊斯特球員數據</p>

      {/* Wins & hours section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#2a2826] border border-[#3a3836] rounded-lg p-6 hover:border-[#D95B1C]/50 transition-colors text-center">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-3xl font-bold text-[#FAE7D5] mb-1">
            {stats.gamesWon ?? 0}
          </div>
          <div className="text-sm text-[#FAE7D5]/70">伊斯特勝場</div>
          <div className="text-xs text-[#FAE7D5]/50 mt-1">
            共 {stats.gamesAttended} 場中
          </div>
        </div>
        <div className="bg-[#2a2826] border border-[#3a3836] rounded-lg p-6 hover:border-[#D95B1C]/50 transition-colors text-center">
          <div className="text-4xl mb-2">⏱</div>
          <div className="text-3xl font-bold text-[#FAE7D5] mb-1">
            {(stats.totalHoursPlayed ?? 0).toFixed(1)}
          </div>
          <div className="text-sm text-[#FAE7D5]/70">總觀賽時數</div>
          <div className="text-xs text-[#FAE7D5]/50 mt-1">
            小時
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#2a2826] border border-[#3a3836] rounded-lg p-6 hover:border-[#D95B1C]/50 transition-colors"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="text-3xl font-bold text-[#FAE7D5] mb-1">
              {item.value}
            </div>
            <div className="text-sm text-[#FAE7D5]/70">{item.label}</div>
          </div>
        ))}
      </div>
      {stats.avgPointsPerGame && (
        <div className="mt-6 text-center">
          <p className="text-[#FAE7D5]/80">
            平均每場得分: <span className="font-semibold text-[#D95B1C]">{stats.avgPointsPerGame}</span>
          </p>
        </div>
      )}
      {stats.favoriteTeam && (
        <div className="mt-2 text-center">
          <p className="text-[#FAE7D5]/80">
            最常觀看的隊伍: <span className="font-semibold text-[#D95B1C]">{stats.favoriteTeam}</span>
          </p>
        </div>
      )}
      
      {stats.playerParticipation && stats.playerParticipation.length > 0 && (
        <PlayerParticipation players={stats.playerParticipation} />
      )}
    </div>
  );
}
