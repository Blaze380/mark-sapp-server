import { UsersOnline } from "@/models/entities";
import { UsersOnlineService } from "@/services/services";
import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class AppGateway implements OnGatewayDisconnect {

    constructor (private readonly usersOnlineService: UsersOnlineService) { }

    @WebSocketServer()
    server: Server;


    handleDisconnect (client: Socket): void {
        const user: UsersOnline = new UsersOnline();
        user.userSessionId = client.id;
        this.usersOnlineService.logoutUserAndSetOffline(user);
        console.log(`CLient disconnected: ${ client.id }`);
    }

    @SubscribeMessage("login_user")
    authenticateUser (client: Socket, { userId }: { userId: string }): void {
        const user: UsersOnline = {
            isOnline: true,
            userId: userId,
            userSessionId: client.id,
        }
        this.usersOnlineService.loginUserAndSetOnline(user);
    }


    @SubscribeMessage("send_receive_private_message")
    sendAndReceivePrivateMessage (client: Socket, data: any): void {
        console.log(client, data);

    }
    @SubscribeMessage("send_receive_group_message")
    sendAndReceiveGroupMessage (client: Socket, data: any): void {
        console.log(client, data);

    }
}