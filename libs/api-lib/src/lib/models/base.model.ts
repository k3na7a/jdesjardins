import { ApiProperty } from '@nestjs/swagger';

export class BaseModel {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly created: Date;
  @ApiProperty()
  public readonly updated: Date;
}
