import { createConnection } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DbConnectionToken',
//     useFactory: async () => await createConnection({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: '1491748s',
//       database: 'separate-words',
//       entities: [
//           __dirname + '/../**/*.entity{.ts,.js}',
//       ],
//       synchronize: true,
//     })
//   },  
// ];

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
      name: 'mysql90Connection',
      type: 'mysql',
      host: '10.60.1.90',
      port: 3306,
      username: 'tagging',
      password: 'LPZmyDqk&X',
      database: 'tagging_system',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    })
  },  
];