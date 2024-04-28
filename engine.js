// engine.js
// This file initializes and manages the main game engine for Legends of Anthreya

import Phaser from 'phaser';
import { initNetwork } from './network.js';
import { loadAssets } from './assetsLoader.js';
import { setupUI } from './ui.js';
import { handleInput } from './input.js';
import { updateWorld } from './world.js';
import { managePlayer } from './player.js';
import { manageNPCs } from './npc.js';
import { processQuests } from './quest.js';
import { handleEvents } from './events.js';
import { manageGuilds } from './guilds.js';
import { manageChat } from './chat.js';
import { runMinigames } from './minigames.js';
import { exploreLore } from './lore.js';

class GameEngine {
    constructor() {
        this.game = null;
    }

    initializeGame() {
        const config = {
            type: Phaser.AUTO,
            parent: 'game-container',
            width: 800,
            height: 600,
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };

        this.game = new Phaser.Game(config);
        initNetwork();
    }

    preload() {
        loadAssets(this);
    }

    create() {
        setupUI(this);
        managePlayer(this);
        manageNPCs(this);
        processQuests(this);
        handleEvents(this);
        manageGuilds(this);
        manageChat(this);
        runMinigames(this);
        exploreLore(this);
    }

    update(time, delta) {
        handleInput(this);
        updateWorld(this, time, delta);
    }
}

const anthreyaGameEngine = new GameEngine();
anthreyaGameEngine.initializeGame();

export default anthreyaGameEngine;
