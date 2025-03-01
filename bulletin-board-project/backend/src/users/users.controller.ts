export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    async register(userDto: UserDto) {
        return this.usersService.register(userDto);
    }

    async getAllUsers() {
        return this.usersService.findAll();
    }

    async getUserById(id: string) {
        return this.usersService.findOne(id);
    }

    async updateUser(id: string, userDto: UserDto) {
        return this.usersService.update(id, userDto);
    }

    async deleteUser(id: string) {
        return this.usersService.remove(id);
    }
}