// economy.js
// Manages the economic aspects of Legends of Anthreya MMORPG

import gameConfig from './config.js';
import { sendDataToServer } from './network.js';
import { clamp, numberWithCommas } from './utils.js';

class EconomyManager {
    constructor() {
        this.playerCurrency = gameConfig.economy.initialCurrency;
    }

    // Function to adjust player's currency, can be positive or negative
    adjustCurrency(amount) {
        this.playerCurrency = clamp(this.playerCurrency + amount, 0, Number.MAX_SAFE_INTEGER);
        console.log(`Currency updated: ${numberWithCommas(this.playerCurrency)}`);
    }

    // Function to handle player transactions
    processTransaction(itemPrice, isPurchase) {
        const tax = (itemPrice * gameConfig.economy.tradeTaxPercent) / 100;
        const totalCost = isPurchase ? itemPrice + tax : itemPrice - tax;

        if (isPurchase && this.playerCurrency >= totalCost) {
            this.adjustCurrency(-totalCost);
            console.log(`Purchase successful: ${numberWithCommas(totalCost)} deducted.`);
            return true;
        } else if (!isPurchase) {
            this.adjustCurrency(totalCost);
            console.log(`Sale successful: ${numberWithCommas(totalCost)} added.`);
            return true;
        }

        console.log("Transaction failed: Insufficient funds.");
        return false;
    }

    // Function to sync currency with server
    async syncCurrencyWithServer() {
        try {
            const data = { currency: this.playerCurrency };
            const response = await sendDataToServer('syncCurrency', data);
            console.log("Currency synced with server:", response);
        } catch (error) {
            console.error("Failed to sync currency with server:", error);
        }
    }
}

export const economyManager = new EconomyManager();
