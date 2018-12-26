import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var bodyParser = require('body-parser')
var session = require('express-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true, 
    origin: ['http://localhost:3001', 'http://localhost:3005', 'http://10.61.3.65:3005']
  });
  app.use(session({
    secret: 'keyboard separate words',
    resave: false,
    saveUninitialized: true
  }))
  app.use(bodyParser.json({limit:'50mb'}));
  app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
  await app.listen(3000);
}
bootstrap();
