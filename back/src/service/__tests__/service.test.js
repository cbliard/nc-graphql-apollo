jest.mock('../message/message.subscriber')
import { init as initMessageSubscriber} from '../message/message.subscriber'
import { initServices } from '../service'

describe('init function', () => {
    beforeAll(() => {
        initServices()
    })
    it('should call init from message subscriber service', () => {
        expect(initMessageSubscriber).toHaveBeenCalled()
    })
})