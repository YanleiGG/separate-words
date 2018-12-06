import { Controller, UseInterceptors, FileInterceptor, UploadedFile, Post } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly UploadService: UploadService) {}

  @Post('docs')
  @UseInterceptors(FileInterceptor('file'))
  uploadDocs(@UploadedFile() file) {
    return this.UploadService.upload(file, 'docs')
  }

  @Post('labels')
  @UseInterceptors(FileInterceptor('file'))
  uploadLabels(@UploadedFile() file) {
    return this.UploadService.upload(file, 'labels')
  }
}
