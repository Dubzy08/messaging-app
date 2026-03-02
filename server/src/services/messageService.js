const { Conversation, Message } = require('../models/messageModels');

async function getConversations(userId) {
    const conversations = await Conversation.find({ participants: userId })
    return conversations;
}

async function findExistingDm(userId_a, userId_b) {
    const conversation = await Conversation.findOne({
        participants: { $all: [userId_a, userId_b]},
        isGroup: false
    })
    return conversation;
}

async function createConversation(participants, isGroup = false, groupName = null) {
    const conversation = new Conversation({participants, isGroup, groupName})
    return await conversation.save();
}

async function getMessages(conversationId) {
    const messages = await Message.find({
        conversationId: conversationId
    }).sort({ time: 1 })
    return messages;
}

async function createMessage(conversationId, from, text="") {
    const time = Date.now();
    const message = new Message({
        conversationId, 
        from, 
        text,
        time: time,
        readBy: []
    })
    await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: {
            text: text,
            from: from,
            time: time
        }
    })
    return await message.save();
}

module.exports = {
    getConversations,
    findExistingDm,
    createConversation,
    getMessages,
    createMessage
}