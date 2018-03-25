import { types as messageQueryTypes } from '../../api/message/message.query'
import { types as messageMutationTypes } from '../../api/message/message.mutation'
import { types as messageSubscriptionsTypes } from '../../api/message/message.subscription'
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