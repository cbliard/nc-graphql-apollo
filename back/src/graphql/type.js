import { types as queryTypes } from '../api/message/message.query'
import { types as mutationTypes } from '../api/message/message.mutation'
import { types as subscriptionTypes } from '../api/message/message.subscription'

export const types = `
    ${queryTypes}
    ${mutationTypes}
    ${subscriptionTypes}
`

export default types