// chat.js
// Manages chat functionalities in Legends of Anthreya, including player-to-player and system messages.

import { sendDataToServer, fetchDataFromServer } from './network.js';
import gameConfig from './config.js';

// Chat message class to handle the creation and management of messages
class ChatMessage {
    constructor(senderId, message, timestamp = Date.now()) {
        this.senderId = senderId;
        this.message = message;
        this.timestamp = timestamp;
    }
}

// Chat system class to handle all chat operations
class ChatSystem {
    constructor() {
        this.messages = [];
    }

    // Send a chat message to the server
    async sendMessage(senderId, message) {
        const chatMessage = new ChatMessage(senderId, message);
        this.messages.push(chatMessage);
        await sendDataToServer('sendChatMessage', chatMessage);
    }

    // Fetch chat messages from the server
    async fetchMessages() {
        try {
            const messages = await fetchDataFromServer('getChatMessages');
            this.messages = messages.map(msg => new ChatMessage(msg.senderId, msg.message, msg.timestamp));
        } catch (error) {
            console.error('Error fetching chat messages:', error);
        }
    }

    // Display a message locally in the chat UI
    displayMessage(message) {
        const chatBox = document.getElementById('chat-box');
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.senderId}: ${message.message}`;
        chatBox.appendChild(messageElement);
    }

    // Update method to refresh chat messages periodically
    update() {
        this.fetchMessages().then(() => {
            this.messages.forEach(msg => this.displayMessage(msg));
        });
    }
}

// Export the ChatSystem class for use in other parts of the game
export const manageChat = new ChatSystem();

// Example usage:
// manageChat.sendMessage('player123', 'Hello, world!');
// manageChat.update();
