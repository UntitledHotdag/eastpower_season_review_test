"use client";

import { useState } from "react";

interface IdInputStepProps {
  onNext: (userId: string) => void;
}

export default function IdInputStep({ onNext }: IdInputStepProps) {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim()) {
      onNext(userId.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#FAE7D5]">
        臺北伊斯特 主場賽事回顧
      </h2>
      <p className="text-center text-[#FAE7D5]/70 text-sm mb-6">TPVL 企業排球聯賽</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-[#FAE7D5]/90 mb-2"
          >
            請輸入您的身分證字號
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="例如: A123456789"
            className="w-full px-4 py-3 bg-[#2a2826] border border-[#3a3836] rounded-lg focus:ring-2 focus:ring-[#D95B1C] focus:border-[#D95B1C] outline-none text-[#FAE7D5] placeholder-[#FAE7D5]/50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#D95B1C] hover:bg-[#c04f18] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          下一步
        </button>
      </form>
    </div>
  );
}
