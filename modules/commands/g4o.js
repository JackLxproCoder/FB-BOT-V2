const axios = require('axios');

module.exports.config = {
    name: "g4o",
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
        const response = await axios.get(`https://kaiz-apis.gleeze.com/api/gpt4o-mini?ask=${encodeURIComponent(event.body)}`);

        if (data.response) {
            const responseMessage = `𝗚𝗣𝗧𝟰𝗼-𝗠𝗶𝗻𝗶\n━━━━━━━━━━━━━━━━━━\n${response.data.response}\n━━━━━━━━━━━━━━━━━━\n`;
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

    if (!args[0]) return api.sendMessage("Please provide your question.\n\nExample: g4o what is the solar system?", threadID, messageID);

    try {
        const lad = await api.sendMessage("🔎 Searching for an answer. Please wait...", threadID, messageID);
        const response = await axios.get(`https://kaiz-apis.gleeze.com/api/gpt4o-mini?ask=${encodeURIComponent(args.join(" "))}`);

        if (data.response) {
            const responseMessage = `𝗚𝗣𝟰𝗼-𝗠𝗶𝗻𝗶\n━━━━━━━━━━━━━━━━━━\n${data.response}\n━━━━━━━━━━━━━━━━━━\n`;
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
