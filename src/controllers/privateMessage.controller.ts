import { MessageStatus } from "@/enums/MessageStatus.enum";
import { UserGuard } from "@/guards/userGuard.guard";
import { PrivateMessages } from "@/models/entities";
import { PrivateMessageService } from "@/services/services";
import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";

@Controller("messages")
@UseGuards(UserGuard)
export class privateMessageController {
    constructor (private readonly privateMessageService: PrivateMessageService) { }

    @HttpCode(201)
    @Post("/save/:privateChatId")
    public savePrivateMessage (@Body() privateMessage: PrivateMessages): void {
        this.privateMessageService.savePrivateMessage(privateMessage);
    }
    @HttpCode(200)
    @Post("/update")
    public updatePrivateMessage (@Body() privateMessage: PrivateMessages): void {
        this.privateMessageService.updatePrivateMessage(privateMessage);
    }
    @HttpCode(200)
    @Post("/update-message-stauts")
    public updateMessageStatus (@Body() { messageId, messageStatus }: { messageId: string, messageStatus: MessageStatus }): void {
        this.privateMessageService.updateMessageStatus(messageId, messageStatus);
    }
}