import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HttpLinkModule } from 'apollo-angular-link-http'
import { ApolloModule } from 'apollo-angular'

import { InMemoryCache } from 'apollo-cache-inmemory'

import { GraphqlService } from './service/graphql/graphql.service'

import { AppComponent } from './app.component'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle as faRegularCheckCircle} from '@fortawesome/free-regular-svg-icons'
import { faTerminal, faQuestionCircle, faCheckCircle as faSolidCheckCircle} from '@fortawesome/free-solid-svg-icons'

library.add(faTerminal, faQuestionCircle, faRegularCheckCircle, faSolidCheckCircle)


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: InMemoryCache, useValue: new InMemoryCache() },
    GraphqlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    private graphqlService : GraphqlService
  ) {}
}
