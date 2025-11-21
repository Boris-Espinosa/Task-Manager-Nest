import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  completed: boolean;
}
