# -*- coding: utf-8 -*-
"""
Created on Mon Nov 15 00:49:39 2021

@author: Ege
"""

import asyncio
import logging
import websockets
from websockets import WebSocketServerProtocol
import json
from flask import Flask, render_template, request, flash
from flask_sqlalchemy import SQLAlchemy
import sqlite3


logging.basicConfig(level=logging.INFO)

class Server:
    clients = set()
    
    async def register(self, ws: WebSocketServerProtocol) -> None:
        self.clients.add(ws)
        logging.info(f'{ws.remote_address} connects. ')
        
    async def unregister(self, ws: WebSocketServerProtocol) -> None:
        self.clients.remove(ws)
        logging.info(f'{ws.remote_address} disconnects. ')
        

    async def send_to_clients(self, message: str) -> None:
        if self.clients:
            logging.info(self.clients)
            await asyncio.wait([client.send(message) for client in self.clients])
            
    async def ws_handler(self, ws: WebSocketServerProtocol, url: str) -> None:
        await self.register(ws)
        try:
            await self.distribute(ws)
        finally:
            await self.unregister(ws)
            
    async def readMessage(self, message: str) -> None:
        userData = json.loads(message)
            
    async def distribute(self, ws: WebSocketServerProtocol) -> None:
            async for message in ws:
                logging.info(message)
                logging.info(type(message))
                messages = message.split()
                await self.readMessage(message)
                await self.send_to_clients(message)
                
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/flasksql'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = 'secret string'

db = SQLAlchemy(app)

db = sqlite3.connect('TEST.db')
cursor = db.cursor()
               
server = Server()
start_server = websockets.serve(server.ws_handler, 'localhost', 8000)
loop = asyncio.get_event_loop()
loop.run_until_complete(start_server)
loop.run_forever()