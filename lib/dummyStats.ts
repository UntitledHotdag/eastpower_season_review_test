import { Game, UserStats } from "@/types";

// Simple hash function for deterministic stats
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate deterministic stats for a game based on its ID
function getStatsForGame(gameId: string): {
  scores: number;
  spikes: number;
  monsterBlocks: number;
  players: number;
} {
  const hash = hashString(gameId);
  
  // Use hash to generate consistent stats
  return {
    scores: 150 + (hash % 50), // 150-199 points
    spikes: 80 + (hash % 40), // 80-119 spikes
    monsterBlocks: 10 + (hash % 15), // 10-24 blocks
    players: 20 + (hash % 6), // 20-25 players
  };
}

// Calculate favorite team (most frequently seen)
function getFavoriteTeam(games: Game[]): string {
  const teamCounts: Record<string, number> = {};
  
  games.forEach((game) => {
    teamCounts[game.homeTeam] = (teamCounts[game.homeTeam] || 0) + 1;
    teamCounts[game.awayTeam] = (teamCounts[game.awayTeam] || 0) + 1;
  });
  
  return Object.entries(teamCounts).reduce((a, b) =>
    teamCounts[a[0]] > teamCounts[b[0]] ? a : b
  )[0];
}

// Abstraction for Phase 2 - can be replaced with real API call
export async function getStatsForGames(
  gameIds: string[],
  games: Game[]
): Promise<UserStats> {
  // Phase 1: Calculate dummy stats
  // Phase 2: Fetch from real database
  
  const selectedGames = games.filter((g) => gameIds.includes(g.id));
  
  if (selectedGames.length === 0) {
    return {
      gamesAttended: 0,
      totalScores: 0,
      totalSpikes: 0,
      totalMonsterBlocks: 0,
      uniquePlayers: 0,
    };
  }
  
  let totalScores = 0;
  let totalSpikes = 0;
  let totalMonsterBlocks = 0;
  const allPlayers = new Set<number>();
  
  selectedGames.forEach((game) => {
    const stats = getStatsForGame(game.id);
    totalScores += stats.scores;
    totalSpikes += stats.spikes;
    totalMonsterBlocks += stats.monsterBlocks;
    
    // Add players to set (simulate unique players)
    for (let i = 0; i < stats.players; i++) {
      allPlayers.add(hashString(`${game.id}-player-${i}`) % 100);
    }
  });
  
  const avgPointsPerGame = Math.round(totalScores / selectedGames.length);
  const favoriteTeam = getFavoriteTeam(selectedGames);
  
  return {
    gamesAttended: selectedGames.length,
    totalScores,
    totalSpikes,
    totalMonsterBlocks,
    uniquePlayers: allPlayers.size,
    avgPointsPerGame,
    favoriteTeam,
  };
}
