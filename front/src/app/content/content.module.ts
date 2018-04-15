import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'

import { TchatComponent } from './tchat'
import { MessageComponent } from './message'

import { DatePipe } from '@angular/common'

import { InMemoryCache } from 'apollo-cache-inmemory'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle as faRegularCheckCircle} from '@fortawesome/free-regular-svg-icons'
import { faTerminal, faQuestionCircle, faPaperPlane, faCircleNotch, faCheckCircle as faSolidCheckCircle} from '@fortawesome/free-solid-svg-icons'
library.add(faTerminal, faQuestionCircle, faRegularCheckCircle, faSolidCheckCircle, faPaperPlane, faCircleNotch)

@NgModule({
    imports: [
        FontAwesomeModule,
        BrowserModule,
        FormsModule
    ],
    declarations: [
        TchatComponent,
        MessageComponent
    ],
    exports: [
        TchatComponent,
        DatePipe
    ]
})
export class ContentModule { }
