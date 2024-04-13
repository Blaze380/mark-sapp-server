import { User } from "@/models/user.model";
import { UserService } from "@/services/user.service";
import { Body, Controller, Post, Res, } from "@nestjs/common";
import { Response } from "express";

@Controller("user")
export  class UserController {

    constructor(private readonly userService:UserService){}

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

    @Post("/save")
    addNewUser (@Body() user: User, @Res() res: Response): void{
        this.userService.saveNewUser(user,res);
    }
};
