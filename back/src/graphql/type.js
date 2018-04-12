import { types as queryTypes } from '../schema/message/message.query'
import { types as mutationTypes } from '../schema/message/message.mutation'
import { types as subscriptionTypes } from '../schema/message/message.subscription'

export const types = `
    ${queryTypes}
    ${mutationTypes}
    ${subscriptionTypes}
`

export default types