import { merge } from 'lodash'
import { queries as messageQueries, resolvers as messageResolvers } from '../api/message/message.query'

export const queries = `
    type Query {
        ${messageQueries}
    }
`
export const resolvers = {
    Query: merge(
        messageResolvers,
    )
}