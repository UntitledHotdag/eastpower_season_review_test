import { GameDetail, PlayerGameStats } from "@/types";

// East Power players from the team roster
const EASTPOWER_PLAYERS = [
  { name: "高偉誠", number: "#9", position: "副攻手" },
  { name: "陳冠銘", number: "#4", position: "副攻手/快攻手/主攻手" },
  { name: "申承勳", number: "#6", position: "舉球員" },
  { name: "曾祥銘", number: "#14", position: "快攻手" },
  { name: "洪榮發", number: "#99", position: "副攻手" },
  { name: "簡顯銘", number: "#10", position: "自由球員" },
  { name: "安德烈", number: "#5", position: "快攻手" },
  { name: "雷貝洛", number: "#8", position: "主攻手" },
  { name: "陳冠中", number: "#21", position: "快攻手" },
  { name: "郭宇祥", number: "#12", position: "舉球員" },
  { name: "楊子頡", number: "#11", position: "主攻手" },
  { name: "趙宇陽", number: "#7", position: "舉球員" },
  { name: "范鍾坪圻", number: "#18", position: "自由球員" },
  { name: "劉少宇", number: "#20", position: "舉球員" },
];

// Generate dummy game details based on match number
// Phase 1: Deterministic dummy data
// Phase 2: Fetch from eastpower.tw/result-game/{matchNumber} and tpvl.tw/schedule/{id}
export async function getGameDetail(matchNumber: number): Promise<GameDetail | null> {
  // Phase 1: Return dummy data
  // Phase 2: Fetch from APIs
  
  // Simple hash for deterministic player selection
  const hash = matchNumber % EASTPOWER_PLAYERS.length;
  
  // Select 7-10 players who played (simulating starting lineup + substitutes)
  const numPlayers = 7 + (matchNumber % 4); // 7-10 players
  const players: PlayerGameStats[] = [];
  
  for (let i = 0; i < numPlayers; i++) {
    const playerIndex = (hash + i) % EASTPOWER_PLAYERS.length;
    const player = EASTPOWER_PLAYERS[playerIndex];
    
    // Generate stats based on position and match number
    const basePoints = 5 + (matchNumber % 15);
    const attackPoints = player.position.includes("攻") ? basePoints : Math.floor(basePoints / 2);
    const blockPoints = player.position.includes("攻") || player.position.includes("攔") ? Math.floor(basePoints / 3) : 0;
    const servePoints = matchNumber % 5 === 0 ? 1 : 0;
    
    players.push({
      playerName: player.name,
      playerNumber: player.number,
      position: player.position,
      attackPoints,
      blockPoints,
      servePoints,
      totalPoints: attackPoints + blockPoints + servePoints,
    });
  }
  
  // Generate set scores (best of 5)
  const sets = matchNumber % 2 === 0 ? 5 : 4; // 4 or 5 sets
  const setScores: number[] = [];
  for (let i = 0; i < sets; i++) {
    const homeScore = 20 + (matchNumber + i) % 10;
    const awayScore = homeScore + (matchNumber % 3 === 0 ? -2 : 2);
    setScores.push(homeScore, awayScore);
  }
  
  return {
    matchNumber,
    date: `2025-${String(Math.floor(matchNumber / 10) + 10).padStart(2, '0')}-${String(matchNumber % 28 + 1).padStart(2, '0')}`,
    homeTeam: matchNumber % 2 === 0 ? "臺北伊斯特" : "台鋼天鷹",
    awayTeam: matchNumber % 2 === 0 ? "台鋼天鷹" : "臺北伊斯特",
    venue: "臺北市立大學天母體育館",
    homeScore: matchNumber % 2 === 0 ? 3 : 2,
    awayScore: matchNumber % 2 === 0 ? 2 : 3,
    setScores,
    players,
  };
}

// Get game details for multiple matches
export async function getGameDetails(matchNumbers: number[]): Promise<GameDetail[]> {
  const details = await Promise.all(
    matchNumbers.map(num => getGameDetail(num))
  );
  return details.filter((d): d is GameDetail => d !== null);
}
