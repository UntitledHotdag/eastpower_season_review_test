"use client";

import type { PlayerParticipation } from "@/types";

interface PlayerParticipationProps {
  players: PlayerParticipation[];
}

export default function PlayerParticipation({ players }: PlayerParticipationProps) {
  const sortedPlayers = [...players].sort((a, b) => b.gamesPlayed - a.gamesPlayed);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#FAE7D5]">
        球員出場統計
      </h2>
      <p className="text-center text-[#FAE7D5]/70 mb-6 text-sm">
        在您觀看的比賽中，每位臺北伊斯特球員的出場次數
      </p>
      
      <div className="bg-[#2a2826] border border-[#3a3836] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#3a3836]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#FAE7D5]/80 uppercase tracking-wider">
                  球員
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#FAE7D5]/80 uppercase tracking-wider">
                  背號
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#FAE7D5]/80 uppercase tracking-wider">
                  位置
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-[#FAE7D5]/80 uppercase tracking-wider">
                  出場次數
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-[#FAE7D5]/80 uppercase tracking-wider">
                  總得分
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3a3836]">
              {sortedPlayers.map((player, index) => (
                <tr
                  key={`${player.playerNumber}-${index}`}
                  className="hover:bg-[#3a3836]/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#FAE7D5]">
                      {player.playerName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#FAE7D5]/80">
                      {player.playerNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#FAE7D5]/70">
                      {player.position}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-lg font-bold text-[#D95B1C]">
                      {player.gamesPlayed}
                    </span>
                    <span className="text-sm text-[#FAE7D5]/60 ml-1">場</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-semibold text-[#FAE7D5]">
                      {player.totalPoints ?? 0}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {sortedPlayers.length === 0 && (
        <div className="text-center py-8 text-[#FAE7D5]/60">
          暫無球員出場數據
        </div>
      )}
    </div>
  );
}
