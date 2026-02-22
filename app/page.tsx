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
      <header className="mb-12 border-b border-[#3a3836] pb-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-6">
            <img 
              src="/assets/eastpower-logo.png" 
              alt="臺北伊斯特" 
              className="h-10 md:h-12 w-auto flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="border-l border-[#3a3836] pl-4 md:pl-6">
              <h1 className="text-xl md:text-2xl font-bold text-[#FAE7D5] tracking-wide">臺北伊斯特</h1>
              <p className="text-xs md:text-sm text-[#FAE7D5]/60 mt-0.5">主場賽事回顧</p>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs text-[#FAE7D5]/50 uppercase tracking-wider">TPVL</p>
            <p className="text-xs text-[#FAE7D5]/50 mt-0.5">企業排球聯賽</p>
          </div>
        </div>
      </header>
      <div className="container mx-auto">
        {/* Step Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div
              className={`flex items-center ${
                step === "id-input" ? "text-[#D95B1C]" : "text-[#FAE7D5]/50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "id-input"
                    ? "bg-[#D95B1C] text-white"
                    : "bg-[#3a3836] text-[#FAE7D5]/50"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium">輸入 ID</span>
            </div>
            <div className="w-12 h-0.5 bg-[#3a3836]"></div>
            <div
              className={`flex items-center ${
                step === "game-selection" ? "text-[#D95B1C]" : "text-[#FAE7D5]/50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "game-selection"
                    ? "bg-[#D95B1C] text-white"
                    : step === "stats" || step === "share"
                    ? "bg-[#D95B1C] text-white"
                    : "bg-[#3a3836] text-[#FAE7D5]/50"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">選擇比賽</span>
            </div>
            <div className="w-12 h-0.5 bg-[#3a3836]"></div>
            <div
              className={`flex items-center ${
                step === "stats" || step === "share"
                  ? "text-[#D95B1C]"
                  : "text-[#FAE7D5]/50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "stats" || step === "share"
                    ? "bg-[#D95B1C] text-white"
                    : "bg-[#3a3836] text-[#FAE7D5]/50"
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D95B1C]"></div>
            <p className="mt-4 text-[#FAE7D5]/70">載入中...</p>
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
                    className="bg-[#D95B1C] hover:bg-[#c04f18] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
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
