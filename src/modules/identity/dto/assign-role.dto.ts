import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignRoleDto {
  @ApiProperty({ example: 'cashier' })
  @IsString()
  @IsNotEmpty()
  roleCode!: string;
}
