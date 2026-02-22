"use client";

import { Game } from "@/types";
import { useState } from "react";

interface GameSelectionStepProps {
  games: Game[];
  onGenerate: (selectedGameIds: string[]) => void;
}

export default function GameSelectionStep({
  games,
  onGenerate,
}: GameSelectionStepProps) {
  const [selectedGameIds, setSelectedGameIds] = useState<Set<string>>(
    new Set()
  );

  const toggleGame = (gameId: string) => {
    const newSelected = new Set(selectedGameIds);
    if (newSelected.has(gameId)) {
      newSelected.delete(gameId);
    } else {
      newSelected.add(gameId);
    }
    setSelectedGameIds(newSelected);
  };

  const handleGenerate = () => {
    if (selectedGameIds.size > 0) {
      onGenerate(Array.from(selectedGameIds));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        選擇您觀看的比賽
      </h2>
      <p className="text-center text-gray-600 mb-6">
        已選擇 {selectedGameIds.size} 場比賽
      </p>

      <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-2 mb-6">
        {games.map((game) => (
          <label
            key={game.id}
            className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer border border-transparent hover:border-gray-200 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedGameIds.has(game.id)}
              onChange={() => toggleGame(game.id)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">
                  第 {game.round} 輪
                </span>
                <span className="text-sm text-gray-500">{game.venue}</span>
              </div>
              <div className="text-gray-700 mt-1">
                {game.homeTeam} vs {game.awayTeam}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {formatDate(game.date)}
              </div>
            </div>
          </label>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={selectedGameIds.size === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        生成我的賽季回顧
      </button>
    </div>
  );
}
