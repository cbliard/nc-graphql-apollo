jest.mock('graphql-tools', () => {
    return {
        makeExecutableSchema: jest.fn(() => 'SCHEMA GRAPHQL')
    }
})
import { makeExecutableSchema } from 'graphql-tools'
import { types } from '../type'
import { resolvers as queryResolvers, queries } from '../query'
import { resolvers as mutationResolvers, mutations } from '../mutation'
import { resolvers as subscriptionResolvers, subscriptions} from '../subscription'
import schema from '../schema'
import { merge } from 'lodash'

const typeDefsExpected = [queries, mutations, subscriptions, types].join()

const resolversExpected = merge(queryResolvers, mutationResolvers, subscriptionResolvers)

describe('Schema', () => {
    it('should call makeExecutableSchema with right parameter', () => {
        expect(makeExecutableSchema.mock.calls[0][0]).toEqual({typeDefs: typeDefsExpected, resolvers: resolversExpected})
    })
    it('should expose schema', () => {
        expect(schema).toEqual('SCHEMA GRAPHQL')
    })
})
