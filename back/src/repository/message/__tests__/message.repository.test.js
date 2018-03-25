import { getMessages, addMessage, resetRepository, getNextId } from '../message.repository'

beforeEach(() => {
    resetRepository()
})

describe('getMessages function', () => {
    it('should return empty array when nothing appened', () => {
        expect(getMessages()).toEqual([])
    })
})

describe('addMessage function', () => {
    it('should add message in the array', () => {
        addMessage('FAKE_MESSAGE')
        expect(getMessages()).toEqual(['FAKE_MESSAGE'])
    })
    it('should return the last message push', () => {
        expect(addMessage('FAKE_MESSAGE')).toBe('FAKE_MESSAGE')
    })
})

describe('resetRepository function', () => {
    it('should make empty message repository', () => {
        addMessage('FAKE_MESSAGE')
        resetRepository()
        expect(getMessages()).toEqual([])
    })
})

describe('getNextId function', () => {
    it('should get the next id (first time 1)', () => {
        expect(getNextId()).toBe(0)
    })
    it('should get the next id (second time 2)', () => {
        expect(getNextId()).toBe(1)
    })
    it('should get the next id (third time 3)', () => {
        expect(getNextId()).toBe(2)
    })
})