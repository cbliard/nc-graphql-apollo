import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/debounce'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime'
import Config from 'config'
import { addCoinCoin, isFromCanardMan} from './message.service'
import { pubsub } from '../websocket/websocket.service'

export const eventBus = new Subject()

export const init = async function() {
    eventBus
        .filter(message => isFromCanardMan(message))
        .subscribe(message => pubsub.publish('subscribeMessages', message))
    eventBus
        .filter(message => Config.enableSuperCoinFeature && !isFromCanardMan(message))
        .debounceTime(3000)
        .subscribe(() => addCoinCoin())
    await addCoinCoin()
}