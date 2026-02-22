"use client";

import { UserStats } from "@/types";
import { useRef } from "react";
import html2canvas from "html2canvas";

interface ShareCardProps {
  stats: UserStats;
  userId: string;
}

export default function ShareCard({ stats, userId }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#1e3a8a", // Match gradient start color
        width: 1080,
        height: 1080,
      });

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `tvl-season-review-${userId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error("Failed to generate screenshot:", error);
      alert("生成圖片失敗，請稍後再試");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        分享您的賽季回顧
      </h2>

      {/* Share Card - Optimized for social media (1080x1080) */}
      <div
        ref={cardRef}
        className="mx-auto bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-2xl p-8 md:p-12 shadow-2xl"
        style={{
          width: "100%",
          maxWidth: "1080px",
          aspectRatio: "1 / 1",
        }}
      >
        <div className="h-full flex flex-col justify-between text-white">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">我的 TVL 賽季回顧</h1>
            <p className="text-lg md:text-xl text-blue-200">2024 賽季</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 my-6 md:my-8">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold mb-1 md:mb-2">{stats.gamesAttended}</div>
              <div className="text-base md:text-xl text-blue-200">觀賽場次</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold mb-1 md:mb-2">
                {stats.totalScores.toLocaleString()}
              </div>
              <div className="text-base md:text-xl text-blue-200">總得分</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold mb-1 md:mb-2">
                {stats.totalSpikes.toLocaleString()}
              </div>
              <div className="text-base md:text-xl text-blue-200">總扣殺</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold mb-1 md:mb-2">
                {stats.totalMonsterBlocks.toLocaleString()}
              </div>
              <div className="text-base md:text-xl text-blue-200">總攔網得分</div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
              {stats.uniquePlayers} 位球員
            </div>
            <p className="text-base md:text-lg text-blue-200">在這個賽季中出場</p>
            {stats.favoriteTeam && (
              <p className="text-lg md:text-xl mt-3 md:mt-4 text-yellow-300">
                最常觀看: {stats.favoriteTeam}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          下載圖片分享
        </button>
      </div>
    </div>
  );
}
