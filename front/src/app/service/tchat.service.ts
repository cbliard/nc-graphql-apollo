import { Injectable } from '@angular/core'
import { Apollo, QueryRef } from 'apollo-angular'
import gql from 'graphql-tag'

@Injectable()
export class TchatService {

    private messageQuery: QueryRef<any>

    constructor(public apollo: Apollo) {
        this.messageQuery = this.apollo.watchQuery({
            query: GET_REQUEST
        })
        this.subscribeMessages()
    }

    getMessages() {
        return this.messageQuery
    }

    saveMessage(message) {
        return this.apollo.mutate({
            mutation: SAVE_REQUEST,
            variables: { message },
            update: (store, { data: { saveMessage } }) => {
                const data: any = store.readQuery({ query: GET_REQUEST })
                data.getMessages.push(saveMessage)
                store.writeQuery({ query: GET_REQUEST, data })
            },
            optimisticResponse: {
                __typename: 'Mutation',
                saveMessage: {
                    __typename: "Message",
                    ...message,
                    sender: {
                        __typename: "Sender",
                        ...message.sender
                    },
                    status: "PENDING",
                    date: Date.now()
                }
            }
        })
    }

    subscribeMessages() {
        this.messageQuery.subscribeToMore({
            document: SUBSCRIBE_MESSAGES,
            updateQuery: (prev: any, { subscriptionData }) => {
                let messages = prev.getMessages.slice(0)
                messages.push(subscriptionData.data.subscribeMessages)
                return {
                    getMessages: messages
                }
            }
        })
    }
}

const GET_REQUEST = gql`
{
    getMessages {
        sender {
            pseudo
            firstName
            lastName
        }
        content
        localisation
        date
        status
    }
}`

const SAVE_REQUEST = gql`
mutation saveMessage($message: MessageInput!) {
    saveMessage(message: $message) {
        date
        sender {
            pseudo
            firstName
            lastName
        }
        content
        localisation
        status
    }
}`

const SUBSCRIBE_MESSAGES = gql`
subscription {
  subscribeMessages {
    sender {
        pseudo
        firstName
        lastName
    }
    content
    localisation
    date
    status
  }
}
`