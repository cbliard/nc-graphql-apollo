import { makeExecutableSchema } from 'graphql-tools'
import types from './type'
import { resolvers as queryResolvers, queries } from './query'
import { resolvers as mutationResolvers, mutations } from './mutation'
import { resolvers as subscriptionResolvers, subscriptions} from './subscription'
import { merge } from 'lodash'

const typeDefs = [queries, mutations, subscriptions, types].join()

const resolvers = merge(queryResolvers, mutationResolvers, subscriptionResolvers)

export default makeExecutableSchema({
    typeDefs,
    resolvers
})