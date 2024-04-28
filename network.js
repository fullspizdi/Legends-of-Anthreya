// network.js
// Handles all network-related operations for Legends of Anthreya MMORPG

import gameConfig from './config.js';

// Function to initialize network communication
export function initNetwork() {
    console.log("Initializing network connections...");
    // Additional initialization logic can be added here
}

// Function to send data to the server
export async function sendDataToServer(path, data) {
    const url = `${gameConfig.serverURL}/${path}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to send data to server:", error);
        handleNetworkError(error);
    }
}

// Function to receive data from the server
export async function fetchDataFromServer(path) {
    const url = `${gameConfig.serverURL}/${path}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch data from server:", error);
        handleNetworkError(error);
    }
}

// Function to handle network errors and retry logic
function handleNetworkError(error) {
    console.error("Network error encountered:", error);
    // Implement retry logic based on gameConfig settings
    let retries = gameConfig.networkRetryLimit;
    const retryDelay = gameConfig.networkRetryDelay;

    const retryFetch = async (url, options) => {
        while (retries > 0) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (err) {
                retries--;
                console.log(`Retrying... attempts left: ${retries}`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
        throw new Error('Max retries reached. Network request failed.');
    };

    return retryFetch;
}

