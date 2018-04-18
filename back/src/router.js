import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './graphql/schema'
import Config from 'config'

const { server: { port: serverPort } } = Config
const baseUrl = '/api'
const graphqlUrl = '/graphql'

export const subscriptionsEndPoint = 'subscriptions'

export const initRouter = function(app) {
  const router = express
    .Router()
    .use(graphqlUrl, bodyParser.json(), graphqlExpress({ schema }))
    .use(
      '/graphiql',
      graphiqlExpress({
        endpointURL: baseUrl + graphqlUrl,
        subscriptionsEndpoint: `ws://localhost:${serverPort}/${subscriptionsEndPoint}`,
      }),
    )
  app.use(baseUrl, router)
}

export default initRouter
