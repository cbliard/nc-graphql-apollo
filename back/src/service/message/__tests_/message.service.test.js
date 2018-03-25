jest.mock('../../../repository/message/message.repository')
import * as messageRepository from '../../../repository/message/message.repository'
jest.mock('../../utils.service')
import { sleep } from '../../utils.service'
jest.mock('../message.subscriber')
import { eventBus } from '../message.subscriber'
import * as messageService from '../message.service'
import Config from 'config'

const now = Date.now()
Date.now = jest.fn().mockReturnValue(now)

describe('getMessages function', () => {
    let result
    beforeAll(() => {
        messageRepository.getMessages.mockImplementationOnce(() => 'FAKE_RESULT')
        result = messageService.getMessages()
    })
    it('should call getMessages from repository', () => {
        expect(messageRepository.getMessages).toHaveBeenCalled()
    })
    it('should return result from repository', () => {
        expect(result).toBe('FAKE_RESULT')
    })
})

const message = {
    sender : {
        pseudo: 'tbetous',
        firstName: 'Thomas',
        lastName: 'Betous',
    },
    content: 'I am Thomas Betous',
    localisation: 'Nantes',
}

describe('addMessage function', () => {
    let result

    describe('when latency parameter is given', () => {
        beforeAll(async () => {
            messageRepository.getNextId.mockImplementationOnce(() => 12)
            messageRepository.addMessage.mockImplementationOnce(() => 'FAKE_RESULT')
            result = await messageService.addMessage(message, 666)
        })
        it('should call getNextId from repository', () => {
            expect(messageRepository.getNextId).toBeCalled()
        })
        it('should call addMessage from repository with right parameters', () => {
            expect(messageRepository.addMessage).toBeCalledWith({
                ...message,
                id: 12,
                date: now,
                status: 'OK'
            })
        })
        it('should return result from repository', () => {
            expect(result).toBe('FAKE_RESULT')
        })
        it('should sleep the number of ms put in second parameter', () => {
            expect(sleep).toHaveBeenCalledWith(666)
        })
        it('should call next on eventbus with the message from repository', () => {
            expect(eventBus.next).toHaveBeenCalledWith('FAKE_RESULT')
        })
    })

    describe('when latency parameter is not given', () => {
        beforeAll(async () => {
            messageRepository.getNextId.mockImplementationOnce(() => 12)
            messageRepository.addMessage.mockImplementationOnce(() => Promise.resolve('FAKE_RESULT'))
            result = await messageService.addMessage(message)
        })
        it('should call sleep with config latency', () => {
            expect(sleep).toHaveBeenCalledWith(Config.latency)
        })
    })
})

const coinMessage = {
    sender : {
        pseudo: 'Canard Man',
        firstName: 'Frédéric',
        lastName: 'Molas',
    },
    content: 'Coin Coin',
    localisation: 'Duckpound'
}

describe('addCoinCoin function', () => {
    let result
    beforeAll(async () => {
        messageRepository.getNextId.mockImplementationOnce(() => 12)
        messageRepository.addMessage.mockImplementationOnce(() => 'FAKE_RESULT')
        result = await messageService.addCoinCoin(message)
    })
    it('should call getNextId from repository', () => {
        expect(messageRepository.getNextId).toBeCalled()
    })
    it('should call addMessage from repository with right parameters', () => {
        expect(messageRepository.addMessage).toBeCalledWith({
            ...coinMessage,
            id: 12,
            date: now,
            status: 'OK'
        })
    })
    it('should return result from repository', () => {
        expect(result).toBe('FAKE_RESULT')
    })
    it('should not have latency', () => {
        expect(sleep).toHaveBeenCalledWith(0)
    })
    it('should call next on eventbus with the message from repository', () => {
        expect(eventBus.next).toHaveBeenCalledWith('FAKE_RESULT')
    })
})

describe('isFromCanardMan function', () => {
    it('should return true if a message from canard man', () => {
        expect(messageService.isFromCanardMan(coinMessage)).toBe(true)
    })
    it('shoud return false if a message is not from canard man', () => {
        expect(messageService.isFromCanardMan(message)).toBe(false)
    })
})