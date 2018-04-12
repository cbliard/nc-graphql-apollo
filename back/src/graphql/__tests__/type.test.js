import { types as messageQueryTypes } from '../../schema/message/message.query'
import { types as messageMutationTypes } from '../../schema/message/message.mutation'
import { types as messageSubscriptionsTypes } from '../../schema/message/message.subscription'
import types from '../type'

const typesExpected = `
    ${messageQueryTypes}
    ${messageMutationTypes}
    ${messageSubscriptionsTypes}
`

describe('type module', () => {
    it('should default expose graphql types that contain message query types', () => {
        expect(types).toContain(messageQueryTypes)
    })
    it('should default expose graphql types that contain message mutation types', () => {
        expect(types).toContain(messageMutationTypes)
    })
    it('should default expose graphql types that contain message subscription types', () => {
        expect(types).toContain(messageSubscriptionsTypes)
    })
})