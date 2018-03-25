jest.mock('../../../service/websocket/websocket.service', () => {
    return {
        pubsub: {
            asyncIterator: jest.fn()
        }
    }
})
import { pubsub } from '../../../service/websocket/websocket.service'
import { types, subscriptions} from '../message.subscription'
import schema from '../../../graphql/schema'


describe('Schema of Contributor (Subscription)', () => {
    it('should be like snapshot (type)', () => {
        expect(types).toMatchSnapshot()
    })
    it('should be like snapshot (subscriptions)', () => {
        expect(subscriptions).toMatchSnapshot()
    })
})

describe('subscribeMessages function', () => {
    describe('resolve property', () => {
        let result
        beforeAll(() => {
            const resolver = schema.getSubscriptionType().getFields().subscribeMessages.resolve
            result = resolver('FAKE_PAYLOAD')
        })
        it('should have a resolve which return payload', () => {
            expect(result).toBe('FAKE_PAYLOAD')
        })
    })
    describe('subscribe property', () => {
        let result
        beforeAll(() => {
            const resolver = schema.getSubscriptionType().getFields().subscribeMessages.subscribe
            pubsub.asyncIterator.mockReturnValue('FAKE_RESULT_FROM_ASYNCITERATOR')
            result = resolver()
        })
        it('should have a function which call pub.asyncIterator with contributor event types as parameter', () => {
            expect(pubsub.asyncIterator).toHaveBeenCalledWith(['subscribeMessages'])
        })
        it('should return result from asyncIterator', () => {
            expect(result).toBe('FAKE_RESULT_FROM_ASYNCITERATOR')
        })
    })
})