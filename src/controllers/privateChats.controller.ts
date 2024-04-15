import { UserGuard } from "@/guards/userGuard.guard";
import { PrivateChats,  } from "@/models/entities";
import { PrivateChatsService } from "@/services/services";
import { Body, Controller, Get, Param, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
@Controller("private-chats")
@UseGuards(UserGuard)
export class PrivateChatsController{
    constructor (private readonly privateChatsService: PrivateChatsService) { }

    @Post("/save/")
    public savePrivateChat (@Body() privateChat: PrivateChats):void {
        this.privateChatsService.saveUserPrivateChat(privateChat);
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