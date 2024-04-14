import { UserGuard } from "@/guards/userGuard.guard";
import { User } from "@/models/user.model";
import { UserService } from "@/services/user.service";
import {  Body, Controller, Get, Param, Post, Res,  UploadedFile, UseGuards, UseInterceptors, } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import * as path from 'path';
@Controller("user")
export  class UserController {

    constructor(private readonly userService:UserService,private readonly configService:ConfigService){}

    /**
     * TODO Implement upload feature after
     * @param profilePhoto
     */
    @UseGuards(UserGuard)
    @Post('/upload-profile-photo')
    @UseInterceptors(FileInterceptor('profilePhoto',
        {
            storage: diskStorage(
                {destination:"./uploads/media/static/images",}),}))
    public uploadProfilePhoto (@UploadedFile() profilePhoto: Express.Multer.File): void {
        console.log(profilePhoto);

    }


    @UseGuards(UserGuard)
    @Get('/download-profile-photo/:photoId')
    public downloadProfilePhoto (@Res() res: Response, @Param() {photoId}: {photoId:string}): void {
         const imgsPath:string = `../.${this.configService.get<string>("UPLOADED_IMAGES_PATH")}/`
         console.log(photoId)
         const profilePhotoPath:string = path.join(__dirname, imgsPath + photoId);
        res.sendFile(profilePhotoPath);
    }


    @Post("/first-step/send-phone-number")
    sendPhoneNumber (@Body() {phoneNumber}:{phoneNumber:string}, @Res() res: Response): void{
        this.userService.sendPhoneNumberOTP(phoneNumber,res);
        res.status(200).json({message:"OTP code sent!"})

    }
    @Post("/second-step/validate-code")
    validatePhoneNumber (@Body(){phoneNumber,otpCode}:{phoneNumber:string,otpCode:string}, @Res() res: Response): void{
        this.userService.validateOptCode(phoneNumber, otpCode,res);
        res.status(200);

    }

    @Post("/save-user")
    addNewUser (@Body() user: User, @Res() res: Response): void{
        this.userService.saveNewUser(user,res);
    }

    @UseGuards(UserGuard)
    @Get("/get-user-by-id/:id")
    getUserById (@Param() id:string, @Res() res: Response): void{
        this.userService.getUserById(id, res);
    }
};
