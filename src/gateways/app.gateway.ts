import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class AppGateway implements OnGatewayDisconnect{

    @WebSocketServer()
    server: Server;
    handleDisconnect (client: Socket):void {
        console.log(`CLient disconnected: ${ client.id }`);
    }

    @SubscribeMessage("auth_user")
    authenticateUser (client: Socket, data: any): void{
        console.log(client, data);
    }
    @SubscribeMessage("send_receive_private_message")
    sendAndReceivePrivateMessage (client: Socket, data: any): void{
        console.log(client, data);

    }
    @SubscribeMessage("send_receive_group_message")
    sendAndReceiveGroupMessage (client: Socket, data: any): void{
        console.log(client, data);

    }
}