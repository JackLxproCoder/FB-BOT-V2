const axios = require('axios');

module.exports.config = {
    name: "ai",
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
        const response = await axios.get(`https://kaiz-apis.gleeze.com/api/deepseek-v3?ask=${encodeURIComponent(event.body)}`);
        
        const result = data.response;
        const responseMessage = `𝗗𝗲𝗲𝗽𝘀𝗲𝗲𝗸 𝗩𝟯\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━\n`;
        api.editMessage(responseMessage, lad.messageID, threadID, messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", threadID, messageID);
    }
};

module.exports.run = async function ({ api, event, args }) {
    const { messageID, threadID } = event;

    if (!args[0]) return api.sendMessage("Please provide your question.\n\nExample: ai what is the solar system?", threadID, messageID);

    const lad = await api.sendMessage("🔎 Searching for an answer. Please wait...", threadID, messageID);

    try {
        if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0]) {
            const attachment = event.messageReply.attachments[0];

            if (attachment.type === "photo") {
                const imageURL = attachment.url;
                const geminiVisionUrl = `https://kaiz-apis.gleeze.com/api/gemini-vision?q=${encodeURIComponent(args.join(" "))}&uid=${event.senderID}&imageUrl=${encodeURIComponent(imageURL)}`;
                const response = await axios.get(geminiVisionUrl);

                if (data.response) {
                    const visionResponse = response.data.response;
                    return api.editMessage(`𝗚𝗲𝗺𝗶𝗻𝗶 𝗩𝗶𝘀𝗶𝗼𝗻\n━━━━━━━━━━━━━━━━━━\n${visionResponse}\n━━━━━━━━━━━━━━━━━━\n`, lad.messageID, event.threadID, event.messageID);
                } else {
                    return api.sendMessage("🤖 Failed to recognize the image.", threadID, messageID);
                }
            }
        }

        const response = await axios.get(`https://kaiz-apis.gleeze.com/api/deepseek-v3?ask=${encodeURIComponent(args.join(" "))}`);
        const result = data.response;

        const responseMessage = `𝗗𝗲𝗲𝗽𝘀𝗲𝗲𝗸 𝗩𝟯\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━`;
        api.editMessage(responseMessage, lad.messageID, event.threadID, event.messageID);
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
