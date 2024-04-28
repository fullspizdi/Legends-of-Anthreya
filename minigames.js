// minigames.js
// Handles the logic and functionality of various minigames within the world of Anthreya

import { Player } from './player.js';
import { NPC } from './npc.js';
import { Utils } from './utils.js';
import { UI } from './ui.js';
import { Events } from './events.js';

class Minigames {
    constructor() {
        this.minigamesList = {
            'Fishing Frenzy': new FishingFrenzy(),
            'Blacksmith Blitz': new BlacksmithBlitz(),
            'Herblore Hustle': new HerbloreHustle(),
            'Combat Arena': new CombatArena()
        };
    }

    startMinigame(gameName, player) {
        if (this.minigamesList[gameName]) {
            this.minigamesList[gameName].start(player);
        } else {
            console.error(`Minigame ${gameName} not found.`);
        }
    }
}

class FishingFrenzy {
    start(player) {
        UI.displayMessage("Welcome to Fishing Frenzy!");
        // Simulate fishing activity
        Events.trigger('onFishingStart', player);
        Utils.delay(5000).then(() => {
            player.updateSkill('Fishing', Utils.randomInt(1, 5));
            UI.displayMessage("You've caught some fish and earned fishing experience!");
            Events.trigger('onFishingEnd', player);
        });
    }
}

class BlacksmithBlitz {
    start(player) {
        UI.displayMessage("Welcome to Blacksmith Blitz!");
        // Simulate blacksmithing activity
        Events.trigger('onBlacksmithingStart', player);
        Utils.delay(5000).then(() => {
            player.updateSkill('Blacksmithing', Utils.randomInt(1, 5));
            UI.displayMessage("You've forged a new item and earned blacksmithing experience!");
            Events.trigger('onBlacksmithingEnd', player);
        });
    }
}

class HerbloreHustle {
    start(player) {
        UI.displayMessage("Welcome to Herblore Hustle!");
        // Simulate herblore activity
        Events.trigger('onHerbloreStart', player);
        Utils.delay(5000).then(() => {
            player.updateSkill('Herblore', Utils.randomInt(1, 5));
            UI.displayMessage("You've created a new potion and earned herblore experience!");
            Events.trigger('onHerbloreEnd', player);
        });
    }
}

class CombatArena {
    start(player) {
        UI.displayMessage("Welcome to the Combat Arena!");
        // Simulate combat activity
        Events.trigger('onCombatStart', player);
        Utils.delay(5000).then(() => {
            player.updateSkill('Combat', Utils.randomInt(1, 5));
            UI.displayMessage("You've defeated your opponent and earned combat experience!");
            Events.trigger('onCombatEnd', player);
        });
    }
}

export const minigames = new Minigames();
