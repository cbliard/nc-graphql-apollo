import { sleep } from '../utils.service'

jest.useFakeTimers()

describe('sleep function', () => {
    let result
    beforeAll(async () => {
        result = sleep(1000)
        jest.runAllTimers()
    })
    it('should call setTimeout with right parameter', () => {
        expect(setTimeout).toBeCalledWith(expect.any(Function), 1000)
    })
    it('should return a promise', () => {
        expect(result instanceof Promise).toBe(true)
    })
})