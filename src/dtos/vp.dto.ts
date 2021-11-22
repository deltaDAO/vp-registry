import { IsString, IsUrl } from 'class-validator'

export class CreateVpDto {
  @IsString()
  public signature: string

  @IsString()
  public hashedMessage: string

  @IsUrl()
  public fileUrl: string
}
