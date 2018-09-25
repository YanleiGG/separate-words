import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var bodyParser = require('body-parser')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true, 
    origin: 'http://localhost:3001'
  });
  app.use(bodyParser.json({limit:'50mb'}));
  app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
  await app.listen(3000);
}
bootstrap();
