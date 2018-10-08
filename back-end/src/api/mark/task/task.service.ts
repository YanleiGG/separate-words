import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../../../database/task/task.entity';
import { Article } from '../../../database/article/article.entity'
import { Type } from '../../../database/type/type.entity'
import { User } from '../../../database/user/user.entity'
import { WordsPropertyGroup } from '../../../database/words_property_group/words_property_group.entity'
import { EntitiesGroup } from '../../../database/entities_group/entities_group.entity'
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
    let relations = ['articles','users', 'types'] 
    switch(type){
      case "separateWordsProperty": relations.push('articles.sep_words_property', 'wordsPropertyGroup', 'wordsPropertyGroup.words_propertys')
      case "markEntity": relations.push('articles.mark_entity', 'entitiesGroup', 'entitiesGroup.entities')
      case 'emotion': relations.push('articles.emotion')
      default: {}
    }
    let task =  await this.TaskRepository.findOne({ 
      where: { id: taskId },
      relations
    })
    if (filter === 'completed' || filter === 'marking') {
      task.articles = task.articles.filter(item => item.state === filter)
    }
    let totalCount = task.articles.length
    task.articles = task.articles.splice(offset, pageSize)
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
        let wordsPropertyGroup = await this.WordsPropertyGroupRepository.findOne({ id: selectedLabelsId })
        task.wordsPropertyGroup = wordsPropertyGroup
      }
      case 'markEntity': {
        let entitiesGroup = await this.EntitiesGroupRepository.findOne({ id: selectedLabelsId })
        task.entitiesGroup = entitiesGroup
      }
      default: {}
    }
    task.name = args.name
    task.instruction = args.instruction
    task.types = [type_1]
    task.state = '进行中'
    await this.readXml(docs, task)
    await this.TaskRepository.save(task)
    return {
      code: 0,
      msg: 'create successed!',
      task
    }
  }

  async readXml (docs, task) {
    for (let i = 0;i < docs.length;i++) {
      var parser = new xml2js.Parser()
      let path = __dirname.replace(/\/api\/mark\/task/, `/static/docs/${docs[i]}`)
      fs.readFile(path, async (err, data) => {
        await parser.parseString(data, async (err, result) => {
          if (result.docs) {
            let docs = result.docs.doc
            await docs.map(async item => {
              let article = new Article()
              article.title = item.title ? item.title[0] : null
              article.text = item.text ? item.text[0] : null
              article.state = 'marking'
              article.task = task
              await this.ArticleRepository.save(article)
            })
          } else {
            return {
              code: 10002,
              msg: `${docs[i]}无法解析!`
            }
          }
        })
      })
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