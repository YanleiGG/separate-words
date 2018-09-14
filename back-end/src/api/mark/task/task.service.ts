import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../../../database/task/task.entity';
import { Article } from '../../../database/article/article.entity'
import { Type } from '../../../database/type/type.entity'
import { User } from '../../../database/user/user.entity'
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
    private readonly UserRepository: Repository<User>
  ) {}

  async find(offset: number, pageSize: number) {
    let tasks =  await this.TaskRepository.find();
    let totalCount = tasks.length
    let data = tasks.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      tasks: data
    }
  }

  async findOne (id: number) {
    let tasks =  await this.TaskRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      tasks
    }
  }

  async create (args) {
    let {docs, selectedUsers, type} = args
    var parser = new xml2js.Parser()
    let task = new Task()
    let type_1 = await this.TypeRepository.findOne({ symbol: type })
    // 这里后面需要修改，暂时把所有用户都与任务建立关系，后面把用户权限做好了只需要标注用户就行
    if (selectedUsers[0]==='all') {
      let users = await this.UserRepository.find()
      task.users = users
    } else {
      let users = []
      await selectedUsers.map(async item => {
        let user = await this.UserRepository.findOne({ name: item })
        users.push(user)
      })
      task.users = users
    }
    task.name = args.name
    task.instruction = args.instruction
    task.types = [type_1]
    task.state = '进行中'
    for (let i = 0;i < docs.length;i++) {
      let path = __dirname.replace(/\/api\/mark\/task/, `/static/docs/${docs[i]}`)
      fs.readFile(path, (err, data) => {
        parser.parseString(data, async (err, result) => {
          if (result.doc) {
            let docs = result.doc.doc
            await docs.map(async item => {
              let article = new Article()
              article.title = item.title[0]
              article.text = item.text[0]
              article.task = task
              await this.ArticleRepository.save(article)
            })
          }
        })
      })
    }

    await this.TaskRepository.save(task)
    return {
      code: 0,
      msg: 'create successed!',
      task
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