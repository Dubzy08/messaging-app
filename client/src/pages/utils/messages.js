
function formatMessage(conversationId, from, text) {
    return {
        conversationId: conversationId,
        from: from,
        text: text,
        time: Date()
    }
} 

export default formatMessage