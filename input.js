// input.js
// Handles all input-related functionality for Legends of Anthreya

import Phaser from 'phaser';
import gameConfig from './config.js';

/**
 * Manages the input handling for the game, setting up keyboard and mouse controls.
 */
class InputManager {
    constructor(game) {
        this.game = game;
        this.cursors = null;
        this.spaceBar = null;
        this.setupInput();
    }

    /**
     * Sets up the keyboard and mouse inputs using Phaser's input system.
     */
    setupInput() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spaceBar = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Setup mouse input
        this.game.input.on('pointerdown', this.handlePointerDown, this);
    }

    /**
     * Handles keyboard input each frame.
     */
    update() {
        if (this.cursors.left.isDown) {
            // Handle left movement
            console.log('Move player left');
        } else if (this.cursors.right.isDown) {
            // Handle right movement
            console.log('Move player right');
        }

        if (this.cursors.up.isDown) {
            // Handle moving up
            console.log('Move player up');
        } else if (this.cursors.down.isDown) {
            // Handle moving down
            console.log('Move player down');
        }

        if (this.spaceBar.isDown) {
            // Handle action like jump or interact
            console.log('Player action');
        }
    }

    /**
     * Handles mouse clicks within the game.
     * @param {Phaser.Input.Pointer} pointer - The Phaser pointer object representing the mouse.
     */
    handlePointerDown(pointer) {
        console.log(`Mouse clicked at position (${pointer.x}, ${pointer.y})`);
        // Additional logic to determine what was clicked can be added here
    }
}

export function handleInput(game) {
    const inputManager = new InputManager(game);
    game.events.on('update', () => inputManager.update());
}

