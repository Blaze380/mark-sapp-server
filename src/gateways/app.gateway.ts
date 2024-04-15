import { UsersLogged } from "@/models/entities";
import { UsersLoggedService } from "@/services/services";
import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class AppGateway implements OnGatewayDisconnect{

    constructor(private readonly usersLoggedService:UsersLoggedService) {}

    @WebSocketServer()
    server: Server;


    handleDisconnect (client: Socket): void {
        const user: UsersLogged = new UsersLogged();
        user.userSessionId = client.id;
        this.usersLoggedService.logoutUserAndSetOffline(user);
        console.log(`CLient disconnected: ${ client.id }`);
    }

    @SubscribeMessage("login_user")
    authenticateUser (client: Socket, { userId }: { userId: string }): void{
        const user: UsersLogged = {
            userId: userId,
            userSessionId:client.id,
        }
        this.usersLoggedService.loginUserAndSetOnline(user);


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