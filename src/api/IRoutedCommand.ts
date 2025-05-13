export interface IRoutedCommand {
    route: string;
    command: (payload: any, socket: WebSocket) => Promise<any>;
}
