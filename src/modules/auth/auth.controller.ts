import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { LoginUserDTO } from './auth.dto'

@ApiTags('账号授权')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: '账密登录' })
  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO): Result {
    const user = await this.authService.queryUser(
      loginUserDTO.userName,
      loginUserDTO.password,
    )

    if (user === null) {
      return {
        code: ResultCode.FAIL,
        msg: '登录失败',
      }
    }

    const payload = { sub: user.userId, username: user.userName }

    return {
      code: ResultCode.SUCCESS,
      msg: '登录成功',
      token: await this.jwtService.signAsync(payload),
    }
  }

  @ApiOperation({ summary: '手机号码登录' })
  @Post('phoneLogin')
  async phoneLogin() {
    return '手机号码登录成功'
  }

  @ApiOperation({ summary: '微信小程序登录' })
  @Post('wxLogin')
  async wxLogin() {
    return '微信登录成功'
  }
}
