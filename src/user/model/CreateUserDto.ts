import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ example: 'anas123' })
  username: string;

  @ApiProperty({ example: 'anas@example.com' })
  email: string;

  @ApiProperty({ example: 'Muhammad' })
  firstName: string;

  @ApiProperty({ example: 'Anas' })
  lastName: string;
}