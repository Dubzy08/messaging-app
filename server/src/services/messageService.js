const { Conversation, Message } = require('../models/messageModels');
const mongoose = require('mongoose');

async function getConversations(userId) {
    return await Conversation.aggregate([
        { $match: { participants: new mongoose.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: 'users',
                localField: 'participants',
                foreignField: '_id',
                as: 'participantData'
            }
        },
        {
            $addFields: {
                sortDate: {
                    $ifNull: ['$lastMessage.time', '$createdAt']
                }
            }
        },
        { $sort: { sortDate: -1 } }
    ]);
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