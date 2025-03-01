import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: UserEntity[] = [];

    create(userDto: UserDto): UserEntity {
        const user = new UserEntity();
        user.id = this.users.length + 1; // Simple ID generation
        user.name = userDto.name;
        user.username = userDto.username;
        user.password = userDto.password;
        user.email = userDto.email;
        this.users.push(user);
        return user;
    }

    findAll(): UserEntity[] {
        return this.users;
    }

    findOne(id: number): UserEntity | undefined {
        return this.users.find(user => user.id === id);
    }

    update(id: number, userDto: UserDto): UserEntity | undefined {
        const user = this.findOne(id);
        if (user) {
            user.name = userDto.name;
            user.email = userDto.email;
            user.username = userDto.username;
            user.password = userDto.password;
        }
        return user;
    }

    remove(id: number): void {
        this.users = this.users.filter(user => user.id !== id);
    }

    async findByUsername(username: string): Promise<UserEntity | undefined> {
        return this.users.find(user => user.username === username);
    }
}