import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { ApolloModule } from 'apollo-angular'
import { HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { GraphqlService } from './graphql.service'

@NgModule({
  imports: [
    ApolloModule,
    HttpLinkModule,
    HttpClientModule
  ],
  providers: [
    { provide: InMemoryCache, useValue: new InMemoryCache() },
    GraphqlService,
  ]
})
export class GraphqlModule {
  constructor(
    private graphqlService: GraphqlService
  ) { }
}
