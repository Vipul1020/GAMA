const WebSocket = require('ws');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('WebSocket client connected');

        ws.on('close', () => {
            console.log('WebSocket client disconnected');
        });
    });

    function broadcast(data) {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }

    return { broadcast };
}

module.exports = setupWebSocketServer;
