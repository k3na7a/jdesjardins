import { ApiProperty } from '@nestjs/swagger';

export class BaseModel {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public created: Date;
  @ApiProperty()
  public updated: Date;
}
