import { sleep } from '../utils.service'
import { eventBus } from './message.subscriber'
import * as messageRepository from '../../repository/message/message.repository'
import Config from 'config'


export const getMessages = function() {
    return messageRepository.getMessages()
}

export const addMessage = async function(message, latency = Config.latency) {
    await sleep(latency)
    const messageResult = messageRepository.addMessage({
        ...message,
        id: messageRepository.getNextId(),
        date: Date.now(),
        status: 'OK'
    })
    eventBus.next(messageResult)
    return messageResult
}

export const addCoinCoin = async function() {
    const coinMessage = {
        sender : {
            pseudo: 'Canard Man',
            firstName: 'Frédéric',
            lastName: 'Molas',
        },
        content: 'Coin Coin',
        localisation: 'Duckpound',
    }
    return await addMessage(coinMessage, 0)
}

export const isFromCanardMan = function(message) {
    return message.sender.pseudo === 'Canard Man'
}
