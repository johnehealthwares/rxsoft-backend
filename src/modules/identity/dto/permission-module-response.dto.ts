import { ApiProperty } from '@nestjs/swagger';

class ActionDto {
  @ApiProperty() name!: string;
  @ApiProperty() label!: string;
}

class FeatureDto {
  @ApiProperty() resource!: string;
  @ApiProperty() label!: string;
  @ApiProperty({ type: [ActionDto] }) actions!: ActionDto[];
}

export class PermissionModuleResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ type: [FeatureDto] }) features!: FeatureDto[];
}
