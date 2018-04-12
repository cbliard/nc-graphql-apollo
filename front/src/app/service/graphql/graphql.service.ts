import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

@Injectable()
export class GraphqlService {
  constructor(apollo: Apollo, httpLink: HttpLink, inMemoryCache: InMemoryCache) { 
    apollo.create({
      link: httpLink.create({ uri: '/api/graphql' }),
      cache: inMemoryCache
    })
  }
  
}
