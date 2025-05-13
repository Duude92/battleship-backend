interface IRoutedCommand {
    route: string;
    command: (payload: any) => Promise<any>;
}
