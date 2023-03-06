import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AccessGuard } from './guards/access.guard';
import { DebugGuard } from './guards/debug.guard';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  getHello(@Req() req: Request) {
    return this.user.findOneBy({ uuid: req.user.uuid });
  }

  @Post('/login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const token = await this.authService.generateAccessToken(body);
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
    });
    res.json({ token });
  }

  @UseGuards(DebugGuard)
  @Post('/regist')
  async regist(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.regist(body);
  }
}
