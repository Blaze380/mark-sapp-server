import { MessageStatus } from "@/enums/MessageStatus.emun";
import { UserGuard } from "@/guards/userGuard.guard";
import { PrivateMessage } from "@/models/entities";
import { PrivateMessageService } from "@/services/services";
import { Body, Controller, HttpCode, Param, Post, UseGuards } from "@nestjs/common";

@Controller("messages")
@UseGuards(UserGuard)
export class privateMessageController{
    constructor (private readonly privateMessageService: PrivateMessageService) { }

    @HttpCode(201)
    @Post("/save/:privateChatId")
    public savePrivateMessage (@Param() { privateChatId }: { privateChatId: string }, @Body() privateMessage: PrivateMessage): void{
        this.privateMessageService.savePrivateMessage(privateChatId, privateMessage);
    }
    @HttpCode(200)
    @Post("/update")
    public updatePrivateMessage ( @Body() privateMessage: PrivateMessage): void{
        this.privateMessageService.updatePrivateMessage(privateMessage);
    }
    @HttpCode(200)
    @Post("/update-message-stauts")
    public updateMessageStatus ( @Body() {messageId,messageStatus}:{messageId:string,messageStatus:MessageStatus}): void{
        this.privateMessageService.updateMessageStatus(messageId, messageStatus);
    }
}