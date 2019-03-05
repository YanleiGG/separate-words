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
import { readAndParseXML, sleep } from 'tools';
import { Emotion } from 'database/emotion/emotion.entity';
import { SepWordsProperty } from 'database/sep_words_property/sep_words_property.entity';
import { MarkEntity } from 'database/mark_entity/mark_entity.entity';
import { insert } from 'tools/sql';
const urlencode = require('urlencode')
const encoding = require('encoding');
const http = require('http')

interface ArticleOptions{
  task: number,
  state?: string,
  user?: number
}
interface CountOptions{
  task: number,
  user?: number
}

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
    @Inject('EmotionRepositoryToken')
    private readonly EmotionRepository: Repository<Emotion>,
    @Inject('WordsPropertyGroupRepositoryToken')
    private readonly WordsPropertyGroupRepository: Repository<WordsPropertyGroup>,
    @Inject('EntitiesGroupRepositoryToken')
    private readonly EntitiesGroupRepository: Repository<EntitiesGroup>,
    @Inject('EmotionTypeGroupRepositoryToken')
    private readonly EmotionTypeGroupRepository: Repository<EmotionTypeGroup>,
    @Inject('ContentLabelGroupRepositoryToken')
    private readonly ContentLabelGroup: Repository<ContentLabelGroup>,
    @Inject('SepWordsPropertyRepositoryToken')
    private readonly SepWordsPropertyRepository: Repository<SepWordsProperty>,
    @Inject('MarkEntityRepositoryToken')
    private readonly MarkEntityRepository: Repository<MarkEntity>,
  ) {}

  async find(offset: number, pageSize: number) {
    let tasks =  await this.TaskRepository.find({ 
      where: {
        deleted: 0
      },
      order: {
        createdAt: 'DESC'
      },
      relations: [
        'users', 
        'types', 
        'wordsPropertyGroup', 
        'entitiesGroup', 
        'emotionTypeGroup', 
        'contentLabelGroup'
      ] 
    });
    let totalCount = tasks.length
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      tasks
    }
  }

  async findByType(type) {
    let tasks =  await this.TaskRepository.find({
      where: {
        deleted: 0
      },
      order: {
        createdAt: 'DESC'
      },
      relations: [
        'users', 
        'types', 
        'wordsPropertyGroup', 
        'entitiesGroup', 
        'emotionTypeGroup', 
        'contentLabelGroup'
      ] 
    });
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
      where: {
        id: userId,
        deleted: 0
      }, 
      relations: [
        'tasks', 
        'tasks.users', 
        'tasks.types', 
        'tasks.wordsPropertyGroup', 
        'tasks.entitiesGroup', 
        'tasks.emotionTypeGroup', 
        'tasks.contentLabelGroup'
      ] 
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
      where: {
        id: userId,
        deleted: 0
      }, 
      relations: [
        'tasks', 
        'tasks.users', 
        'tasks.types', 
        'tasks.wordsPropertyGroup', 
        'tasks.entitiesGroup', 
        'tasks.emotionTypeGroup', 
        'tasks.contentLabelGroup'
      ] 
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

  async findATaskWithArticles(taskId, offset, pageSize, type, filter, userId) {
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
      where: { 
        id: taskId,
        deleted: 0
      },
      relations: taskRelations
    })
    let articleOptions: ArticleOptions = { task: taskId }
    let countOptions: CountOptions = { task: taskId }
    if (filter !== 'all') articleOptions.state = filter
    if (userId) {
      articleOptions.user = userId
      countOptions.user = userId
    }
    let articles = await this.ArticleRepository.find({
      where: articleOptions,
      skip: offset,
      take: pageSize,
      relations: articleRelations
    })
    // 调用服务
    switch(type){
      case "separateWordsProperty":
        await new Promise((resolve, reject) => {
          articles.forEach(async article => {
            if (article.text.length <= 900) {  // 文本长度需小于900
              try {
                if (!article.sep_words_property) {
                  const res: any = await this.getSepaWordsAnalyze(article.text)
                  if (res.length > 0) {
                    res.pop()   // 去除头部的不正确项
                    res.shift() // 去除尾部的不正确项
                    const insertRes = await insert('sep_words_property', [
                      { key: 'separateWordsProperty', value: res.join('/ ') },
                      { key: 'separateWords', value: this.getSepWords(res) },
                    ])
                    let sep_words_property = await this.SepWordsPropertyRepository.findOne({ id: insertRes.insertId })

                    article.sep_words_property = sep_words_property
                    await this.SepWordsPropertyRepository.save(sep_words_property)
                    await this.ArticleRepository.save(article)
                  }
                }
                resolve({})
              } catch (e) {
                reject(e)
                console.log(e)
              }
            }
          })
        })
        break;
      case 'markEntity':
        await new Promise((resolve, reject) => {
          articles.forEach(async article => {
            if (article.text.length <= 900) {  // 文本长度需小于900
              try {
                if (!article.mark_entity) {
                  const res: any = await this.getSepaWordsAnalyze(article.text)
                  if (res.length > 0) {
                    const res: any = await this.getMarkEntityAnalyze(article.text)
                    let mark_entity = this.getMarkEntity(article.text, res)
                    const insertRes = await insert('mark_entity', [
                      { key: 'markEntity', value: mark_entity },
                    ])
                    let markEntity = await this.MarkEntityRepository.findOne({ id: insertRes.insertId })
                    article.mark_entity = markEntity
                    await this.MarkEntityRepository.save(markEntity)
                    await this.ArticleRepository.save(article)
                  }
                }
                resolve({})
              } catch (e) {
                reject(e)
                console.log(e)
              }
            }
          })
        })
        break;
      case 'emotion': 
        await new Promise((resolve, reject) => {
          articles.forEach(async article => {
            if (article.text.length <= 900) {  // 文本长度需小于900
              try {
                if (!article.emotion) {
                  const res: any = await this.getEmotionAnalyze(article.text)
                  if (res.senti_label) {
                    const insertData = []
                    insertData.push({ key: 'degree', value: res.score })
                    if (+res.score >= 50 && +res.score <= 55) {
                      insertData.push({ key: 'attitude', value: 'neutral' })
                    } else {
                      insertData.push({ key: 'attitude', value: res.senti_label })
                    }
                    const insertRes = await insert('emotion', insertData)
                    let emotion = await this.EmotionRepository.findOne({ id: insertRes.insertId })
                    article.emotion = emotion
                    await this.ArticleRepository.save(article)
                  }
                }
                resolve({})
              } catch (e) {
                reject(e)
                console.log(e)
              }
            }
          })
        })
        break;
      default: {}
    }
    await sleep(300)
    const totalCount = await this.ArticleRepository.count({ 
      where: countOptions
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
    let sameName = await this.TaskRepository.find({ 
      name,
      deleted: 0
    })
    if (sameName.length > 0) {
      return {
        code: 10001,
        msg: '任务名称已存在!',
        data: null        
      }
    }

    const insertRes = await insert('task')
    let task = await this.TaskRepository.findOne({ id: insertRes.insertId })
    let taskUsers = []
    let type_1 = await this.TypeRepository.findOne({ symbol: type })
    if (selectedUsers[0]==='all') {
      taskUsers = await this.UserRepository.find({relations: ['roles']})
      taskUsers = taskUsers.filter(item => {
        return item.roles.some(i => {
          return i.name === '任务标注'
        })
      })
      task.users = taskUsers
    } else {
      await selectedUsers.map(async item => {
        let user = await this.UserRepository.findOne({ id: item })
        taskUsers.push(user)
      })
      task.users = taskUsers
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
    task.deleted = 0
    task.types = [type_1]
    task.state = '进行中'
    // 过滤掉admin账号，将文章进行均分至选择的标注人员上
    let articleUsers = task.users.filter(item => item.name != 'admin')
    let articleUsersIndex = 0

    let path = __dirname.replace(/\/api\/mark\/task/, `/static/docs/${docs[0]}`)
    let result = await readAndParseXML(path)
    if (result.docs) {
      await this.TaskRepository.save(task)
      let docs = result.docs.doc
      let per = docs.length/articleUsers.length
      let articles = []
      docs.map(async (item, index) => {
        const insertRes = await insert('article')
        let article = await this.ArticleRepository.findOne({ id: insertRes.insertId })
        if (index > per*(articleUsersIndex+1)) articleUsersIndex++
        article.user = articleUsers[articleUsersIndex]
        article.title = item.title ? item.title[0] : ''
        // 适应一些xml不准确的特殊情况
        if (item.text[0]['_']) {
          article.text = item.text[0]['_']
        } else {
          article.text = item.text ? item.text[0] : ''
        }
        article.state = 'marking'
        article.task = task
        articles.push(article)
        await this.ArticleRepository.save(article)
      })
      try{
      } catch(err) {
        console.log(err)
      }
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
    if (args.state) task.state = args.state
    if (args.deleted) task.deleted = args.deleted
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

  getEmotionAnalyze(text) {
    // 请求情感分析服务
    return new Promise((resolve, reject) => {
      const data = 'q=%7B%22doc%22%3A+%5B%22%' + urlencode(encoding.convert(text)) + '%5Cn%22%5D%7D'
      const req = http.get('http://172.22.0.30:8081/senti?'+data, res => {
        try {
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            const emotionParse1 = JSON.parse(chunk)
            if (emotionParse1.err_code === 0) {
              resolve(JSON.parse(JSON.parse(chunk).result))
            } else {
              resolve({
                senti_label: '',
                score: ''
              }) 
            }
          });
        } catch (e) {
          console.log(e)
        }
      })
      req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
        reject(e.message)
      });
    })
  }

  getSepaWordsAnalyze(text) {
    // 请求分词服务
    return new Promise((resolve, reject) => {
      const data = 'q=%7B%22doc%22%3A+%5B%22%' + urlencode(encoding.convert(text)) + '%5Cn%22%5D%7D'
      const req = http.get('http://172.22.0.30:9051/senti?'+data, res => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          try {
            const emotionParse1 = JSON.parse(chunk)
            if (emotionParse1.err_code === 0) {
              resolve(JSON.parse(JSON.parse(chunk).result))
            } else {
              resolve([])
            }
          } catch (e) {
            console.log(e)
          }
        });
      })
      req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
        reject(e.message)
      });
    })
  }

  getMarkEntityAnalyze(text) {
    // 请求实体标注服务
    return new Promise((resolve, reject) => {
      const data = 'q=%7B%22doc%22%3A+%5B%22%' + urlencode(encoding.convert(text)) + '%5Cn%22%5D%7D'
      const req = http.get('http://172.22.0.30:8083/ner?'+data, res => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          try {
            const emotionParse1 = JSON.parse(chunk)
            if (emotionParse1.err_code === 0) {
              resolve(JSON.parse(JSON.parse(chunk).result))
            } else {
              resolve(
                {
                  vpers: [],
                  vrgn: [],
                  vorg: [],
                }
              )
            }
          } catch (e) {
            console.log(e)
          }
        });
      })
      req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
        reject(e.message)
      });
    })
  }

  getSepWords(wordsArr) {
    let res = ''
    wordsArr.map(item => {
      if (item.length > 1) {
        for (let i = 0;i < item.length;i++) {
          if (i === 0) {
            res += item[i] + 'B'
          } else if (i === item.length - 1 ) {
            res += item[i] + 'E'
          } else {
            res += item[i] + 'I'
          }
        }
      } else {
        res += item + 'S'
      }
    })
    return res
  }

  findAllItem(item, str) {
    let res = []
    let index = 0
    index = str.indexOf(item, index)
    if (index != -1) res.push(index)
    while(index != -1) {
      index = str.indexOf(item, index + 1)
      if (index != -1) res.push(index)
    }
    return res
  }
  
  getMarkEntity(text, entity) {
    let wordsArr = text.split('').map(item => item += '/')
    entity.vpers.map(item => {
      let persIndexArr = this.findAllItem(item.v, text)
      persIndexArr.map(index => {
        for (let i = index;i < index + item.v.length;i++) {
          if (wordsArr[i].indexOf('pers') === -1 && wordsArr[i].indexOf('rgn') === -1 && wordsArr[i].indexOf('org') === -1) wordsArr[i] =  wordsArr[i] + 'pers'
        }
      })
    })
    entity.vrgn.map(item => {
      let rgnIndexArr = this.findAllItem(item.v, text)
      rgnIndexArr.map(index => {
        for (let i = index;i < index + item.v.length;i++) {
          if (wordsArr[i].indexOf('pers') === -1 && wordsArr[i].indexOf('rgn') === -1 && wordsArr[i].indexOf('org') === -1) wordsArr[i] =  wordsArr[i] + 'rgn'
        }
      })
    })
    entity.vorg.map(item => {
      let orgIndexArr = this.findAllItem(item.v, text)
      orgIndexArr.map(index => {
        for (let i = index;i < index + item.v.length;i++) {
          if (wordsArr[i].indexOf('pers') === -1 && wordsArr[i].indexOf('rgn') === -1 && wordsArr[i].indexOf('org') === -1)wordsArr[i] =  wordsArr[i] + 'org'
        }
      })
    })
    return wordsArr.join(' ')
  }
}