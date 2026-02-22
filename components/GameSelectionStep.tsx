"use client";

import { Game } from "@/types";
import { useState, useMemo } from "react";

interface GameSelectionStepProps {
  games: Game[];
  onGenerate: (selectedGameIds: string[]) => void;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getMonthKey(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthLabel(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
  });
}

export default function GameSelectionStep({
  games,
  onGenerate,
}: GameSelectionStepProps) {
  const [selectedGameIds, setSelectedGameIds] = useState<Set<string>>(
    new Set()
  );

  const gamesByMonth = useMemo(() => {
    const map = new Map<string, Game[]>();
    const sorted = [...games].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    for (const game of sorted) {
      const key = getMonthKey(game.date);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(game);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [games]);

  const toggleGame = (gameId: string) => {
    const newSelected = new Set(selectedGameIds);
    if (newSelected.has(gameId)) {
      newSelected.delete(gameId);
    } else {
      newSelected.add(gameId);
    }
    setSelectedGameIds(newSelected);
  };

  const selectAllInMonth = (monthGames: Game[]) => {
    const newSelected = new Set(selectedGameIds);
    const allSelected = monthGames.every((g) => newSelected.has(g.id));
    if (allSelected) {
      monthGames.forEach((g) => newSelected.delete(g.id));
    } else {
      monthGames.forEach((g) => newSelected.add(g.id));
    }
    setSelectedGameIds(newSelected);
  };

  const handleGenerate = () => {
    if (selectedGameIds.size > 0) {
      onGenerate(Array.from(selectedGameIds));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-[#FAE7D5]">
        選擇您觀看的比賽
      </h2>
      <p className="text-center text-[#FAE7D5]/70 mb-6">
        已選擇 {selectedGameIds.size} 場比賽
      </p>

      <div className="max-h-[28rem] overflow-y-auto border border-[#3a3836] bg-[#2a2826] rounded-lg mb-6">
        {gamesByMonth.map(([monthKey, monthGames]) => {
          const allSelected = monthGames.every((g) => selectedGameIds.has(g.id));
          const label = getMonthLabel(monthGames[0].date);
          return (
            <div
              key={monthKey}
              className="border-b border-[#3a3836] last:border-b-0"
            >
              <button
                type="button"
                onClick={() => selectAllInMonth(monthGames)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#1f1e1d] hover:bg-[#2a2826] text-left transition-colors"
              >
                <span className="font-semibold text-[#FAE7D5]">{label}</span>
                <span className="text-sm text-[#FAE7D5]/60">
                  {monthGames.filter((g) => selectedGameIds.has(g.id)).length} / {monthGames.length} 場
                </span>
                <span className="text-xs text-[#D95B1C] ml-2">
                  {allSelected ? "取消全選" : "全選"}
                </span>
              </button>
              <div className="p-2 space-y-1">
                {monthGames.map((game) => (
                  <label
                    key={game.id}
                    className="flex items-center p-3 hover:bg-[#3a3836] rounded-lg cursor-pointer border border-transparent hover:border-[#D95B1C]/20 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGameIds.has(game.id)}
                      onChange={() => toggleGame(game.id)}
                      className="w-5 h-5 text-[#D95B1C] rounded focus:ring-[#D95B1C]"
                    />
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-[#FAE7D5] text-sm">
                          場次編號{game.matchNumber ?? game.id.replace("game-", "")}
                        </span>
                        <span className="text-xs text-[#FAE7D5]/50 truncate max-w-[8rem]">
                          {game.venue}
                        </span>
                      </div>
                      <div className="text-[#FAE7D5]/90 text-sm mt-0.5">
                        {game.homeTeam} vs {game.awayTeam}
                        {game.homeScore != null && game.awayScore != null && (
                          <span className="ml-2 font-semibold text-[#D95B1C]">
                            {game.homeScore} – {game.awayScore}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#FAE7D5]/50 mt-0.5">
                        {formatDate(game.date)}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleGenerate}
        disabled={selectedGameIds.size === 0}
        className="w-full bg-[#D95B1C] hover:bg-[#c04f18] disabled:bg-[#3a3836] disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        生成我的賽季回顧
      </button>
    </div>
  );
}
