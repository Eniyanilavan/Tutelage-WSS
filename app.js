const WebSocket = require('ws');
const express = require('express');
const WSBinder = require('./dao/WSBinder');
const bodyParser = require('body-parser');

const app = express();
var wsBinder;

function WSSInit(){
    const WSS = new WebSocket.Server({port:8080})

    app.use(bodyParser.json());
    app.post('/',(req, res)=>{
        var id = req.body.id;
        var result = req.body.result
        console.log('comp',id);
        wsBinder.sendRes(id, result)
        res.send(200)
    })

    WSS.on('connection', (WS, req)=>{
        id = req.url.split('/')[1]
        wsBinder = new WSBinder(WS);
        wsBinder.on('register', (message)=>{
            WSBinder.connections[message.id] = WS;
        })
        WS.send(JSON.stringify({event:'opened'}))
    })

    app.listen(4040, ()=>{console.log('listing')})
}

WSSInit()

module.exports = WSSInit;
