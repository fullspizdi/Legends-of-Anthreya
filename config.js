// config.js
// Configuration settings for Legends of Anthreya MMORPG

const gameConfig = {
    gameTitle: "Legends of Anthreya",
    gameWidth: 800,
    gameHeight: 600,
    backgroundColor: "#5c5f77", // A neutral tone that fits the fantasy theme
    serverURL: "https://anthreya-game-server.com", // Placeholder URL for game server
    assetPath: "assets/", // Base path for game assets
    defaultFont: "Arial",
    defaultFontSize: "16px",
    defaultFontColor: "#ffffff",
    uiZIndex: 100, // Z-index for UI elements to ensure they are on top
    networkRetryLimit: 3, // Number of times to retry network requests before failing
    networkRetryDelay: 3000, // Delay in milliseconds between network retries
    playerInitialStats: {
        health: 100,
        mana: 50,
        stamina: 75
    },
    npcUpdateInterval: 5000, // Time in milliseconds between NPC state updates
    questUpdateInterval: 10000, // Time in milliseconds between quest state checks
    eventCheckInterval: 15000, // Time in milliseconds to check for dynamic events
    combat: {
        meleeStrength: 1.2,
        rangedStrength: 1.1,
        magicStrength: 1.3
    },
    economy: {
        initialCurrency: 1000,
        tradeTaxPercent: 5 // Percent tax on all player trades
    },
    minigameSettings: {
        puzzleTimeLimit: 300000, // 5 minutes in milliseconds
        fishingMaxAttempts: 20
    }
};

export default gameConfig;
