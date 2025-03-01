export class UserDto {
  id: number = 0;
  username: string = '';
  password: string = '';
  email: string = '';
  name: string = '';
  
  get userId(): number {
    return this.id;
  }
}