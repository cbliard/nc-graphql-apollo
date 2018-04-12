# Réponses :
## TP1 : Récupérer et afficher des données
### TP1.2 : Envoi et récéption de la requête Apollo
#### Etape 1 : Modification du service

```javascript
getMessages() {
    return this.apollo.query({
        query: getRequest
    })
}

const getRequest =
gql`{
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
```

#### Etape 2 : Modification du composant

```javascript
import { Component, OnInit } from '@angular/core';
import { TchatService } from './tchat.service'

@Component({
    selector: 'tchat',
    templateUrl: './tchat.html',
    styleUrls: ['./tchat.css']
})
export class TchatComponent implements OnInit {

    public messages = []

    constructor(private tchatService : TchatService) {}

    ngOnInit() {
        this.tchatService.getMessages().subscribe( ({ data : { getMessages }  } : any) => {
            this.messages = getMessages
        })
    }
}
```

## TP2 : Modifier une donnée et mettre à jour les données à afficher
#### Etape 1 : Création de la requête

Request :

```javascript
mutation saveMessage($message: MessageInput) {
  saveMessage(message: $message) {
        id,
        date,
        sender {
            pseudo,
            firstName,
            lastName
        },
        content,
        localisation,
        status
    }
}
```
 
Query param :
```javascript
{
    "message": {
        "sender": {
            "pseudo": "Toto",
            "firstName": "Jean-Michel",
            "lastName": "Graphi"
        },
        "content": "Hello world !",
        "localisation": "Nantes !",
        "status": "OK"
    }
}
```

#### Etape 2 : Modification du service
```javascript
saveMessage(message) {
    return this.apollo.mutate({
        mutation: saveRequest,
        variables: { message }
    })
}

const saveRequest =
gql`mutation saveMessage($message: MessageInput!) {
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
```

#### Etape 3 : Modification du composant
```javascript
sendMessage() {
    this.spamGuard = true
    const message = {
        sender: {
            pseudo: 'Toto',
            firstName: 'Jean-Michel',
            lastName: 'Graphi'
        },
        content: this.messageContent,
        localisation: 'Nantes',
        status: 'PENDING'
    }
    this.tchatService.saveMessage(message).subscribe(() => {
        this.spamGuard = false
        this.messageContent = ""
    })
}
```

#### Etape 4 : Affichage du nouveau message

```javascript
saveMessage(message) {
    return this.apollo.mutate({
        mutation: saveRequest,
        variables: { message }
        refetchQueries: [{
            query: getRequest
        }]
    })
}
```

#### Etape 5 : Modification du composant
```javascript
  ngOnInit() {
    this.tchatService.getMessages().valueChanges.subscribe(({ data }: any) => {
      this.messages = data.getMessages
    })
  }
```

## TP3 : Modification et utilisation du cache / store

```javascript
saveMessage(message) {
    return this.apollo.mutate({
        mutation: saveRequest,
        variables: { message },
        update: (store, {data: { saveMessage }}) => {
            const data : any = store.readQuery({ query : getRequest})
            data.getMessages.push(saveMessage)
            store.writeQuery({ query: getRequest, data})
        }
    })
}
```

## TP4 : Optimistic UI

```javascript
saveMessage(message) {
    return this.apollo.mutate({
        mutation: saveRequest,
        variables: { message },
        update: (store, {data: { saveMessage }}) => {
            const data : any = store.readQuery({ query : getRequest})
            data.getMessages.push(saveMessage)
            store.writeQuery({ query: getRequest, data})
        },
        optimisticResponse: {
            __typename: 'Mutation',
            saveMessage : {
                __typename: "Message",
                    ...message,
                    sender : {
                    __typename: "Sender",
                    ...message.sender
                },
                status: "PENDING",
                date: Date.now
            }
        }
    })
}
```

