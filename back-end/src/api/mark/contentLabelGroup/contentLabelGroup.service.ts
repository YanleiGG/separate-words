import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ContentLabelGroup } from '../../../database/contentLabelGroup/contentLabelGroup.entity';
import { ContentLabel } from '../../../database/contentLabel/contentLabel.entity'
import { Type } from '../../../database/type/type.entity'
var fs = require('fs')
var xml2js = require('xml2js')

@Injectable()
export class ContentLabelGroupService {
  constructor(
    @Inject('ContentLabelGroupRepositoryToken')
    private readonly ContentLabelGroupRepository: Repository<ContentLabelGroup>,
    @Inject('ContentLabelRepositoryToken')
    private readonly ContentLabelRepository: Repository<ContentLabel>,
    @Inject('TypeRepositoryToken')
    private readonly TypeRepository: Repository<Type>,
  ) {}

  async findOne (id: number) {
    return this.ContentLabelGroupRepository.findOne({ id })
  }

  async findAll () {
    let data = await this.ContentLabelGroupRepository.find({relations: ["words_propertys"]})
    return {
      code: 0,
      msg: 'successed!',
      data
    }
  }
  
  async create (args) {
    let { name } = args
    let sameName = await this.ContentLabelGroupRepository.find({ name })
    if (sameName.length > 0) {
      return {
        code: 10001,
        msg: '标签集合名称已存在!',
        data: null        
      }
    }

    let contentLabelGroup = new ContentLabelGroup(), 
        {labels} = args
    this.readXml(labels, null)
    // contentLabelGroup.name = name
    // contentLabelGroup.contentLabels = []
    // let res = await this.ContentLabelGroupRepository.save(contentLabelGroup)
    // for (let i = 0; i < labels.length; i++) {
    //   contentLabelGroup.contentLabels.push(await this.ContentLabelRepository.findOne({ name: labels[i] }))
    // }
    // await this.ContentLabelGroupRepository.save(contentLabelGroup)
    // return {
    //   code: 0,
    //   msg: 'successed!',
    //   data: res
    // }
  }

  async update (args) {
    let item = await this.ContentLabelGroupRepository.findOne({ id: args.id })
    item.name = args.name
    let res = await this.ContentLabelGroupRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async delete (id: number) {
    let item = await this.ContentLabelGroupRepository.findOne({ id })
    let res = await this.ContentLabelGroupRepository.delete(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async readXml (labels, task) {
    for (let i = 0;i < labels.length;i++) {
      var parser = new xml2js.Parser()
      let path = __dirname.replace(/\/api\/mark\/contentLabelGroup/, `/static/labels/${labels[i]}`)
      fs.readFile(path, async (err, data) => {
        await parser.parseString(data, async (err, result) => {
          if (result.classes) {
            let labels = this.flatten(result.classes.class, null)
            console.log(labels)
            // await labels.map(async item => {
            // })
            this.res = []
          } else {
            return {
              code: 10002,
              msg: `${labels[i]}无法解析!`
            }
          }
        })
      })
    }
  }

  res = []

  flatten (classes, parentId) {
    for (let i = 0;i < classes.length;i++) {
      this.res.push({
        mainId: classes[i]['$'].id,
        name: classes[i]['$'].name,
        parentId
      })
      if (classes[i].class) {
        this.flatten(classes[i].class, classes[i]['$'].id)
      } 
    }
    return this.res
  }
}

// { classes:
//   { class: [ 
//     { 
//       '$': { name: '分类名称', id: '001' },
//       class: [ 
//           { '$': { name: '分类名称', id: '001_001' } },
//           { '$': { name: '分类名称', id: '001_002' } } 
//       ]
//     },
//     { 
//       '$': { name: '分类名称', id: '002' },
//       class:
//         [ { '$': { name: '分类名称', id: '002_001' },
//         class: [  {'$': { name: '分类名称', id: '002_001_001' } } ] 
//         },
//         { '$': { name: '分类名称', id: '002_002' } } 
//       ] 
//     },
//        { '$': { name: '分类名称', id: '003' } } ] 
//     } 
// }
        