// player.js
// Manages player interactions, stats, and behaviors in Legends of Anthreya

import gameConfig from './config.js';
import { sendDataToServer } from './network.js';
import { clamp } from './utils.js';

class Player {
    constructor(game) {
        this.game = game;
        this.health = gameConfig.playerInitialStats.health;
        this.mana = gameConfig.playerInitialStats.mana;
        this.stamina = gameConfig.playerInitialStats.stamina;
        this.currency = gameConfig.economy.initialCurrency;
        this.position = { x: 0, y: 0 }; // Default starting position
        this.inventory = [];
    }

    update() {
        this.updateHealth();
        this.updateMana();
        this.updateStamina();
    }

    updateHealth(amount = 0) {
        this.health = clamp(this.health + amount, 0, 100);
    }

    updateMana(amount = 0) {
        this.mana = clamp(this.mana + amount, 0, 100);
    }

    updateStamina(amount = 0) {
        this.stamina = clamp(this.stamina + amount, 0, 100);
    }

    moveTo(newX, newY) {
        this.position.x = newX;
        this.position.y = newY;
        this.game.scene.refresh(); // Assuming there's a method to refresh the scene
    }

    addItemToInventory(item) {
        this.inventory.push(item);
        // Optionally send inventory update to server
        sendDataToServer('updateInventory', this.inventory);
    }

    useItem(itemIndex) {
        const item = this.inventory[itemIndex];
        if (item) {
            // Apply item effects based on type, e.g., restore health or mana
            switch (item.type) {
                case 'healthPotion':
                    this.updateHealth(item.effectValue);
                    break;
                case 'manaPotion':
                    this.updateMana(item.effectValue);
                    break;
                // Add more cases as necessary
            }
            this.inventory.splice(itemIndex, 1); // Remove item from inventory after use
            sendDataToServer('updateInventory', this.inventory);
        }
    }

    attack(target) {
        // Placeholder for attack logic, should interact with combat.js
        // Example:
        // const damage = calculateDamage(this, target);
        // target.receiveDamage(damage);
    }

    receiveDamage(amount) {
        this.updateHealth(-amount);
        if (this.health <= 0) {
            this.handleDeath();
        }
    }

    handleDeath() {
        console.log("Player has died.");
        // Handle player death (respawn logic, item loss, etc.)
    }
}

function managePlayer(game) {
    const player = new Player(game);
    game.on('update', () => player.update());
    game.on('move', (x, y) => player.moveTo(x, y));
    game.on('useItem', (index) => player.useItem(index));
    game.on('attack', (target) => player.attack(target));
    game.on('receiveDamage', (amount) => player.receiveDamage(amount));
}

export { managePlayer, Player };
