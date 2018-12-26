import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../../../database/task/task.entity';
import { Article } from '../../../database/article/article.entity'
import { Type } from '../../../database/type/type.entity'
import { User } from '../../../database/user/user.entity'
import { WordsPropertyGroup } from '../../../database/words_property_group/words_property_group.entity'
import { EntitiesGroup } from '../../../database/entities_group/entities_group.entity'
import { EmotionTypeGroup } from '../../../database/emotionTypeGroup/emotionTypeGroup.entity'
import { ContentLabelGroup } from '../../../database/contentLabelGroup/contentLabelGroup.entity'
import { readAndParseXML } from 'tools';
var fs = require('fs')
var xml2js = require('xml2js')

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepositoryToken')
    private readonly TaskRepository: Repository<Task>,
    @Inject('ArticleRepositoryToken')
    private readonly ArticleRepository: Repository<Article>,
    @Inject('TypeRepositoryToken')
    private readonly TypeRepository: Repository<Type>,
    @Inject('UserRepositoryToken')
    private readonly UserRepository: Repository<User>,
    @Inject('WordsPropertyGroupRepositoryToken')
    private readonly WordsPropertyGroupRepository: Repository<WordsPropertyGroup>,
    @Inject('EntitiesGroupRepositoryToken')
    private readonly EntitiesGroupRepository: Repository<EntitiesGroup>,
    @Inject('EmotionTypeGroupRepositoryToken')
    private readonly EmotionTypeGroupRepository: Repository<EmotionTypeGroup>,
    @Inject('ContentLabelGroupRepositoryToken')
    private readonly ContentLabelGroup: Repository<ContentLabelGroup>,
  ) {}

  async find(offset: number, pageSize: number) {
    let tasks =  await this.TaskRepository.find({ relations: ['users', 'types', 'wordsPropertyGroup', 'entitiesGroup'] });
    let totalCount = tasks.length
    // let data = tasks.reverse().splice(offset, pageSize)
    let data = tasks.reverse()
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      tasks: data
    }
  }

  async findByType(type) {
    let tasks =  await this.TaskRepository.find({ relations: ['users', 'types', 'wordsPropertyGroup', 'entitiesGroup'] });
    let totalCount = tasks.length
    tasks = tasks.filter(item => {
      return item.types.some(i => i.symbol === type)
    })
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      tasks
    }
  }

  async findByUserId(userId) {
    let user = await this.UserRepository.findOne({ 
      where: {id: userId}, 
      relations: ['tasks', 'tasks.users', 'tasks.types', 'tasks.wordsPropertyGroup', 'tasks.entitiesGroup'] 
    });
    let tasks = user.tasks.reverse()
    let totalCount = tasks.length
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      tasks
    }
  }

  async findByUserIdAndType(type, userId) {
    let user = await this.UserRepository.findOne({ 
      where: {id: userId}, 
      relations: ['tasks', 'tasks.users', 'tasks.types', 'tasks.wordsPropertyGroup', 'tasks.entitiesGroup'] 
    });
    let tasks = user.tasks.reverse()
    let totalCount = tasks.length
    tasks = tasks.filter(item => {
      return item.types.some(i => i.symbol === type)
    })
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      tasks
    }
  }

  async findATaskWithArticles(taskId, offset, pageSize, type, filter) {
    let taskRelations = ['users', 'types']
    let articleRelations = []
    switch(type){
      case "separateWordsProperty": 
        taskRelations.push('wordsPropertyGroup')
        articleRelations.push('sep_words_property')
        break;
      case "markEntity": 
        taskRelations.push('entitiesGroup', 'entitiesGroup.entities')
        articleRelations.push('mark_entity')
        break;
      case 'emotion': 
        taskRelations.push('emotionTypeGroup', 'emotionTypeGroup.emotionTypes')
        articleRelations.push('emotion')
        break;
      case 'contentType': 
        taskRelations.push('contentLabelGroup', 'contentLabelGroup.contentLabels')
        break;
      default: {}
    }
    let task =  await this.TaskRepository.findOne({ 
      where: { id: taskId },
      relations: taskRelations
    })
    let articleWithFilterOptions = {
      task: taskId,
      state: filter
    }
    let articleWithoutFilterOptions = {
      task: taskId
    }
    let articles = await this.ArticleRepository.find({
      where: filter !== 'all' ? articleWithFilterOptions : articleWithoutFilterOptions,
      skip: offset,
      take: pageSize,
      relations: articleRelations
    })
    const totalCount = await this.ArticleRepository.count({ 
      where: { task: taskId }
    })
    task.articles = articles
    return {
      code: 0,
      msg: 'find successed!',
      data: {
        totalCount,
        task
      }
    }
  }

  async findOne (id: number) {
    let tasks =  await this.TaskRepository.findOne({ id });
    return {
      code: 0,
      msg: 'find successed!',
      tasks
    }
  }

  async create (args) {
    let {name, docs, selectedUsers, type, selectedLabelsId} = args
    let sameName = await this.TaskRepository.find({ name })
    if (sameName.length > 0) {
      return {
        code: 10001,
        msg: '任务名称已存在!',
        data: null        
      }
    }

    let task = new Task()
    let type_1 = await this.TypeRepository.findOne({ symbol: type })
    if (selectedUsers[0]==='all') {
      let users = await this.UserRepository.find({relations: ['roles']})
      users = users.filter(item => {
        return item.roles.some(i => {
          return i.name === '任务标注'
        })
      })
      task.users = users
    } else {
      let users = []
      await selectedUsers.map(async item => {
        let user = await this.UserRepository.findOne({ id: item })
        users.push(user)
      })
      task.users = users
    }
    switch (type) {
      case 'separateWordsProperty': {
        task.wordsPropertyGroup = await this.WordsPropertyGroupRepository.findOne({ id: selectedLabelsId })
        break;
      }
      case 'markEntity': {
        task.entitiesGroup= await this.EntitiesGroupRepository.findOne({ id: selectedLabelsId })
        break;
      }
      case 'emotion': {
        task.emotionTypeGroup = await this.EmotionTypeGroupRepository.findOne({ id: selectedLabelsId })
        break;
      }
      case 'contentType': {
        task.contentLabelGroup = await this.ContentLabelGroup.findOne({ id: selectedLabelsId })
        break;
      }
      default: {}
    }
    task.name = args.name
    task.instruction = args.instruction
    task.types = [type_1]
    task.state = '进行中'
    let path = __dirname.replace(/\/api\/mark\/task/, `/static/docs/${docs[0]}`)
    let result = await readAndParseXML(path)
    if (result.docs) {
      await this.TaskRepository.save(task)
      let docs = result.docs.doc
      docs.map(async item => {
        let article = new Article()
        article.title = item.title ? item.title[0] : ''
        article.text = item.text ? item.text[0] : ''
        article.state = 'marking'
        article.task = task
        try{
          await this.ArticleRepository.save(article)
        } catch(err) {
          console.log(err)
        }
      })
      await this.TaskRepository.save(task)
      return {
        code: 0,
        msg: '创建成功!',
        task
      }
    } else {
      return {
        code: 10002,
        msg: `${docs[0]}无法解析!`
      }
    }
  }

  async update (args) {
    let task = await this.TaskRepository.findOne({ id: args.id })
    await this.TaskRepository.save(task)
    return {
      code: 0,
      msg: 'update successed!',
      task
    }
  }

  async delete ( id: number ) {
    let task = await this.TaskRepository.findOne({ id })
    await this.TaskRepository.delete(task)
    return {
      code: 0,
      msg: 'delete successed!',
      task
    }
  }
}