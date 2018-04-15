import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HttpLinkModule } from 'apollo-angular-link-http'
import { ApolloModule } from 'apollo-angular'
import { GraphqlModule } from './graphql'
import { ContentModule } from './content'

import { InMemoryCache } from 'apollo-cache-inmemory'

import { AppComponent } from './app.component'

import { TchatService } from './service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GraphqlModule,
    ContentModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    TchatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
