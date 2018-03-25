import { init as initMessageSubscriber } from './message/message.subscriber'

export const initServices = async function() {
    await initMessageSubscriber()
}