import { User } from '../user.entity';

import { CreateUserDto } from '@/models/dtos/createUser.dto';
import { UserDto } from '@/models/dtos/user.dto';
export { CreateUserDto, UserDto };
//export {} from '@/models/dto/'



export class Dtos {

    public static createDtoToUser (createUserDto: CreateUserDto): User {
        const user: User = new User();
        user.userName = createUserDto.userName;
        user.phoneNumber = createUserDto.phoneNumber;
        user.profilePhoto = createUserDto.profilePhoto;
        user.biography = createUserDto.biography;
        user.userPermissions = createUserDto.userPermissions;
        return user;
    }
    public static userDtoToUser (userDto: UserDto): User {
        const user: User = new User();
        user.userName = userDto.userName;
        user.phoneNumber = userDto.phoneNumber;
        user.profilePhoto = userDto.profilePhoto;
        user.biography = userDto.biography;
        user.userPermissions = userDto.userPermissions;
        return user;
    }
    public static userParseUserDto (user: User): UserDto {
        const userDto: UserDto = new UserDto();
        userDto.userName = user.userName;
        userDto.phoneNumber = user.phoneNumber;
        userDto.profilePhoto = user.profilePhoto;
        userDto.biography = user.biography;
        userDto.userPermissions = user.userPermissions;
        return userDto;
    }
}