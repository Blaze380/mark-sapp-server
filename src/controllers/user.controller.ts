import { Body, Controller, Post, Res, } from "@nestjs/common";
import { Response } from "express";

@Controller()
export default class UserController {


    @Post("/first-step/send-phone-number")
    sendPhoneNumber (@Body()data:any, @Res() res: Response): void{
        res.json();
        data.s();

    }
    @Post("/second-step/validate-code")
    validatePhoneNumber (@Body()data:any, @Res() res: Response): void{
        res.json();
        data.s();

    }
};
