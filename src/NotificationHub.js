class NotificationHub {
  constructor() {
    console.log("SIGNALR:" + signalR);
    this.client = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44333/notificationHub", {
        //skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => {
          return localStorage.getItem("token");
        },
        withCredentials: false,
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    this.client.serverTimeoutInMilliseconds = 1800000;
  }
  start() {
    this.client.start().then(() => {
      console.log("Connected to SignalR Hub" + this.client);
      this.client.on("SendMessageToEveryone", (name, message) => {
        console.log(`${name} ${message}`);
      });
    });
  }
}
export default new NotificationHub();
