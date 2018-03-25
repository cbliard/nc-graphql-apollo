import { getMessages } from '../../service/message/message.service'

const MessageType = `
    type Message {
        id: ID!
        date: String!
        sender: Sender!
        content: String!
        localisation: String!
        status: String!
    }
`

const SenderType = `
    type Sender {
        pseudo: String!
        firstName: String!
        lastName: String!
    }
`

export const queries = `
    getMessages : [Message!]!
`

export const types = `
    ${MessageType}
    ${SenderType}
`

export const resolvers = {
    getMessages: () => {
        return getMessages()
    }
}