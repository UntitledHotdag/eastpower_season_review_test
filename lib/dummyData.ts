import { Game } from "@/types";

// TVL (Taiwan Volleyball League) team names
const TEAMS = [
  "台電",
  "長力",
  "雲林",
  "屏東",
  "桃園",
  "台中",
  "新北",
  "高雄",
];

const VENUES = [
  "台北體育館",
  "新莊體育館",
  "台中港區體育館",
  "高雄巨蛋",
  "屏東縣立體育館",
  "桃園市立體育館",
];

// Generate dummy games for the season
// Starting from a base date and creating games across multiple rounds
function generateDummyGames(): Game[] {
  const games: Game[] = [];
  const baseDate = new Date("2024-10-01"); // Season start date
  let gameId = 1;
  let round = 1;
  
  // Generate ~25 games across 5 rounds
  for (let i = 0; i < 25; i++) {
    if (i > 0 && i % 5 === 0) {
      round++;
    }
    
    const gameDate = new Date(baseDate);
    gameDate.setDate(baseDate.getDate() + i * 2); // Games every 2 days
    
    // Randomly select teams (ensure different teams)
    const shuffled = [...TEAMS].sort(() => Math.random() - 0.5);
    const homeTeam = shuffled[0];
    const awayTeam = shuffled[1];
    const venue = VENUES[Math.floor(Math.random() * VENUES.length)];
    
    games.push({
      id: `game-${gameId++}`,
      date: gameDate.toISOString().split("T")[0],
      homeTeam,
      awayTeam,
      venue,
      round,
    });
  }
  
  return games;
}

export const DUMMY_GAMES: Game[] = generateDummyGames();

// Abstraction for Phase 2 - can be replaced with real API call
export async function getGamesForUser(userId: string): Promise<Game[]> {
  // Phase 1: Return all dummy games
  // Phase 2: Fetch from real database based on userId
  return DUMMY_GAMES;
}
