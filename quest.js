// quest.js
// Manages quest logic and interactions for Legends of Anthreya MMORPG

import gameConfig from './config.js';
import { sendDataToServer } from './network.js';
import { randomInt } from './utils.js';

const quests = {
    activeQuests: [],
    completedQuests: []
};

/**
 * Initializes quests for the player.
 */
export function initializeQuests() {
    console.log("Initializing quests...");
    // Fetch initial quests from the server or local storage
    loadQuests();
}

/**
 * Loads quests from the server.
 */
async function loadQuests() {
    try {
        const data = await sendDataToServer('fetchQuests', {});
        quests.activeQuests = data.activeQuests;
        quests.completedQuests = data.completedQuests;
    } catch (error) {
        console.error("Failed to load quests:", error);
    }
}

/**
 * Processes quests, checking for updates and completion.
 * @param {object} gameContext - The game context.
 */
export function processQuests(gameContext) {
    quests.activeQuests.forEach(quest => {
        if (checkQuestCompletion(quest)) {
            completeQuest(quest);
        }
    });
}

/**
 * Checks if a quest is completed.
 * @param {object} quest - The quest to check.
 * @returns {boolean} - True if the quest is completed, false otherwise.
 */
function checkQuestCompletion(quest) {
    // Placeholder logic for quest completion
    return randomInt(0, 1) === 1; // Randomly completes a quest for demonstration
}

/**
 * Marks a quest as completed and handles post-completion logic.
 * @param {object} quest - The quest to complete.
 */
function completeQuest(quest) {
    console.log(`Completing quest: ${quest.title}`);
    quests.completedQuests.push(quest);
    quests.activeQuests = quests.activeQuests.filter(q => q !== quest);

    // Update the server with the quest completion
    sendDataToServer('completeQuest', { questId: quest.id })
        .then(() => {
            console.log("Quest completion recorded on server.");
        })
        .catch(error => {
            console.error("Failed to record quest completion:", error);
        });

    // Reward the player
    rewardPlayer(quest);
}

/**
 * Rewards the player upon completing a quest.
 * @param {object} quest - The quest from which to reward the player.
 */
function rewardPlayer(quest) {
    console.log(`Rewarding player for completing quest: ${quest.title}`);
    // Example reward logic
    gameContext.player.experience += quest.reward.experience;
    gameContext.player.currency += quest.reward.currency;
}

export default {
    initializeQuests,
    processQuests
};
