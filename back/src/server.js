import Config from 'config'
import app from './app'

const { server: {port: serverPort}} = Config

app.listen(serverPort, () => { 
    console.log(`Server listening on port ${serverPort}`)
})
