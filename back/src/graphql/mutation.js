import { merge } from 'lodash'
import { mutations as messageMutations, resolvers as messageResolvers } from '../schema/message/message.mutation'

export const mutations = `
    type Mutation {
        ${messageMutations}
    }
`
export const resolvers = {
    Mutation: merge(
        messageResolvers,
    )
}