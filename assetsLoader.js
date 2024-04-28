// assetsLoader.js
// Manages the loading of all game assets for Legends of Anthreya

import Phaser from 'phaser';
import gameConfig from './config.js';

/**
 * Loads all necessary assets for the game.
 * @param {Phaser.Scene} scene - The scene to which assets are being loaded.
 */
export function loadAssets(scene) {
    // Load images
    scene.load.image('player', `${gameConfig.assetPath}player.png`);
    scene.load.image('tree', `${gameConfig.assetPath}tree.png`);
    scene.load.image('sword', `${gameConfig.assetPath}sword.png`);
    scene.load.image('potion', `${gameConfig.assetPath}potion.png`);

    // Load spritesheets
    scene.load.spritesheet('monsters', `${gameConfig.assetPath}monsters.png`, {
        frameWidth: 32,
        frameHeight: 32
    });

    // Load audio
    scene.load.audio('backgroundMusic', `${gameConfig.assetPath}background.mp3`);
    scene.load.audio('combatSound', `${gameConfig.assetPath}combat.wav`);

    // Load tilemaps
    scene.load.tilemapTiledJSON('map', `${gameConfig.assetPath}map.json`);

    // Load other assets as needed
}

/**
 * Specifically loads assets required for the map.
 * @returns {Object} - An object containing loaded map assets.
 */
export function loadMapAssets() {
    const mapAssets = {
        tiles: `${gameConfig.assetPath}tiles.png`,
        decorations: `${gameConfig.assetPath}decorations.png`
    };

    return mapAssets;
}
