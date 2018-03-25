jest.mock('../../../service/message/message.service')
import { addMessage } from '../../../service/message/message.service'
import { types, mutations} from '../message.mutation'
import schema from '../../../graphql/schema'


describe('Schema of Message (Mutation)', () => {
    it('should be like snapshot (type)', () => {
        expect(types).toMatchSnapshot()
    })
    it('should be like snapshot (mutations)', () => {
        expect(mutations).toMatchSnapshot()
    })
})


describe('saveMessage function', () => {
    const resolver = schema.getMutationType().getFields().saveMessage.resolve
    let result
    beforeAll(async () => {
        addMessage.mockReturnValueOnce('RESULT_FAKE_MESSAGE')
        addMessage.mockClear()
        result = await resolver(undefined, {message: 'FAKE_MESSAGE'})
    })
    it('should call addMessage service with right parameter', () => {
        expect(addMessage).toHaveBeenCalledWith('FAKE_MESSAGE')
    })
    it('should return the result from addMessage service', () => {
        expect(result).toBe('RESULT_FAKE_MESSAGE')
    })
})