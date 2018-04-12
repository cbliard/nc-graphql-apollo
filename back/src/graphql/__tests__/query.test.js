import { merge } from 'lodash'
import { queries as messageQueries, resolvers as messageQueryResolvers } from '../../schema/message/message.query'
import { queries, resolvers } from '../query'

const queriesExpected = `
    type Query {
        ${messageQueries}
    }
`

const resolversExpected = {
    Query: merge(
        messageQueryResolvers,
    )
}

describe('query module', () => {
    it('should export queries', () => {
        expect(queries).toEqual(queriesExpected)
    })
    it('should export resolvers', () => {
        expect(resolvers).toEqual(resolversExpected)
    })
})