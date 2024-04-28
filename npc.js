// npc.js
// Handles Non-Player Character (NPC) behaviors, interactions, and lifecycle in Legends of Anthreya

import { getRandomInt, getRandomElement } from './utils.js';
import { updateWorldEvents } from './events.js';
import { sendMessage } from './chat.js';

class NPC {
    constructor(id, name, type, position, dialogues, isQuestGiver) {
        this.id = id;
        this.name = name;
        this.type = type; // e.g., trader, quest giver, monster
        this.position = position; // { x: int, y: int }
        this.dialogues = dialogues;
        this.isQuestGiver = isQuestGiver;
        this.isInteracting = false;
    }

    interact(player) {
        if (this.isInteracting) {
            sendMessage(player.id, "This NPC is currently busy.");
            return;
        }

        this.isInteracting = true;
        sendMessage(player.id, this.getDialogue());
        this.handleSpecialInteractions(player);
        this.isInteracting = false;
    }

    getDialogue() {
        return getRandomElement(this.dialogues);
    }

    handleSpecialInteractions(player) {
        if (this.isQuestGiver) {
            this.giveQuest(player);
        }
    }

    giveQuest(player) {
        // Placeholder for quest assignment logic
        sendMessage(player.id, `Quest given by ${this.name}. Check your quest log!`);
        // Logic to add quest to player's quest log
    }

    moveTo(newPosition) {
        this.position = newPosition;
        updateWorldEvents(); // Notify the system to update the world state
    }
}

// NPC Factory for creating NPC instances with predefined types
class NPCFactory {
    static createNPC(type, id) {
        const npcData = NPCFactory.getNPCData(type);
        return new NPC(id, npcData.name, type, npcData.position, npcData.dialogues, npcData.isQuestGiver);
    }

    static getNPCData(type) {
        const npcTypes = {
            trader: {
                name: "Trader Joe",
                position: { x: 100, y: 200 },
                dialogues: ["Welcome to my shop!", "Looking for something specific?"],
                isQuestGiver: false
            },
            questGiver: {
                name: "Gandalf the Grey",
                position: { x: 300, y: 400 },
                dialogues: ["A great adventure is waiting for you.", "Do you feel ready to take on a challenge?"],
                isQuestGiver: true
            },
            monster: {
                name: "Goblin",
                position: { x: 500, y: 600 },
                dialogues: ["Grrr...!", "Leave this place, human!"],
                isQuestGiver: false
            }
        };

        return npcTypes[type] || npcTypes.trader; // Default to trader if type is undefined
    }
}

export { NPC, NPCFactory };
