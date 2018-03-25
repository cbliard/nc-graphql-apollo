jest.mock('graphql-subscriptions', () => {
    return {
        PubSub: jest.fn(() => {
            return {mock: 'MOCKED_PUBSUB'}
        })
    }
})
import { PubSub } from 'graphql-subscriptions'
import { pubsub } from '../websocket.service'

describe('websocket.service module', () => {
    it('should create PubSub', () => {
        expect(PubSub).toHaveBeenCalled()
    })
    it('should export pubsub', () => {
        expect(pubsub).toEqual({mock: 'MOCKED_PUBSUB'})
    })
})