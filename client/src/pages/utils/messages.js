import moment from 'moment';

function formatMessage(username, message) {
    return {
        id: Date.now(),
        from: username,
        text: message,
        time: moment().format('h:mm a')
    }
} 

export default formatMessage