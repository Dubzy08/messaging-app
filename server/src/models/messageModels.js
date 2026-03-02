const mongoose = require('../configuration/dbConfig.js');

const convoSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    isGroup: { type: Boolean, default: false },
    groupName: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    lastMessage: {
        text: String,
        from: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        time: Date
    }
})

const messageSchema = new mongoose.Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true},
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    text: { type: String, required: true},
    time: { type: Date, default: Date.now },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}] 
})

const Conversation = mongoose.model('Conversation', convoSchema);
const Message = mongoose.model('Message', messageSchema);

module.exports = { Conversation, Message };