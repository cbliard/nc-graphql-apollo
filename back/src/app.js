import express from 'express'
import { createServer } from 'http'
import router from './router'
import { initWebsocket } from './websocket'
import { initServices } from './service/service'

const server = express()
const websocketServer = createServer(server)

initWebsocket(websocketServer)
initServices()
router(server)

export default websocketServer