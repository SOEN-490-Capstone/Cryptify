import { Injectable, Logger } from '@nestjs/common';
import {
    InjectWebSocketProvider,
    WebSocketClient,
    OnOpen,
    OnMessage, EventListener, OnError,
} from 'nestjs-websocket';

@Injectable()
export class BlockchainWebsocketService {
    constructor(
        @InjectWebSocketProvider()
        private readonly ws: WebSocketClient,
    ) {}

    @OnOpen()
    open() {
        console.log('The connection is established.');
        this.ws.send(JSON.stringify({ op: "ping" }));
    }

    @OnMessage()
    message(data: WebSocketClient.Data) {
        console.log("get message")
        console.log(JSON.parse(data.toString()));
    }
}
