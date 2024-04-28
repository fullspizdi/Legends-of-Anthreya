// world.js
// Manages the world environment, regions, and dynamic changes in Legends of Anthreya

import Phaser from 'phaser';
import gameConfig from './config.js';
import { randomInt } from './utils.js';
import { updateNPCs } from './npc.js';
import { checkEvents } from './events.js';

class World {
    constructor(game) {
        this.game = game;
        this.regions = [];
        this.currentWeather = 'clear';
        this.weatherTypes = ['clear', 'rain', 'fog', 'snow'];
    }

    createWorld() {
        this.loadRegions();
        this.initializeWeather();
    }

    loadRegions() {
        // Placeholder for loading regions data
        this.regions = [
            { name: 'Emerald Forest', monsters: 30, resources: ['wood', 'herbs'] },
            { name: 'Silver Port', monsters: 5, resources: ['fish', 'ore'] },
            { name: 'Ancient Ruins', monsters: 20, resources: ['relics', 'stone'] },
            { name: 'Dark Dungeons', monsters: 50, resources: ['magic stones', 'rare herbs'] }
        ];
    }

    initializeWeather() {
        // Randomly set initial weather
        this.currentWeather = this.weatherTypes[randomInt(0, this.weatherTypes.length - 1)];
        this.game.events.on('update', this.updateWeather, this);
    }

    updateWeather() {
        // Change weather randomly at defined intervals
        if (randomInt(0, 100) > 95) { // 5% chance to change weather each update
            this.currentWeather = this.weatherTypes[randomInt(0, this.weatherTypes.length - 1)];
            console.log(`Weather changed to: ${this.currentWeather}`);
        }
    }

    updateWorld() {
        // Update world state, such as NPC movements and event checks
        updateNPCs();
        checkEvents();
    }
}

function updateWorld(game) {
    if (!game.world) {
        game.world = new World(game);
        game.world.createWorld();
    }
    game.world.updateWorld();
}

export { updateWorld };
