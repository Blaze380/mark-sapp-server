import { ServicesOperations } from "@/enums/enums";
import { UserGuard } from "@/guards/userGuard.guard";
import { RequestInterceptor } from "@/interceptors/interceptors";
import { CreateUserDto } from "@/models/dtos/createUser.dto";
import { Dtos, UserDto } from "@/models/dtos/dtos";
import { User } from "@/models/user.entity";
import { UserService } from "@/services/user.service";
import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Logger, Param, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import * as path from 'path';
@Controller("user")
@UseInterceptors(RequestInterceptor)
export class UserController {

    private readonly log: Logger = new Logger(UserController.name);
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
                {
                    destination (req, file, callback) {
                        const imgPath: string = process.env.UPLOADED_PROFILE_PHOTO_PATH;
                        callback(null, imgPath);
                    },
                    filename (req, file, callback) {
                        const userId: string = req.query.id as string;
                        if (userId) {
                            const fileName: string = file.originalname;
                            let fileExtension: string = "";
                            for (let i: number = fileName.length - 1; i >= 0; i--) {
                                if (fileName[i] === ".") {
                                    fileExtension = fileName.substring(i);
                                    console.log(fileExtension);
                                    break;
                                }

                            }
                            const profilePhotoName: string = userId + fileExtension;
                            callback(null, profilePhotoName);
                        }
                    },
                }),
        }))
    public uploadProfilePhoto (@UploadedFile() profilePhoto: Express.Multer.File, @Query() query: any): void {
        console.log(profilePhoto);
        const userId: string = query.id as string;
        console.log(userId);
        //this.userService.updateProfilePhotoPath(profilePhoto.filename, userId);

    }



    @UseGuards(UserGuard)
    @Get('/download-profile-photo/:photoId')
    public downloadProfilePhoto (@Res() res: Response, @Param() { photoId }: { photoId: string }): void {
        try {
            const imgsPath: string = `../.${ this.configService.get<string>("UPLOADED_PROFILE_PHOTO_PATH") }/`
            const profilePhotoPath: string = path.join(__dirname, imgsPath + photoId);
            res.sendFile(profilePhotoPath);

        } catch (error) {
            this.log.error(error);
            throw new BadRequestException({ message: "Algo deu errado!" });
        }
    }

    @HttpCode(HttpStatus.OK)

    @Post("/first-step/send-phone-number")
    sendPhoneNumber (@Body() { phoneNumber }: { phoneNumber: string }): void {
        try {
            this.userService.sendPhoneNumberOTP(phoneNumber);
        } catch (error) {
            this.log.error(`Number Is probably not verified in twillio \n${ error }`);
            throw new BadRequestException({ message: "O número fornecido não está verificado no console." });
        }

    }
    @HttpCode(HttpStatus.CREATED)
    @Post("/second-step/validate-code")
    validatePhoneNumber (@Body() { phoneNumber, otpCode }: { phoneNumber: string, otpCode: string }, @Res() res: Response): void {
        try {
            this.userService.validateOptCode(phoneNumber, otpCode, res);
        } catch (error) {
            this.log.error(`Error On validating Otp code \n${ error }`)
            throw new BadRequestException({ message: "Algo Deu errado validando o código!" });
        }

    }

    //@DEPRECATED!
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    @Post("/save-user")
    addNewUser (@Body() userDto: CreateUserDto, @Req() res: Response): void {
        const user: User = Dtos.createDtoToUser(userDto);
        this.userService.saveNewUser(user, res);
    }

    //@DEPRECATED!
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    @Post("/update-user")
    updateUser (@Body() userDto: UserDto): void {
        const user: User = Dtos.userDtoToUser(userDto);
        this.userService.updateUser(user);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(UserGuard)
    @Get("/get-user-by-id/:id")
    getUserById (@Param() id: string, @Res() res: Response): void {
        this.userService.getUserById(id, res);
    }


    //@deprecated(validateServiceOperation, msg)
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
