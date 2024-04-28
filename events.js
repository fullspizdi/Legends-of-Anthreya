// events.js
// Manages dynamic events and interactions in the world of Legends of Anthreya

import { randomInt, getRandomElement } from './utils.js';
import { updateNPCs } from './npc.js';
import { updateWorld } from './world.js';

const events = {
    dynamicEvents: [],
    limitedTimeEvents: []
};

/**
 * Initializes and schedules dynamic events in the game world.
 */
export function initializeEvents(game) {
    console.log("Initializing dynamic events...");
    scheduleEvents(game);
}

/**
 * Schedules and manages the occurrence of dynamic events.
 */
function scheduleEvents(game) {
    game.time.addEvent({
        delay: 10000, // every 10 seconds
        callback: () => triggerRandomEvent(game),
        loop: true
    });
}

/**
 * Triggers a random event based on predefined probabilities and event types.
 */
function triggerRandomEvent(game) {
    const eventType = getRandomElement(['npcMovement', 'weatherChange', 'specialEvent']);
    switch (eventType) {
        case 'npcMovement':
            moveNPCsRandomly(game);
            break;
        case 'weatherChange':
            updateWorld.changeWeather(game);
            break;
        case 'specialEvent':
            triggerSpecialEvent(game);
            break;
        default:
            console.log("No event triggered");
    }
}

/**
 * Moves NPCs randomly to simulate dynamic world.
 */
function moveNPCsRandomly(game) {
    const npcList = game.npcs.getAll(); // Assuming a method to get all NPCs
    npcList.forEach(npc => {
        if (randomInt(0, 100) > 50) { // 50% chance to move each NPC
            const newX = npc.position.x + randomInt(-5, 5);
            const newY = npc.position.y + randomInt(-5, 5);
            npc.updatePosition(newX, newY);
            console.log(`NPC ${npc.name} moved to new position: (${newX}, ${newY})`);
        }
    });
}

/**
 * Triggers special events that can include festivals, invasions, etc.
 */
function triggerSpecialEvent(game) {
    const specialEvent = getRandomElement(['festival', 'invasion', 'mysteryGuest']);
    events.limitedTimeEvents.push({
        type: specialEvent,
        startTime: Date.now(),
        duration: randomInt(3600000, 7200000) // lasts between 1 to 2 hours
    });
    console.log(`Special event triggered: ${specialEvent}`);
}

/**
 * Handles the update cycle for events, checking and cleaning up any expired events.
 */
export function handleEvents(game) {
    events.limitedTimeEvents = events.limitedTimeEvents.filter(event => {
        if (Date.now() > event.startTime + event.duration) {
            console.log(`Event ended: ${event.type}`);
            return false;
        }
        return true;
    });
}

export default {
    initializeEvents,
    handleEvents
};
