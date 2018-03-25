import { addMessage } from '../../service/message/message.service'

const MessageInput = `
    input MessageInput {
        content: String!
        localisation: String!
        status: String!
        sender: SenderInput!
    }
`

const SenderInput = `
    input SenderInput {
        pseudo: String!
        firstName: String!
        lastName: String!
    }
`

export const mutations = `
    saveMessage(message: MessageInput): Message
`

export const types = `
    ${MessageInput}
    ${SenderInput}
`

export const resolvers = {
    saveMessage: (_, {message}) => {
        return addMessage(message)
    }
}