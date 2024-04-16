import { ServicesOperations } from "@/enums/enums";
import { UserGuard } from "@/guards/userGuard.guard";
import { CreateUserDto } from "@/models/dtos/createUser.dto";
import { Dtos } from "@/models/dtos/dtos";
import { User } from "@/models/user.entity";
import { UserService } from "@/services/user.service";
import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import * as path from 'path';
@Controller("user")
export class UserController {

    constructor (private readonly userService: UserService, private readonly configService: ConfigService) { }

    /**
     * TODO Implement upload feature after
     * @param profilePhoto
     */
    @UseGuards(UserGuard)
    @Post('/upload-profile-photo')
    @UseInterceptors(FileInterceptor('profilePhoto',
        {
            storage: diskStorage(
                { destination: "./uploads/media/static/images", }),
        }))
    public uploadProfilePhoto (@UploadedFile() profilePhoto: Express.Multer.File): void {
        console.log(profilePhoto);

    }


    @UseGuards(UserGuard)
    @Get('/download-profile-photo/:photoId')
    public downloadProfilePhoto (@Res() res: Response, @Param() { photoId }: { photoId: string }): void {
        const imgsPath: string = `../.${ this.configService.get<string>("UPLOADED_IMAGES_PATH") }/`
        console.log(photoId)
        const profilePhotoPath: string = path.join(__dirname, imgsPath + photoId);
        res.sendFile(profilePhotoPath);
    }


    @Post("/first-step/send-phone-number")
    sendPhoneNumber (@Body() { phoneNumber }: { phoneNumber: string }, @Res() res: Response): void {
        this.userService.sendPhoneNumberOTP(phoneNumber, res);
        res.status(200).json({ message: "OTP code sent!" })

    }
    @Post("/second-step/validate-code")
    validatePhoneNumber (@Body() { phoneNumber, otpCode }: { phoneNumber: string, otpCode: string }, @Res() res: Response): void {
        this.userService.validateOptCode(phoneNumber, otpCode, res);
        res.status(200);

    }

    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    @Post("/save-user")
    addNewUser (@Body() userDto: CreateUserDto, @Req() res: Response): void {
        const user: User = Dtos.createDtoToUser(userDto);
        this.userService.saveNewUser(user, res);
    }

    @UseGuards(UserGuard)
    @Get("/get-user-by-id/:id")
    getUserById (@Param() id: string, @Res() res: Response): void {
        this.userService.getUserById(id, res);
    }


    //@deprecate(validateServiceOperation, msg)
    private validateServiceOperation (serviceOperation: ServicesOperations): void {
        switch (serviceOperation) {
            case ServicesOperations.BAD_CREDENTIALS:
                throw new BadRequestException("Os seus dados podem estar corrompido, preencha correctamente.");
                break;
            case ServicesOperations.SERVER_ERROR:
                throw new InternalServerErrorException("Algo deu errado no servidor, tente mais tarde.");
                break;
            case ServicesOperations.UNAUTHORIZED:
                throw new BadRequestException("O Número de telefone não está verificado!\ncontacte:+258857483995");
                break;
        }
    }
};
