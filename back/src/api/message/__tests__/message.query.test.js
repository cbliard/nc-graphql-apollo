jest.mock('../../../service/message/message.service')
import { getMessages } from '../../../service/message/message.service'
import { types, queries } from '../message.query'
import schema from '../../../graphql/schema'


describe('Schema of Message (Query)', () => {
    it('should be like snapshot (type)', () => {
        expect(types).toMatchSnapshot()
    })
    it('should be like snapshot (queries)', () => {
        expect(queries).toMatchSnapshot()
    })
})

describe('getMessages function', () => {
    const resolver = schema.getQueryType().getFields().getMessages.resolve
    let result
    beforeAll(async () => {
        getMessages.mockReturnValueOnce('RESULT_FAKE_MESSAGES')
        getMessages.mockClear()
        result = await resolver()
    })
    it('should call addMessage service with right parameter', () => {
        expect(getMessages).toHaveBeenCalled()
    })
    it('should return the result from getMessages service', () => {
        expect(result).toBe('RESULT_FAKE_MESSAGES')
    })
})