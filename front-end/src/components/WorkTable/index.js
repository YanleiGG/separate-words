import * as React from "react";
import { connect } from "react-redux";
import store from '../../state/store'
import { Layout, message } from "antd";
import HeaderNav from './HeaderNav'
import { Route, Switch } from "react-router-dom";
import util from '../../util'
import Main_UI from './Main'
import SiderNav_UI from './SiderNav'
import FooterBtn_UI from './FooterBtn'
import CreateArticle_UI from './CreateArticle'
import axios from 'axios'

const { Header, Content } = Layout;

// 初始化 & 更新数据
let refresh = async dispatch => {
  let state = store.getState()
  let res = await axios.get(`${state.path}/api/article?offset=${(state.page-1)*10}&pageSize=10`)
  let articles = res.data.articles.map(item => {
    return {
      ...item,
      separateWords: util.unformatWithoutProperty(item.content, item.separateWords, state.typeArr),
      separateWordsProperty: util.unformatWithProperty(item.content, item.separateWordsProperty, state.typeArr),
      markEntity: util.unformatWithoutProperty(item.content, item.markEntity, state.typeArr)
    }
  })
  dispatch({ type: "SET_ARTICLES", articles })
  dispatch({ type: "SET_TOTAL_COUNT", totalCount: res.data.totalCount })      
  dispatch({ type: "SET_SHOWARTICLE", showArticle: articles[0] })
  dispatch({ type: "SET_SELECTED_KEYS", selectedKeys: [articles[0].id.toString()]})
}

// 状态管理
let mapAllStateToProps = state => {
  return state
};

let mapStateToSeparateWordsProperty = state => {
  return {
    ...state,
    article: state.showArticle.separateWordsProperty
  }
}
let mapStateToSeparateWords = state => {
  return {
    ...state,
    article: state.showArticle.separateWords
  }
}
let mapStateToMarkEntity  = state => {
  return {
    ...state,
    article: state.showArticle.markEntity
  }
}

let mapDispatchToApp = dispatch => {
  return {
    refresh: () => refresh(dispatch)
  }
}

