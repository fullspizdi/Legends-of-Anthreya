// guilds.js
// Manages guild interactions, creation, and events in Legends of Anthreya

import { sendDataToServer } from './network.js';
import { sendMessage } from './chat.js';

class Guild {
    constructor(name, leaderId) {
        this.name = name;
        this.leaderId = leaderId;
        this.members = [leaderId];
        this.guildBank = [];
    }

    addMember(playerId) {
        if (!this.members.includes(playerId)) {
            this.members.push(playerId);
            sendMessage(playerId, `Welcome to the guild: ${this.name}!`);
            sendDataToServer('updateGuildMembers', this.members);
        }
    }

    removeMember(playerId) {
        this.members = this.members.filter(id => id !== playerId);
        sendMessage(playerId, `You have been removed from the guild: ${this.name}.`);
        sendDataToServer('updateGuildMembers', this.members);
    }

    promoteMember(playerId) {
        if (playerId === this.leaderId) {
            sendMessage(playerId, "You are already the leader of the guild.");
            return;
        }
        this.leaderId = playerId;
        sendMessage(playerId, `You have been promoted to leader of the guild: ${this.name}.`);
        sendDataToServer('updateGuildLeader', this.leaderId);
    }

    depositItem(playerId, item) {
        this.guildBank.push(item);
        sendMessage(playerId, `Item ${item.name} has been deposited to the guild bank.`);
        sendDataToServer('updateGuildBank', this.guildBank);
    }

    withdrawItem(playerId, itemIndex) {
        if (itemIndex >= 0 && itemIndex < this.guildBank.length) {
            const item = this.guildBank.splice(itemIndex, 1)[0];
            sendMessage(playerId, `Item ${item.name} has been withdrawn from the guild bank.`);
            sendDataToServer('updateGuildBank', this.guildBank);
            return item;
        }
        sendMessage(playerId, "Invalid item index.");
    }
}

class GuildManager {
    constructor() {
        this.guilds = [];
    }

    createGuild(name, leaderId) {
        const newGuild = new Guild(name, leaderId);
        this.guilds.push(newGuild);
        sendDataToServer('guildCreated', { name, leaderId });
        return newGuild;
    }

    disbandGuild(guildId) {
        this.guilds = this.guilds.filter(guild => guild.id !== guildId);
        sendDataToServer('guildDisbanded', guildId);
    }

    getGuildByName(name) {
        return this.guilds.find(guild => guild.name === name);
    }
}

export default GuildManager;
