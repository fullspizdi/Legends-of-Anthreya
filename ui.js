// ui.js
// Manages all user interface elements and interactions in Legends of Anthreya

import Phaser from 'phaser';
import gameConfig from './config.js';

class UI {
    constructor(game) {
        this.game = game;
        this.healthBar = null;
        this.manaBar = null;
        this.staminaBar = null;
        this.currencyDisplay = null;
        this.chatWindow = null;
        this.inventoryWindow = null;
        this.questLog = null;
    }

    setupUI() {
        this.createHealthBar();
        this.createManaBar();
        this.createStaminaBar();
        this.createCurrencyDisplay();
        this.createChatWindow();
        this.createInventoryWindow();
        this.createQuestLog();
    }

    createHealthBar() {
        this.healthBar = this.game.add.graphics();
        this.healthBar.fillStyle(0xff0000, 1);
        this.healthBar.fillRect(20, 20, 200, 20);
    }

    createManaBar() {
        this.manaBar = this.game.add.graphics();
        this.manaBar.fillStyle(0x0000ff, 1);
        this.manaBar.fillRect(20, 50, 200, 20);
    }

    createStaminaBar() {
        this.staminaBar = this.game.add.graphics();
        this.staminaBar.fillStyle(0x00ff00, 1);
        this.staminaBar.fillRect(20, 80, 200, 20);
    }

    createCurrencyDisplay() {
        this.currencyDisplay = this.game.add.text(650, 20, `Gold: ${gameConfig.economy.initialCurrency}`, {
            font: `${gameConfig.defaultFontSize} ${gameConfig.defaultFont}`,
            fill: gameConfig.defaultFontColor
        });
    }

    createChatWindow() {
        this.chatWindow = this.game.add.dom(400, 550).createFromCache('chatTemplate');
        this.chatWindow.setScrollFactor(0);
        this.chatWindow.setDepth(gameConfig.uiZIndex);
    }

    createInventoryWindow() {
        this.inventoryWindow = this.game.add.dom(750, 300).createFromCache('inventoryTemplate');
        this.inventoryWindow.setScrollFactor(0);
        this.inventoryWindow.setDepth(gameConfig.uiZIndex);
    }

    createQuestLog() {
        this.questLog = this.game.add.dom(150, 300).createFromCache('questLogTemplate');
        this.questLog.setScrollFactor(0);
        this.questLog.setDepth(gameConfig.uiZIndex);
    }

    updateHealth(health) {
        this.healthBar.clear();
        this.healthBar.fillStyle(0xff0000, 1);
        this.healthBar.fillRect(20, 20, 2 * health, 20);
    }

    updateMana(mana) {
        this.manaBar.clear();
        this.manaBar.fillStyle(0x0000ff, 1);
        this.manaBar.fillRect(20, 50, 2 * mana, 20);
    }

    updateStamina(stamina) {
        this.staminaBar.clear();
        this.staminaBar.fillStyle(0x00ff00, 1);
        this.staminaBar.fillRect(20, 80, 2 * stamina, 20);
    }

    updateCurrency(currency) {
        this.currencyDisplay.setText(`Gold: ${currency}`);
    }
}

export function setupUI(game) {
    const ui = new UI(game);
    ui.setupUI();
    return ui;
}
