// lore.js
// Manages the lore, stories, and historical elements in Legends of Anthreya

import { getRandomElement } from './utils.js';
import { sendMessage } from './chat.js';

const loreDatabase = {
    books: [
        { title: "The Rise of Anthreya", content: "Anthreya was once a barren land until the Ancients arrived, bringing with them the knowledge of magic and civilization." },
        { title: "The Great Wars", content: "The Great Wars were a series of devastating conflicts that shaped the political landscape of Anthreya. Heroes rose and fell, and the wars ended with the Treaty of Eldoria." },
        { title: "The Secrets of the Emerald Forest", content: "The Emerald Forest is said to be home to ancient spirits that guard powerful relics. Many adventurers have ventured into its depths, few have returned." },
        { title: "Legends of the Silver Port", content: "Silver Port, a bustling hub of trade, is known for its skilled craftsmen and dangerous pirates. Many tales of fortune and doom started here." }
    ],
    historicalSites: [
        { name: "Ancient Ruins", description: "These ruins are remnants of a once-great civilization, known for their advanced use of stone and magic." },
        { name: "Dark Dungeons", description: "Below the ground lie dungeons that hold untold horrors and treasures. Only the bravest dare to explore them." }
    ]
};

/**
 * Fetches a random book from the lore database.
 * @returns {object} A book object with title and content.
 */
export function getRandomBook() {
    return getRandomElement(loreDatabase.books);
}

/**
 * Fetches information about a historical site by name.
 * @param {string} siteName - The name of the historical site.
 * @returns {object} An object containing the name and description of the site.
 */
export function getHistoricalSiteInfo(siteName) {
    const site = loreDatabase.historicalSites.find(site => site.name === siteName);
    if (!site) {
        console.error(`No historical site found with the name: ${siteName}`);
        return null;
    }
    return site;
}

/**
 * Displays lore content to a player.
 * @param {number} playerId - The ID of the player.
 * @param {string} content - The lore content to display.
 */
export function displayLoreContent(playerId, content) {
    sendMessage(playerId, content);
}

/**
 * Initializes lore elements in the game.
 */
export function initializeLore() {
    console.log("Initializing game lore...");
    // Additional initialization logic can be added here
}

