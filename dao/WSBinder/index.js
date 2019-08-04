

class WSBinder{

    constructor(WS){
        this.WS = WS;
        this.WS.on('message', this.onMessage);
        // this.callbacks = {};
    }

    on(event, cb){
        // WSBinder.callbacks[event] = WSBinder.callbacks[event]?WSBinder.callbacks[event]:[];
        WSBinder.callbacks[event] = cb;
    }

    onMessage(message){
        message = JSON.parse(message)
        WSBinder.callbacks[message.event](message)
    }

    registerConection(WS, id){
        WSBinder.connections[id] = WS;
    }

    sendRes(id, result){
        var WS = WSBinder.connections[id];
        WS.send(JSON.stringify({'event':'completed', 'status':200, 'result': result}))
    }

}

WSBinder.connections = {};
WSBinder.callbacks = {}

module.exports = WSBinder;