// 将 Main 组件公有的方法抽取出来
let mapDispathToMain = dispatch => {
  return {
    handleCancel: () => {
      dispatch({ type: 'CLOSE_MODAL' })
    },
    radioOnChange: (e) => {
      dispatch({
        type: 'SET_RADIO_VALUE',
        radioValue: e.target.value
      })
    }
  };
};
let mapDispathToSeparateWordsProperty = dispatch => {
  let publicDispathToMain = mapDispathToMain(dispatch)
  return {
    ...publicDispathToMain,
    handleOk: () => {
      let start = store.getState().selection.start
      let end = store.getState().selection.end
      let data = store.getState().showArticle.separateWordsProperty
      let type = store.getState().radioValue
      for (let i = start;i < end;i++) {
        data[i].type = type
      }
      if (data[start-1] && data[start-1].content != '/') {
        data.splice(start, 0, { id: null, content: '/', type: '0' })
        start ++
        end ++
      }
      if (data[end] && data[end].content != '/') {
        data.splice(end, 0, { id: 1, content: '/', type: '0' })
      }
      for (let i = end-1;i >= start;i--) {
        if (data[i] && data[i].content == '/') data.splice(i, 1)
      }
      dispatch({ type: 'CLOSE_MODAL' })
    },
    pickWords: () => {
      if (window.getSelection().toString()) {
        let start = window.getSelection().getRangeAt(0).startContainer.parentElement.id
        let end = + window.getSelection().getRangeAt(0).endContainer.parentElement.id + 1
        let selectedContent = ''
        let data = store.getState().showArticle.separateWordsProperty
        for (let i = start;i < end;i++) {
          selectedContent += data[i].content
        }
        dispatch({ 
          type: "SET_SELECTION", 
          selection: {
             content: selectedContent,
             start,
             end
          } 
        })
        dispatch({ type: "OPEN_MODAL"})
      }
    }
  };
};
let mapDispathToSeparateWords = dispatch => {
  let publicDispathToMain = mapDispathToMain(dispatch)
  return {
    ...publicDispathToMain,
    handleOk: () => {},
    pickWords: () => {
      if (window.getSelection().toString()) {
        let start = window.getSelection().getRangeAt(0).startContainer.parentElement.id
        let end = + window.getSelection().getRangeAt(0).endContainer.parentElement.id + 1
        let selectedContent = ''
        let data = store.getState().showArticle.separateWords
        for (let i = start;i < end;i++) {
          selectedContent += data[i].content
        }
        dispatch({ 
          type: "SET_SELECTION", 
          selection: {
             content: selectedContent,
             start,
             end
          }
        })
        let type = util.getType(data, store.getState().typeArr, start, end-1)
        let selection = store.getState().selection
        for (let i = selection.start;i < selection.end;i++) {
          data[i].type = type
        }
        if (data[start-1] && data[start-1].content != '/') {
          data.splice(start, 0, { id: null, content: '/', type: '0' })
          start ++
          end ++
        }
        if (data[end] && data[end].content != '/') {
          data.splice(end, 0, { id: 1, content: '/', type: '0' })
        }
        for (let i = end-1;i >= start;i--) {
          if (data[i] && data[i].content == '/') data.splice(i, 1)
        }
      }
    }
  };
};
let mapDispathToMarkEntity = dispatch => {
  let publicDispathToMain = mapDispathToMain(dispatch)
  return {
    ...publicDispathToMain,
    handleOk: () => {},
    pickWords: () => {
      if (window.getSelection().toString()) {
        let start = window.getSelection().getRangeAt(0).startContainer.parentElement.id
        let end = + window.getSelection().getRangeAt(0).endContainer.parentElement.id + 1
        let selectedContent = ''
        let data = store.getState().showArticle.markEntity
        for (let i = start;i < end;i++) {
          selectedContent += data[i].content
        }
        dispatch({ 
          type: "SET_SELECTION", 
          selection: {
             content: selectedContent,
             start,
             end
          }
        })
        let type = util.getType(data, store.getState().typeArr, start, end-1)
        let selection = store.getState().selection
        for (let i = selection.start;i < selection.end;i++) {
          data[i].type = type
        }
        if (data[start-1] && data[start-1].content != '/') {
          data.splice(start, 0, { id: null, content: '/', type: '0' })
          start ++
          end ++
        }
        if (data[end] && data[end].content != '/') {
          data.splice(end, 0, { id: 1, content: '/', type: '0' })
        }
        for (let i = end-1;i >= start;i--) {
          if (data[i] && data[i].content == '/') data.splice(i, 1)
        }
      }
    }
  };
};
let mapDispathToFooterBtn = dispatch => {
  return {
    save: async () => {
      let tips = message.loading('Saving...')
      let state = store.getState()
      let article = JSON.parse(JSON.stringify(state.showArticle))
      article.separateWords = util.formatWithoutProperty(article.separateWords)
      article.separateWordsProperty = util.formatWithProperty(article.separateWordsProperty)
      article.markEntity = util.formatWithoutProperty(article.markEntity)
      let res = await axios.put(`${state.path}/api/article`, article)
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('Save Successed!', 1.5)
      } else {
        message.error('Save defeat!', 1.5)
      }
    },
    cancel: async () => {
      let state = store.getState()
      let res = await axios.get(`${state.path}/api/article/${state.showArticle.id}`)
      let article = res.data.article
      article = {
        ...article,
        separateWords: util.unformatWithoutProperty(article.content, article.separateWords, state.typeArr),
        separateWordsProperty: util.unformatWithoutProperty(article.content, article.separateWordsProperty, state.typeArr),
        markEntity: util.unformatWithoutProperty(article.content, article.markEntity, state.typeArr)
      }
      let articles = state.articles.map(item => {
        if (item.id == article.id) return article
        return item
      })
      dispatch({ type: "SET_ARTICLES", articles })
      dispatch({ type: "SET_SHOWARTICLE", showArticle: article })
    }
  }
}
let mapDispatchToSiderNav = dispatch => {
  return {
    handleClick: id => {
      let state = store.getState()
      let showArticle = state.articles.find(item => item.id == id)
      dispatch({ type: "SET_SHOWARTICLE", showArticle })
      dispatch({ type: "SET_SELECTED_KEYS", selectedKeys: [showArticle.id.toString()]})
    },
    pageChange: async (page) => {
      dispatch({ type: "SET_PAGE", page })
      refresh(dispatch)
    }
  }
}
let mapDispathToCreateArticle = dispatch => {
  return {
    create: async () => {
      let state = store.getState()
      let content = state.createArticle.replace(' ', '')
      let separateWords = '', separateWordsProperty = '', markEntity = ''
      for (let i = 0;i < content.length;i++) {
        separateWords += 'S'
        markEntity += 'S'
        separateWordsProperty += 'S0'
      }
      let article = {
        title: state.createArticleTitle,
        content,
        separateWords,
        markEntity,
        separateWordsProperty
      }
      console.log(article)
      let res = await axios.post(`${state.path}/api/article`, article)
      console.log(res)
    },
    cancel: () => {
      dispatch({ type: "SET_CREATE_ARTICLE", createArticle: '' })
      dispatch({ type: "SET_CREATE_ARTICLE_TITLE", createArticleTitle: '' })
    },
    contentChange: e => {
      dispatch({ type: "SET_CREATE_ARTICLE", createArticle: e.target.value })
    },
    titleChange: e => {
      dispatch({ type: "SET_CREATE_ARTICLE_TITLE", createArticleTitle: e.target.value })
    }
  }
}

let SeparateWordsProperty = connect(mapStateToSeparateWordsProperty, mapDispathToSeparateWordsProperty)(Main_UI)
let SeparateWords = connect(mapStateToSeparateWords, mapDispathToSeparateWords)(Main_UI)
let MarkEntity = connect(mapStateToMarkEntity, mapDispathToMarkEntity)(Main_UI)
let SiderNav = connect(mapAllStateToProps, mapDispatchToSiderNav)(SiderNav_UI)
let FooterBtn = connect(mapAllStateToProps, mapDispathToFooterBtn)(FooterBtn_UI)
let CreateArticle = connect(mapAllStateToProps, mapDispathToCreateArticle)(CreateArticle_UI)

class App extends React.Component {
  componentWillMount () {
    let { refresh } = this.props
    refresh()
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <HeaderNav></HeaderNav>
        </Header>
        <Content>
          <Layout style={{ minHeight: '90vh' }}>
            <SiderNav></SiderNav>
            <Layout style={{ padding: '15px' }}>
              <Content>
                <Switch>
                  <Route path='/WorkTable/separate-words' component={ SeparateWords }></Route>
                  <Route path='/WorkTable/mark-entity' component={ MarkEntity }></Route>
                  <Route path='/WorkTable/separate-words-property' component={ SeparateWordsProperty }></Route>
                  <Route path='/WorkTable/create-article' component={ CreateArticle }></Route>
                </Switch>
              </Content>
              <FooterBtn></FooterBtn>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default connect(null, mapDispatchToApp)(App) 