// combat.js
// Manages combat mechanics and interactions in Legends of Anthreya

import { randomInt, clamp } from './utils.js';
import { incrementSkillExperience } from './skills.js';

const combatTriangle = {
    melee: 'ranged',
    ranged: 'magic',
    magic: 'melee'
};

/**
 * Simulates a combat encounter between two entities.
 * @param {object} attacker - The attacking entity.
 * @param {object} defender - The defending entity.
 */
function engageCombat(attacker, defender) {
    const attackType = attacker.combatType;
    const defenseType = defender.combatType;
    const isAdvantage = combatTriangle[attackType] === defenseType;

    let attackPower = calculateAttackPower(attacker, isAdvantage);
    let defensePower = calculateDefensePower(defender);

    let damage = Math.max(0, attackPower - defensePower);
    defender.health -= damage;

    console.log(`${attacker.name} attacks ${defender.name} with ${attackType}, dealing ${damage} damage.`);
    checkHealth(defender);
}

/**
 * Calculates the attack power of an entity, considering combat advantages.
 * @param {object} entity - The entity whose attack power is being calculated.
 * @param {boolean} isAdvantage - Whether the entity has a combat advantage.
 * @returns {number} - The calculated attack power.
 */
function calculateAttackPower(entity, isAdvantage) {
    const basePower = randomInt(5, 10) + entity.skills.combat.level;
    return isAdvantage ? basePower * 1.5 : basePower;
}

/**
 * Calculates the defense power of an entity.
 * @param {object} entity - The entity whose defense power is being calculated.
 * @returns {number} - The calculated defense power.
 */
function calculateDefensePower(entity) {
    return randomInt(3, 7) + entity.skills.combat.level;
}

/**
 * Checks the health of an entity and logs if they are defeated.
 * @param {object} entity - The entity to check.
 */
function checkHealth(entity) {
    if (entity.health <= 0) {
        console.log(`${entity.name} has been defeated.`);
        incrementSkillExperience('combat', 50); // Reward for defeating an opponent
    }
}

export { engageCombat };
