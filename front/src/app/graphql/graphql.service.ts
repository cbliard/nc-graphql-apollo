import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { environment } from '../../environments/environment'
import { OperationDefinitionNode } from 'graphql';

@Injectable()
export class GraphqlService {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    inMemoryCache: InMemoryCache,
  ) {
    // Create an http link:
    const http = httpLink.create({
      uri: 'api/graphql',
    })

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: environment.webSocket
    })

    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = (getMainDefinition(query) as OperationDefinitionNode)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      ws,
      http,
    )

    apollo.create({
      link: link,
      cache: new InMemoryCache(),
    })
  }
}
