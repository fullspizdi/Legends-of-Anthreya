/**
 * map.js
 * Handles the creation, management, and interaction with the game world map in Legends of Anthreya.
 */

import { loadMapAssets } from './assetsLoader.js';
import { getRandomEventLocation } from './events.js';
import { updatePlayerPosition } from './player.js';

class GameMap {
    constructor() {
        this.regions = [];
        this.currentMap = null;
        this.mapAssets = loadMapAssets();
    }

    /**
     * Initializes the game map with predefined regions and settings.
     */
    initMap() {
        this.regions = [
            { name: "Emerald Forest", type: "forest", coordinates: { x: 0, y: 0 }, events: [] },
            { name: "Silverport Town", type: "town", coordinates: { x: 50, y: 100 }, events: [] },
            { name: "Ruins of Eldoria", type: "ruins", coordinates: { x: 100, y: 50 }, events: [] },
            { name: "Dungeon of Shadows", type: "dungeon", coordinates: { x: 150, y: 150 }, events: [] }
        ];

        // Populate each region with dynamic events
        this.regions.forEach(region => {
            region.events.push(getRandomEventLocation());
        });

        this.currentMap = this.regions[0]; // Start at the first region
    }

    /**
     * Renders the map and its components.
     */
    renderMap() {
        console.log(`Rendering map: ${this.currentMap.name}`);
        // Additional rendering logic here
    }

    /**
     * Handles player movement on the map.
     * @param {number} x - The x-coordinate of the player's destination.
     * @param {number} y - The y-coordinate of the player's destination.
     */
    movePlayer(x, y) {
        console.log(`Moving player to coordinates: (${x}, ${y})`);
        updatePlayerPosition(x, y);
        this.checkRegionChange(x, y);
    }

    /**
     * Checks if the player has moved to a new region and updates the current map.
     * @param {number} x - The x-coordinate of the player's location.
     * @param {number} y - The y-coordinate of the player's location.
     */
    checkRegionChange(x, y) {
        const newRegion = this.regions.find(region => region.coordinates.x === x && region.coordinates.y === y);
        if (newRegion && newRegion !== this.currentMap) {
            console.log(`Entering new region: ${newRegion.name}`);
            this.currentMap = newRegion;
            this.renderMap();
        }
    }
}

export default GameMap;
