let id = 0
let messages = []

export const getMessages = function() {
    return messages
}

export const addMessage = function(message) {
    messages.push(message)
    return messages[messages.length - 1]
}

export const resetRepository = function() {
    messages = []
}

export const getNextId = function() {
    return id++
}