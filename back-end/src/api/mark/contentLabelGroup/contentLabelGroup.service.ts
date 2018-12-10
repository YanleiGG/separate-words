import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ContentLabelGroup } from '../../../database/contentLabelGroup/contentLabelGroup.entity';
import { ContentLabel } from '../../../database/contentLabel/contentLabel.entity'
import { Type } from '../../../database/type/type.entity'
import { readAndParseXML, getContentLabelsTree } from 'tools';

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
    let contentLabelGroup = await this.ContentLabelGroupRepository.findOne({  
      where: { id },
      relations: ["contentLabels"]
    })
    return {
      code: 0,
      msg: 'successed!',
      data: {
        ...contentLabelGroup,
        treeData: getContentLabelsTree(contentLabelGroup.contentLabels)
      }
    }
  }

  async findAll () {
    let data = await this.ContentLabelGroupRepository.find({relations: ["contentLabel"]})
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
    contentLabelGroup.name = name
    contentLabelGroup.contentLabels = []

    let path = __dirname.replace(/\/api\/mark\/contentLabelGroup/, `/static/labels/${labels[0]}`)
    let result = await readAndParseXML(path)
    if (result.classes) {
      await this.ContentLabelGroupRepository.save(contentLabelGroup)
      let contentLabels = this.flatten(result.classes.class, null)
      this.res = []
      contentLabels.map(async item => {
        let contentLabel = new ContentLabel()
        contentLabel.mainId = item.mainId
        contentLabel.name = item.name
        contentLabel.parentId = item.parentId
        contentLabel.contentLabelGroup = contentLabelGroup
        await this.ContentLabelRepository.save(contentLabel)
        contentLabelGroup.contentLabels.push(contentLabel)
      })
      await this.ContentLabelGroupRepository.save(contentLabelGroup)
      return {
        code: 0,
        msg: '创建成功!',
        data: contentLabelGroup        
      }
    } else {
      return {
        code: 10001,
        msg: '分类体系树格式错误!',
        data: null        
      }
    }
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
        