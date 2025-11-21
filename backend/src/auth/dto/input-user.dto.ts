import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserInputDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
