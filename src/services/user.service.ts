import { User } from "@/models/user.entity";
import { AuthenticatedUsersRepository, UserPermissionsRepository, UserRepository } from "@/repositories/repositories";
import { ResponseMsg } from "@/types/responseMessage.type";
import { HttpStatus, Injectable, } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import * as twilio from "twilio";
@Injectable()
export class UserService {

    constructor (private readonly userRepository: UserRepository,
        private readonly authenticatedUsersRepository: AuthenticatedUsersRepository,
        private readonly userPermissionsRepository: UserPermissionsRepository,
        private readonly jwtService: JwtService) { }

    private readonly accountSid: string = process.env.TWILIO_ACCOUNT_SID;
    private readonly authToken: string = process.env.TWILIO_AUTH_TOKEN;

    public sendPhoneNumberOTP (phoneNumber: string, res: Response): void {
        const client: twilio.Twilio = twilio(this.accountSid, this.authToken);

        client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: phoneNumber, channel: 'sms' })
            .then((): void => console.log(`OTP code sent Successfully to ${ phoneNumber }!`))
            .catch((error: any): void => {
                console.log(`Number Is probably not verified in twillio \n${ error }`);
                res.status(400).json({ message: "O número fornecido não está verificado no console." })
            });
    }


    public validateOptCode (phoneNumber: string, otpCode: string, res: Response): void {
        const client: twilio.Twilio = twilio(this.accountSid, this.authToken);
        client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks
            .create({ to: phoneNumber, code: otpCode })
            .then((verification_check): void => {
                if (verification_check.valid) {
                    this.saveAuthenticatedUser(phoneNumber, res);
                } else {
                    res.status(HttpStatus.UNAUTHORIZED).json({ message: "O código fornecido está incorrecto" });
                }
            })
            .catch((error: any): void => {
                console.log(`Error On validating Otp code \n${ error }`);
                res.status(400).json({ message: "Algo deu errado." })
            });
    }
    private saveAuthenticatedUser (phoneNumber: string, res: Response): void {
        this.authenticatedUsersRepository.saveAuthenticatedUser(phoneNumber);
        res.status(HttpStatus.CREATED).json({ message: "Aprovado" });
    }
    public async saveNewUser (user: User, res: Response): Promise<void> {
        const isUserAuthenticated: boolean = await this.isThisUserAuthenticated(user, res);
        if (isUserAuthenticated) {
            const exists: boolean = await this.isThisUserIsAlreadyLoggedIn(user, res);
            if (!exists) {
                this.userRepository.saveUser(user)
                    .then(async (newUser: User): Promise<void> => {
                        this.saveUserPermissions(newUser, res);

                    });
            }

        }

    }
    private async isThisUserAuthenticated (user: User, res: Response): Promise<boolean> {
        const isUserAuthenticated: boolean = await this.authenticatedUsersRepository.isUserAuthenticated(user.phoneNumber)

        if (!isUserAuthenticated) {
            res.status(HttpStatus.UNAUTHORIZED).json("O Número de telefone não está verificado!\ncontacte:+258857483995");
            return false;
        }
        return true;

    }

    public saveUserPermissions (user: User, res: Response): void {
        let resMsg: ResponseMsg;
        this.userPermissionsRepository.saveUserPermissions(user)
            .then(async (): Promise<void> => {
                const token: string = await this.generateTokenToUser(user.id, user.userName);
                resMsg = { status: HttpStatus.CREATED, message: "User created successfully.", additionalContent: { access_token: token } };
                res.status(resMsg.status).json(resMsg);
            });
    }

    private async generateTokenToUser (userId: string, userName: string): Promise<string> {
        if (!userId && !userName) {
            return "null";
        }
        const payload = {
            sub: userId,
            username: userName,
        };
        const jwtToken: string = await this.jwtService.signAsync(payload);
        return jwtToken;
    }


    private async isThisUserIsAlreadyLoggedIn (user: User, res: Response): Promise<boolean> {
        const resMsg: ResponseMsg = { status: 401, message: "O nome de usuário já existe", additionalContent: null }
        const userExistsByUserName: boolean = await this.userRepository.existsByUserName(user.userName);
        if (userExistsByUserName) {
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

    public getUserById (userId: string, res: Response): void {
        this.userRepository.findUserById(userId)
            .then((user: User): void => {
                res.status(200).json(user);
            }).catch((error: any): void => {
                console.log(error)
                res.status(400).json("Algo deu errado!");
            })
    }

    public updateUser (user: User): void {
        this.userRepository.saveUser(user);
    }
}