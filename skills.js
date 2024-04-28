// skills.js
// Manages skill-based progression and skill-related functionalities in Legends of Anthreya

import { clamp, randomInt } from './utils.js';
import gameConfig from './config.js';

const skills = {
    woodcutting: {
        level: 1,
        experience: 0
    },
    herblore: {
        level: 1,
        experience: 0
    },
    blacksmithing: {
        level: 1,
        experience: 0
    },
    fishing: {
        level: 1,
        experience: 0
    },
    combat: {
        level: 1,
        experience: 0
    }
};

/**
 * Increment the experience of a given skill and handle level up if necessary.
 * @param {string} skillName - The name of the skill to increment.
 * @param {number} exp - The amount of experience to add.
 */
function incrementSkillExperience(skillName, exp) {
    if (skills[skillName]) {
        skills[skillName].experience += exp;
        checkForLevelUp(skillName);
    }
}

/**
 * Check if the skill should level up based on experience and handle the level up.
 * @param {string} skillName - The name of the skill to check.
 */
function checkForLevelUp(skillName) {
    const skill = skills[skillName];
    const nextLevelExp = calculateExperienceForNextLevel(skill.level);
    if (skill.experience >= nextLevelExp) {
        skill.level++;
        skill.experience -= nextLevelExp;
        console.log(`${skillName} has leveled up to level ${skill.level}!`);
        // Trigger any level-up specific events or effects here
    }
}

/**
 * Calculate the required experience for the next level.
 * @param {number} currentLevel - The current level of the skill.
 * @returns {number} - The required experience for the next level.
 */
function calculateExperienceForNextLevel(currentLevel) {
    return Math.floor(100 * Math.pow(1.1, currentLevel - 1));
}

/**
 * Get the current level and experience of a skill.
 * @param {string} skillName - The name of the skill to query.
 * @returns {object} - An object containing the level and experience of the skill.
 */
function getSkillInfo(skillName) {
    if (skills[skillName]) {
        return { level: skills[skillName].level, experience: skills[skillName].experience };
    }
    return null;
}

export {
    incrementSkillExperience,
    getSkillInfo
};
