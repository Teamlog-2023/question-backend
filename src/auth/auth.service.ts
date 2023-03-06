import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { OAuth2Client } from 'google-auth-library';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // async vertifyToken(token: string): Promise<boolean> {
  //   const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
  //   const client = new OAuth2Client(clientId);
  //   const ticket = await client
  //     .verifyIdToken({
  //       idToken: token,
  //     })
  //     .catch(() => null);
  //   return ticket ? true : false;
  // }

  async decodeCredential(token: string): Promise<any> {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const client = new OAuth2Client(clientId);
    const ticket = await client
      .verifyIdToken({
        idToken: token,
      })
      .catch(() => null);
    return ticket ? ticket.getPayload() : null;
  }

  async generateAccessToken({ credential }: LoginDto): Promise<any> {
    const payload = await this.decodeCredential(credential);
    if (!payload) {
      throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.user
      .createQueryBuilder('user')
      .where({ email: payload.email })
      .select(['user.uuid', 'user.id', 'user.name', 'user.email'])
      .getOne();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const token = await this.jwtService.signAsync(
      {
        uuid: user.uuid,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '1d'),
      },
    );

    return token;
  }

  async regist({ id, name, email }: CreateUserDto): Promise<User> {
    const user = await this.user.findOneBy({ email });
    if (user) {
      return user;
    }

    return await this.user.save({
      id,
      name,
      email,
    });
  }
}
