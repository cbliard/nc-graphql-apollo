import Config from 'config'
jest.mock('../app')
import app from '../app'
import server from '../server'

describe('server', () => {
    it('should call app listen function with right parameters', () => {
        expect(app.listen).toHaveBeenCalledWith(Config.server.port, expect.any(Function))
    })
})