import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ClassProviders } from '../../database/Class/class.provider';
import { ClassService } from './class.service';
import { ClassController } from '../../api/Class/Class.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...ClassProviders,
    ClassService,
  ],
  exports: [...ClassProviders],
  controllers: [ClassController]
})
export class classModule {}