import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
const fs = require('fs')
var timestamp = require('time-stamp')

@Injectable()
export class UploadService {
  constructor(
  ) {}

  upload(file, pathname) {
    let name = timestamp.utc('YYYYMMDDmmss').toString() + file.originalname
    let path = __dirname.replace(/\/api\/mark\/upload/, `/static/${pathname}/${name}`)
    fs.writeFile(path, file.buffer, 'utf8', () => {})
    return {
      code: 0,
      msg: 'success',
      data: {
        fileName: name
      }
    }
  }
}
