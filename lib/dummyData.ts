import { Game } from "@/types";

// TPVL (Taiwan Professional Volleyball League) - 4 teams
// Match data from https://eastpower.tw/match-ups
// 臺北伊斯特, 臺中連莊, 桃園雲豹, 台鋼天鷹

const EASTPOWER = "臺北伊斯特";
const TEAMS = ["臺北伊斯特", "臺中連莊", "桃園雲豹", "台鋼天鷹"];

// Match-ups from eastpower.tw/match-ups - 2025-26 TPVL season
// Format: matchNumber, date, homeTeam, awayTeam, venue, homeScore?, awayScore?
const MATCHES: Array<{
  matchNumber: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  homeScore?: number;
  awayScore?: number;
}> = [
  // Future matches
  { matchNumber: 68, date: "2026-02-01", homeTeam: "臺中連莊", awayTeam: EASTPOWER, venue: "國立臺灣體育運動大學" },
  { matchNumber: 70, date: "2026-02-07", homeTeam: "台鋼天鷹", awayTeam: EASTPOWER, venue: "高雄市鳳山體育館" },
  { matchNumber: 72, date: "2026-02-08", homeTeam: "臺中連莊", awayTeam: EASTPOWER, venue: "國立臺灣體育運動大學" },
  { matchNumber: 73, date: "2026-02-28", homeTeam: "桃園雲豹", awayTeam: EASTPOWER, venue: "中原大學" },
  { matchNumber: 75, date: "2026-03-01", homeTeam: "台鋼天鷹", awayTeam: EASTPOWER, venue: "高雄市鳳山體育館" },
  { matchNumber: 77, date: "2026-03-07", homeTeam: "臺中連莊", awayTeam: EASTPOWER, venue: "國立臺灣體育運動大學" },
  { matchNumber: 79, date: "2026-03-08", homeTeam: "桃園雲豹", awayTeam: EASTPOWER, venue: "中原大學" },
  { matchNumber: 82, date: "2026-03-22", homeTeam: "桃園雲豹", awayTeam: EASTPOWER, venue: "中原大學" },
  { matchNumber: 83, date: "2026-03-28", homeTeam: "台鋼天鷹", awayTeam: EASTPOWER, venue: "高雄市鳳山體育館" },
  { matchNumber: 86, date: "2026-04-11", homeTeam: "台鋼天鷹", awayTeam: EASTPOWER, venue: "高雄市鳳山體育館" },
  { matchNumber: 88, date: "2026-04-12", homeTeam: "桃園雲豹", awayTeam: EASTPOWER, venue: "中原大學" },
  { matchNumber: 90, date: "2026-05-09", homeTeam: EASTPOWER, awayTeam: "台鋼天鷹", venue: "臺北市立大學天母體育館" },
  { matchNumber: 91, date: "2026-05-10", homeTeam: EASTPOWER, awayTeam: "臺中連莊", venue: "臺北市立大學天母體育館" },
  { matchNumber: 94, date: "2026-05-16", homeTeam: EASTPOWER, awayTeam: "桃園雲豹", venue: "臺北市立大學天母體育館" },
  { matchNumber: 95, date: "2026-05-17", homeTeam: EASTPOWER, awayTeam: "台鋼天鷹", venue: "臺北市立大學天母體育館" },
  // Completed matches
  { matchNumber: 66, date: "2026-01-31", homeTeam: "台鋼天鷹", awayTeam: EASTPOWER, venue: "高雄市鳳山體育館", homeScore: 3, awayScore: 2 },
  { matchNumber: 64, date: "2026-01-25", homeTeam: EASTPOWER, awayTeam: "桃園雲豹", venue: "臺北市立大學天母體育館", homeScore: 3, awayScore: 2 },
  { matchNumber: 61, date: "2026-01-24", homeTeam: EASTPOWER, awayTeam: "臺中連莊", venue: "臺北市立大學天母體育館", homeScore: 3, awayScore: 0 },
  { matchNumber: 59, date: "2026-01-18", homeTeam: EASTPOWER, awayTeam: "臺中連莊", venue: "臺北市立大學天母體育館", homeScore: 1, awayScore: 3 },
  { matchNumber: 58, date: "2026-01-17", homeTeam: EASTPOWER, awayTeam: "台鋼天鷹", venue: "臺北市立大學天母體育館", homeScore: 3, awayScore: 1 },
  { matchNumber: 55, date: "2026-01-11", homeTeam: EASTPOWER, awayTeam: "桃園雲豹", venue: "臺北市立大學天母體育館", homeScore: 3, awayScore: 2 },
  { matchNumber: 54, date: "2026-01-10", homeTeam: EASTPOWER, awayTeam: "台鋼天鷹", venue: "臺北市立大學天母體育館", homeScore: 1, awayScore: 3 },
  { matchNumber: 52, date: "2026-01-04", homeTeam: EASTPOWER, awayTeam: "臺中連莊", venue: "臺北市立大學天母體育館", homeScore: 3, awayScore: 1 },
  { matchNumber: 49, date: "2026-01-03", homeTeam: "桃園雲豹", awayTeam: EASTPOWER, venue: "臺北市立大學天母體育館", homeScore: 3, awayScore: 0 },
  { matchNumber: 45, date: "2025-12-21", homeTeam: "台鋼天鷹", awayTeam: EASTPOWER, venue: "高雄市鳳山體育館", homeScore: 3, awayScore: 0 },
  { matchNumber: 43, date: "2025-12-20", homeTeam: "桃園雲豹", awayTeam: EASTPOWER, venue: "中原大學", homeScore: 3, awayScore: 0 },
  { matchNumber: 41, date: "2025-12-14", homeTeam: "桃園雲豹", awayTeam: EASTPOWER, venue: "中原大學", homeScore: 3, awayScore: 2 },
  { matchNumber: 39, date: "2025-12-13", homeTeam: "臺中連莊", awayTeam: EASTPOWER, venue: "國立臺灣體育運動大學", homeScore: 3, awayScore: 0 },
  { matchNumber: 37, date: "2025-12-07", homeTeam: "台鋼天鷹", awayTeam: EASTPOWER, venue: "高雄市鳳山體育館", homeScore: 3, awayScore: 2 },
  { matchNumber: 35, date: "2025-12-06", homeTeam: "臺中連莊", awayTeam: EASTPOWER, venue: "國立臺灣體育運動大學", homeScore: 3, awayScore: 0 },
  { matchNumber: 33, date: "2025-11-30", homeTeam: "台鋼天鷹", awayTeam: EASTPOWER, venue: "國立成功大學", homeScore: 3, awayScore: 1 },
  { matchNumber: 31, date: "2025-11-29", homeTeam: "臺中連莊", awayTeam: EASTPOWER, venue: "國立臺灣體育運動大學", homeScore: 3, awayScore: 0 },
  { matchNumber: 29, date: "2025-11-23", homeTeam: EASTPOWER, awayTeam: "臺中連莊", venue: "臺北市立大學天母體育館", homeScore: 0, awayScore: 3 },
  { matchNumber: 28, date: "2025-11-22", homeTeam: EASTPOWER, awayTeam: "台鋼天鷹", venue: "臺北市立大學天母體育館", homeScore: 1, awayScore: 3 },
  { matchNumber: 26, date: "2025-11-16", homeTeam: "臺中連莊", awayTeam: EASTPOWER, venue: "國立臺灣體育運動大學", homeScore: 3, awayScore: 1 },
  { matchNumber: 24, date: "2025-11-15", homeTeam: "桃園雲豹", awayTeam: EASTPOWER, venue: "中原大學", homeScore: 3, awayScore: 1 },
  { matchNumber: 22, date: "2025-11-09", homeTeam: EASTPOWER, awayTeam: "台鋼天鷹", venue: "臺北市立大學天母體育館", homeScore: 2, awayScore: 3 },
  { matchNumber: 19, date: "2025-11-08", homeTeam: EASTPOWER, awayTeam: "臺中連莊", venue: "臺北市立大學天母體育館", homeScore: 1, awayScore: 3 },
  { matchNumber: 17, date: "2025-11-02", homeTeam: "桃園雲豹", awayTeam: EASTPOWER, venue: "中原大學", homeScore: 1, awayScore: 3 },
  { matchNumber: 15, date: "2025-11-01", homeTeam: "臺中連莊", awayTeam: EASTPOWER, venue: "國立臺灣體育運動大學", homeScore: 3, awayScore: 1 },
  { matchNumber: 14, date: "2025-10-26", homeTeam: EASTPOWER, awayTeam: "臺中連莊", venue: "臺北市立大學天母體育館", homeScore: 2, awayScore: 3 },
  { matchNumber: 11, date: "2025-10-25", homeTeam: EASTPOWER, awayTeam: "桃園雲豹", venue: "臺北市立大學天母體育館", homeScore: 3, awayScore: 2 },
  { matchNumber: 10, date: "2025-10-12", homeTeam: EASTPOWER, awayTeam: "桃園雲豹", venue: "臺北市立大學天母體育館", homeScore: 3, awayScore: 1 },
];

function matchesToGames(): Game[] {
  return MATCHES.map((m, i) => ({
    id: `game-${m.matchNumber}`,
    date: m.date,
    homeTeam: m.homeTeam,
    awayTeam: m.awayTeam,
    venue: m.venue,
    round: Math.floor(i / 8) + 1,
    matchNumber: m.matchNumber,
    homeScore: m.homeScore,
    awayScore: m.awayScore,
    isHome: m.homeTeam === EASTPOWER,
  }));
}

export const DUMMY_GAMES: Game[] = matchesToGames();

// Abstraction for Phase 2 - can be replaced with real API call
export async function getGamesForUser(userId: string): Promise<Game[]> {
  return DUMMY_GAMES;
}
