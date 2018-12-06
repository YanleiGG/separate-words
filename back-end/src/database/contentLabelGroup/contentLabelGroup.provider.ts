import { Connection } from 'typeorm';
import { ContentLabelGroup } from './contentLabelGroup.entity';

export const contentLabelGroupProviders = [
  {
    provide: 'ContentLabelGroupRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ContentLabelGroup),
    inject: ['DbConnectionToken']
  }
]