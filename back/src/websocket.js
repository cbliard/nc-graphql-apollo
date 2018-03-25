import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { subscriptionsEndPoint } from './router'
import schema from './graphql/schema'

export const initWebsocket = function(websockerServer) {
    new SubscriptionServer({
        execute,
        subscribe,
        schema
    }, {
        server: websockerServer,
        path: `/${subscriptionsEndPoint}`
    })    
}