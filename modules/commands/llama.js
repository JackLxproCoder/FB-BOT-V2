const axios = require('axios');

module.exports.config = {
    name: "Llama",
    hasPermssion: 0,
    version: "1.0.0",
    credits: "JackLxproCoder",
    description: "EDUCATIONAL",
    usePrefix: false,
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 5,
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const { messageID, threadID } = event;

    try {
        const lad = await api.sendMessage("🔎 Searching for an answer. Please wait...", threadID, messageID);
        const response = await axios.get(`https://kaiz-apis.gleeze.com/api/llama3-turbo?ask=${encodeURIComponent(event.body)}`);

        if (data.response) {
            const responseMessage = `𝐋𝐥𝐚𝐦𝐚\n━━━━━━━━━━━━━━━━━━\n${data.response}\n━━━━━━━━━━━━━━━━━━\n`;
            api.editMessage(responseMessage, lad.messageID, threadID, messageID);
        } else {
            api.sendMessage("An error occurred while processing your request.", threadID, messageID);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", threadID, messageID);
    }
};

module.exports.run = async function ({ api, event, args }) {
    const { messageID, threadID } = event;

    if (!args[0]) return api.sendMessage("Please provide your question or request.\n\nExample: Gemini write a story about a young girl who discovers a magical portal in her backyard.", threadID, messageID);

    try {
        const lad = await api.sendMessage("🔎 Searching for an answer. Please wait...", threadID, messageID);
        const response = await axios.get(`https://kaiz-apis.gleeze.com/api/llama3-turbo?ask=${encodeURIComponent(args.join(" "))}`);

        if (response.data.gemini) {
            const responseMessage = `𝐋𝐥𝐚𝐦𝐚\n━━━━━━━━━━━━━━━━━━\n${data.response}\n━━━━━━━━━━━━━━━━━━\n`;
            api.editMessage(responseMessage, lad.messageID, threadID, messageID);
        } else {
            api.sendMessage("An error occurred while processing your request.", threadID, messageID);
        }

        global.client.handleReply.push({
            name: this.config.name,
            messageID: lad.messageID,
            author: event.senderID
        });
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", threadID, messageID);
    }
};
