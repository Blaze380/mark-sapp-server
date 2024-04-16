import { IsNotEmpty, IsNotEmptyObject, IsPhoneNumber, IsUUID, Length, } from "class-validator";
import { UserPermissions } from "@/models/entities";


export class UserDto {

    @IsUUID(1, { message: "O ID é inválido!", always: true })
    id: string;

    @IsNotEmpty({ message: "Você deve fornece nome de usuário!", always: true })
    @Length(2, 200, { message: "O nome de usuário deve ter pelo menos 3 caracteres, EX:Ana", always: true })
    userName: string;

    @IsNotEmpty({ message: "Você deve fornece número de celular verificado!", always: true })
    @IsPhoneNumber("MZ", { message: "A aplicação está somente disponível em Moçambique! Tente outro número", always: true })
    phoneNumber: string;

    @IsNotEmpty({ message: "Você deve possuir foto de perfil padrão ou personalizada!", always: true })
    profilePhoto: string;
    @IsNotEmpty({ message: "Você deve possuir a biografia padrão ou personalizada!", always: true })
    biography: string;

    @IsNotEmptyObject({ nullable: false }, { message: "As permissões não devem ser nulas!", always: true })
    userPermissions: UserPermissions;
}


