const express = require('express');

const {
    getConversationsController,
    getMessagesController,
    getOrCreateDmController,
    createGroupController,
    createMessageController
} = require('../controllers/messageController');

const router = express.Router();

router.get('/conversations/:userId', getConversationsController);
router.get('/messages/:conversationId', getMessagesController);
router.post('/conversations/dm', getOrCreateDmController);
router.post('/conversations/group', createGroupController);
router.post('/messages', createMessageController);

module.exports = router