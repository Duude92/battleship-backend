import * as ws from "ws";

export const startServer = (port: number) => {
    const srv = new ws.Server({port: port});
    srv.on('connection', (socket) => {
        console.log(`New connection: ${socket.url}`);
    })
}