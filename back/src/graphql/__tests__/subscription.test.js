import { merge } from 'lodash'
import { subscriptions as messageSubscriptions, resolvers as messageSubscriptionResolvers } from '../../schema/message/message.subscription'
import { subscriptions, resolvers } from '../subscription'

const subscriptionsExpected = `
    type Subscription {
        ${messageSubscriptions}
    }
`

const resolversExpected = {
    Subscription: merge(
        messageSubscriptionResolvers
    )
}

describe('subscription module', () => {
    it('should export queries', () => {
        expect(subscriptions).toEqual(subscriptionsExpected)
    })
    it('should export resolvers', () => {
        expect(resolvers).toEqual(resolversExpected)
    })
})