import { pubsub } from '../../service/websocket/websocket.service'

export const types = `
`

export const subscriptions = `
    subscribeMessages: Message
`

export const resolvers = {
    subscribeMessages: {
        resolve: (payload) => payload,
        subscribe: () => pubsub.asyncIterator(['subscribeMessages'])
    }
}