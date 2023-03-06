import { CanActivate, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DebugGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(): boolean {
    return (
      this.configService.get<string>('NODE_ENV', 'development') ===
      'development'
    );
  }
}
