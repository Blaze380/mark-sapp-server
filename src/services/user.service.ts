import { User } from "@/models/user.model";
import { AuthUserRepository, UserRepository } from "@/repositories/repositories";
import { ResponseMsg } from "@/types/responseMessage.type";
import {   HttpStatus, Injectable, } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import  * as twilio from "twilio";
@Injectable()
export class UserService{

    constructor (private readonly userRepository: UserRepository,
        private readonly authUserRepository: AuthUserRepository,
        private readonly jwtService:JwtService) { }

    private readonly accountSid: string = process.env.TWILIO_ACCOUNT_SID;
    private readonly authToken: string = process.env.TWILIO_AUTH_TOKEN;

    public  sendPhoneNumberOTP (phoneNumber: string,res:Response) :void{
        const client:twilio.Twilio = twilio(this.accountSid, this.authToken);

        client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
        .verifications.create({to: phoneNumber, channel: 'sms'})
        .then(():void => console.log(`OTP code sent Successfully to ${phoneNumber}!`))
            .catch((error):void => {
                console.log(error);
                res.status(400).json({message:"O número fornecido não está verificado no console."})
            });
        }


    public validateOptCode(phoneNumber:string,otpCode:string,res:Response):void{
        const client: twilio.Twilio = twilio(this.accountSid, this.authToken);
        const resMsg: ResponseMsg={ status: 200,message: "Aprovado", additionalContent:null };
        client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks
        .create({to: phoneNumber, code: otpCode})
            .then((verification_check): void => {
                if (verification_check.valid) {
                    this.authUserRepository.saveAuthenticatedUser(phoneNumber);
                    resMsg.additionalContent={valid:verification_check.valid}
                    res.status(resMsg.status).json({ status: verification_check.valid,message:"Aprovado" });
                }else{
                    resMsg.additionalContent={valid:verification_check.valid}
                    resMsg.status = 400;
                    resMsg.message = "O código fornecido está incorrecto!";
                    res.status(resMsg.status).json(resMsg);
                }
            })
            .catch((error):void => {
                console.log(error);
                res.status(400).json({message:"Algo deu errado."})
            });
    }
    public saveNewUser (user: User,res:Response): void{
        let resMsg: ResponseMsg;
        this.authUserRepository.isUserAuthenticated(user.phoneNumber)
            .then(async (isUserAuthenticated: boolean): Promise<void> => {
                if (!isUserAuthenticated) {
                        // throw new UnauthorizedException("O Número de telefone não está verificado!\ncontacte:+258857483995");
                    res.status(HttpStatus.UNAUTHORIZED).json("O Número de telefone não está verificado!\ncontacte:+258857483995");
                }
                const exists: boolean = await this.validateUserBeforeSave(user, res);
                if (!exists) {
                    this.userRepository.saveUser(user)
                        .then(async (newUser: User): Promise<void> => {
                            const token: string = await this.generateTokenToUser(newUser.id, newUser.userName);
                            resMsg = { status: 201, message: "User created successfully.", additionalContent: { access_token:token } };
                            res.status(resMsg.status).json(resMsg);
                            console.log("ALGO ESTÁ ERRADO!")
                        });
                }
             });
    }

    private async generateTokenToUser (userId: string, userName: string): Promise<string>{
        if(!userId && !userName){
            //rthrow new HttpException("Algo deu errado!", HttpStatus.INTERNAL_SERVER_ERROR);
            return "null";
        }
        const payload = {
            sub: userId,
            username: userName,
        };
        const jwtToken: string = await this.jwtService.signAsync(payload);
        return jwtToken;
    }


    // public updateUser (user: User, res: Responser):  void{

    // }
    private async validateUserBeforeSave (user: User, res: Response): Promise<boolean> {
        const resMsg:ResponseMsg={status:401,message:"O nome de usuário já existe",additionalContent:null}
        const userExistsByUserName: boolean = await this.userRepository.existsByUserName(user.userName);
        if(userExistsByUserName){
            res.status(resMsg.status).json(resMsg);
            return true;
        }
        const userExistsByPhoneNumber: boolean = await this.userRepository.existsByPhoneNumber(user.phoneNumber);
        if (userExistsByPhoneNumber) {
            resMsg.message = "O Número de telefone já existe!";
            res.status(resMsg.status).json(resMsg);
            return true;
        }
        return false;
    }

    public getUserById(userId: string,res:Response):void {
        this.userRepository.findUserById(userId)
            .then((user: User): void => {
                res.status(200).json(user);
            }).catch((error: any): void => {
                console.log(error)
                res.status(400).json("Algo deu errado!");
            })
    }

    public updateUser (user:User): void{
        this.userRepository.saveUser(user);
    }
}