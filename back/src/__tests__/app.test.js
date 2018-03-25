jest.mock('../router')
import router from '../router'
jest.mock('../service/service')
import { initServices } from '../service/service'
jest.mock('../websocket')
import { initWebsocket } from '../websocket'
jest.mock('http', () => {
    return { 
        createServer: jest.fn(() => 'MOCKED_WEBSOCKET_SERVER')
    }
})
import { createServer } from 'http'
jest.mock('express', () => {
    return jest.fn(() => 'MOCKED_EXPRESS')
})
import express from 'express'
import app from '../app'


describe('server', () => {
    it('should create express server', () => {
        expect(express).toHaveBeenCalled()
    })
    it('should call router right parameter', () => {
        expect(router).toHaveBeenCalledWith('MOCKED_EXPRESS')
    })
    it('should call initServices', () => {
        expect(initServices).toHaveBeenCalled()
    })
    it('should call createServer from http for websocket server', () => {
        expect(createServer).toHaveBeenCalledWith('MOCKED_EXPRESS')
    })
    it('should call initWebsocket with right parameter', () => {
        expect(initWebsocket).toHaveBeenCalledWith('MOCKED_WEBSOCKET_SERVER')
    })
    it('should return websocket server', () => {
        expect(app).toBe('MOCKED_WEBSOCKET_SERVER')
    })
})