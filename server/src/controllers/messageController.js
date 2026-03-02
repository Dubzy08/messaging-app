const { getConversations, findExistingDm, getMessages, createConversation, createMessage } = require('../services/messageService.js');

async function getConversationsController(req, res) {
    try {
        const { userId } = req.params;
        const conversations = await getConversations(userId);
        return res.status(200).json(conversations);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getMessagesController(req, res) {
    try {
        const { conversationId } = req.params;
        const messages = await getMessages(conversationId);
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getOrCreateDmController(req, res) {
    try {
        const { userId_a, userId_b } = req.body;
        let conversation = await findExistingDm(userId_a, userId_b);
        if (!conversation) {
            conversation = await createConversation([userId_a, userId_b]);
        }
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function createGroupController(req, res) {
    try {
        const { participants, groupName } = req.body;
        const conversation = await createConversation(participants, true, groupName);
        return res.status(201).json(conversation);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function createMessageController(req, res) {
    try {
        const { conversationId, from, text } = req.body;
        const message = await createMessage(conversationId, from, text);
        return res.status(201).json(message);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getConversationsController,
    getMessagesController,
    getOrCreateDmController,
    createGroupController,
    createMessageController
};