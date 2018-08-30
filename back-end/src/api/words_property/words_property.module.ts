import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { wordsPropertyProviders } from '../../database/Words_property/words_property.provider';
import { WordsPropertyService } from './words_property.service';
import { WordsPropertyController } from '../../api/words_property/words_property.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...wordsPropertyProviders,
    WordsPropertyService,
  ],
  exports: [...wordsPropertyProviders],
  controllers: [WordsPropertyController]
})
export class WordsPropertyModule {}