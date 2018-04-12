import { merge } from 'lodash'
import { mutations as messageMutations, resolvers as messageMutationResolvers } from '../../schema/message/message.mutation'
import { mutations, resolvers } from '../mutation'

const mutationExpected = `
    type Mutation {
        ${messageMutations}
    }
`

const resolversExpected = {
    Mutation: merge(
        messageMutationResolvers,
    )
}

describe('mutation module', () => {
    it('should export mutations', () => {
        expect(mutations).toEqual(mutationExpected)
    })
    it('should export resolvers', () => {
        expect(resolvers).toEqual(resolversExpected)
    })
})