import { User } from "@/models/user.model";
import { AuthUserRepository, UserRepository } from "@/repositories/repositories";
import { ResponseMsg } from "@/types/responseMessage.type";
import {  Injectable,  } from "@nestjs/common";
import { Response } from "express";
import  * as twilio from "twilio";
@Injectable()
export class UserService{

    constructor (private readonly userRepository:UserRepository,private readonly authUserRepository:AuthUserRepository) {}

    private readonly accountSid: string = process.env.TWILIO_ACCOUNT_SID;
    private readonly authToken: string = process.env.TWILIO_AUTH_TOKEN;
    private readonly responseMsg: ResponseMsg;

    public  sendPhoneNumberOTP (phoneNumber: string,res:Response) :void{
        const client:twilio.Twilio = twilio(this.accountSid, this.authToken);

        client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
        .verifications
        .create({to: phoneNumber, channel: 'sms'})
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
            .then((isUserAuthenticated: boolean): void => {
                if (!isUserAuthenticated) {
                    this.validateUserBeforeSave(user, res).then((exists:boolean): void => {
                        if (!exists) {
                            this.userRepository.saveUser(user)
                            .then((newUser: User): void => {
                                resMsg= { status: 201,message: "User created successfully", additionalContent:{user:newUser} };
                                 res.status(resMsg.status).json(resMsg);
                        });
                        }
                    })
                } else {
                    resMsg ={status:401,message:"O Número de telefone não está verificado!",additionalContent:null}
                    res.status(401).json(resMsg);
                }
             });
    }

    // public updateUser (user: User, res: Responser): void{

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

    public getUserById (userId: string,res:Response):void {
        this.userRepository.findUserById(userId)
            .then((user: User): void => {
                res.status(200).json(user);
            });
    }

}