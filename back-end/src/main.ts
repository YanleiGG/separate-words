import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.options('*', cors({ credentials: true, origin: 'localhost:3000' }))
  app.enableCors({ credentials: true, origin: 'http://localhost:3001' });
  await app.listen(3000);
}
bootstrap();
