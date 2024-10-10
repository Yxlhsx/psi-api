import { ApiProperty } from '@nestjs/swagger'

/**
 * 账密登陆用户DTO
 */
export class LoginUserDTO {
  @ApiProperty({ description: '用户名称' })
  userName: string

  @ApiProperty({ description: '登陆密码' })
  password: string
}
