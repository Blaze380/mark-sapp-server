import { User } from "@/models/user.entity";
import { AuthenticatedUsersRepository, UserPermissionsRepository, UserRepository } from "@/repositories/repositories";
import { ResponseMsg } from "@/types/responseMessage.type";
import { HttpStatus, Injectable, } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import * as twilio from "twilio";
import { VerificationCheckInstance } from "twilio/lib/rest/verify/v2/service/verificationCheck";
@Injectable()
export class UserService {

    constructor (private readonly userRepository: UserRepository,
        private readonly authenticatedUsersRepository: AuthenticatedUsersRepository,
        private readonly userPermissionsRepository: UserPermissionsRepository,
        private readonly jwtService: JwtService) { }

    private readonly accountSid: string = process.env.TWILIO_ACCOUNT_SID;
    private readonly authToken: string = process.env.TWILIO_AUTH_TOKEN;

    public async sendPhoneNumberOTP (phoneNumber: string): Promise<void> {
        const client: twilio.Twilio = twilio(this.accountSid, this.authToken);

        await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: phoneNumber, channel: 'sms' });
        console.log(`OTP code sent Successfully to ${ phoneNumber }!`);

    }

    public updateProfilePhotoPath (profilePhotoName: string, userId: string): void {
        this.userRepository.updateProfilePhoto(profilePhotoName, userId);
    }


    public async validateOptCode (phoneNumber: string, otpCode: string, res: Response): Promise<void> {
        const client: twilio.Twilio = twilio(this.accountSid, this.authToken);
        const verificationCheck: VerificationCheckInstance = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks.create({ to: phoneNumber, code: otpCode });

        if (verificationCheck.valid) {
            this.saveAuthenticatedUser(phoneNumber, res);
            const user: User = new User();
            user.phoneNumber = phoneNumber;
            const userId: string = await this.saveNewUser(user, res);
            res.status(HttpStatus.CREATED).json({ userId: userId });
        } else {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: "O código fornecido está incorrecto" });
        }


    }
    private saveAuthenticatedUser (phoneNumber: string, res: Response): void {
        this.authenticatedUsersRepository.saveAuthenticatedUser(phoneNumber);
        res.status(HttpStatus.CREATED).json({ message: "Aprovado" });
    }
    public async saveNewUser (user: User, res: Response): Promise<string> {
        const isUserAuthenticated: boolean = await this.isThisUserAuthenticated(user, res);
        if (isUserAuthenticated) {
            return;
        }
        user = await this.userRepository.saveUser(user);
        await this.saveUserPermissions(user, res);
        return user.id;



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