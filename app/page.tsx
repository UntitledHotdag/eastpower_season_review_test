"use client";

import { useState, useEffect } from "react";
import IdInputStep from "@/components/IdInputStep";
import GameSelectionStep from "@/components/GameSelectionStep";
import StatsSummary from "@/components/StatsSummary";
import ShareCard from "@/components/ShareCard";
import { Game, UserStats } from "@/types";
import { getGamesForUser } from "@/lib/dummyData";
import { getStatsForGames } from "@/lib/dummyStats";

type Step = "id-input" | "game-selection" | "stats" | "share";

export default function Home() {
  const [step, setStep] = useState<Step>("id-input");
  const [userId, setUserId] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameIds, setSelectedGameIds] = useState<string[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);

  // Load games when user enters ID
  const handleIdSubmit = async (id: string) => {
    setUserId(id);
    setLoading(true);
    try {
      const userGames = await getGamesForUser(id);
      setGames(userGames);
      setStep("game-selection");
    } catch (error) {
      console.error("Failed to load games:", error);
      alert("載入比賽資料失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  // Generate stats when games are selected
  const handleGenerateStats = async (gameIds: string[]) => {
    setSelectedGameIds(gameIds);
    setLoading(true);
    
    // Optional: Add a small delay for realism
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    try {
      const userStats = await getStatsForGames(gameIds, games);
      setStats(userStats);
      setStep("stats");
    } catch (error) {
      console.error("Failed to generate stats:", error);
      alert("生成統計資料失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to share card
  const handleViewShareCard = () => {
    setStep("share");
  };

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Step Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div
              className={`flex items-center ${
                step === "id-input" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "id-input"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium">輸入 ID</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div
              className={`flex items-center ${
                step === "game-selection" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "game-selection"
                    ? "bg-blue-600 text-white"
                    : step === "stats" || step === "share"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">選擇比賽</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div
              className={`flex items-center ${
                step === "stats" || step === "share"
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "stats" || step === "share"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
              <span className="ml-2 text-sm font-medium">查看回顧</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">載入中...</p>
          </div>
        )}

        {/* Step Content */}
        {!loading && (
          <>
            {step === "id-input" && <IdInputStep onNext={handleIdSubmit} />}
            {step === "game-selection" && (
              <GameSelectionStep
                games={games}
                onGenerate={handleGenerateStats}
              />
            )}
            {step === "stats" && stats && (
              <div className="space-y-8">
                <StatsSummary stats={stats} />
                <div className="text-center">
                  <button
                    onClick={handleViewShareCard}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                  >
                    生成分享卡片
                  </button>
                </div>
              </div>
            )}
            {step === "share" && stats && (
              <ShareCard stats={stats} userId={userId} />
            )}
          </>
        )}
      </div>
    </main>
  );
}
