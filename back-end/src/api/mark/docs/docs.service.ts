import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Docs } from 'database/docs/docs.entity'
import { Type } from 'database/type/type.entity';

@Injectable()
export class DocsService {
  constructor(
    @Inject('DocsRepositoryToken')
    private readonly DocsRepository: Repository<Docs>,
    @Inject('TypeRepositoryToken')
    private readonly TypeRepository: Repository<Type>,
  ) {}
  
  async find(offset: number, pageSize: number, type: string) {
    let docses
    if (!type || type === 'all') {
      docses = await this.DocsRepository.find({ relations: ['type'] })
    } else {
      let _type = await this.TypeRepository.findOne({ symbol: type })
      docses = await this.DocsRepository.find({
        where: { type: _type.id },
        relations: ['type']
      })
    }
    return {
      code: 0,
      msg: 'find successed!',
      docs: docses
    }
  }

  async findOne (id: number) {

  }

  async create (args) {
    let docs = new Docs()
    docs.name = args.name
    docs.pathName = args.pathName
    let type = await this.TypeRepository.findOne({symbol: args.type})
    docs.type = type
    await this.DocsRepository.save(docs)
    return {
      code: 0,
      msg: 'create successed!',
      docs
    }
  }

  async update (args) {

  }

  async delete ( id: number ) {

  }
}