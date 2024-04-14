import { UserGuard } from "@/guards/userGuard.guard";
import { PrivateChats, User } from "@/models/entities";
import { PrivateChatsService } from "@/services/services";
import { Body, Controller, Get, Param, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
@Controller("private-chats")
@UseGuards(UserGuard)
export class PrivateChatsController{
    constructor (private readonly privateChatsService: PrivateChatsService) { }

    @Post("/save/:userId")
    public savePrivateChat (@Param() { userId }: { userId: string },@Body() privateChat: PrivateChats):void {
        const user: User = new User();
        user.id = userId;
        this.privateChatsService.saveUserPrivateChat(user, privateChat);
    }
    @Post("/update")
    public updatePrivateChat (@Body() privateChat: PrivateChats):void {
        this.privateChatsService.updateUserPrivateChat(privateChat);
    }

    @Get("/get-all/:userId")
    public getPrivateChats (@Param() { userId }: { userId: string },@Res() res:Response): void{
        this.privateChatsService.getUserPrivateChats(userId, res);
    }
}