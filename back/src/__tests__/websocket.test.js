import { execute, subscribe } from 'graphql'
jest.mock('../router')
import { subscriptionsEndPoint } from '../router'
jest.mock('subscriptions-transport-ws')
import { SubscriptionServer } from 'subscriptions-transport-ws'
jest.mock('../graphql/schema', () => 'MOCKED_SCHEMA')
import schema from '../graphql/schema'
import { initWebsocket } from '../websocket'

const mockedServer = 'MOCKED_SERVER'

describe('initWebsocket function', () => {
    beforeAll(() => {
        initWebsocket(mockedServer)
    })
    it('should create SubscriptionServer with right parameters', () => {
        expect(SubscriptionServer).toHaveBeenCalledWith({
            execute,
            subscribe,
            schema: 'MOCKED_SCHEMA'
        }, {
            server: mockedServer,
            path: `/${subscriptionsEndPoint}`
        })
    })
})