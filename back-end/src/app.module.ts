import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module'
import { MarkModule } from './api/mark/mark.module'

@Module({
  imports: [AuthModule, MarkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
