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
import axios from 'axios'

const { Header, Content } = Layout;

// 组件的状态传递还没有优化好
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

// 初始化 & 更新
let mapDispatchToApp = dispatch => {
  return {
    refresh: async () => {
      let state = store.getState()
      let res = await axios.get(`${state.path}/api/article?offset=${(state.page-1)*10}&pageSize=10`)
      let articles = res.data.articles.map(item => {
        return {
          ...item,
          separateWords: util.unformatWithoutProperty(item.content, item.separateWords, state.typeArr),
          separateWordsProperty: util.unformatWithoutProperty(item.content, item.separateWordsProperty, state.typeArr),
          markEntity: util.unformatWithoutProperty(item.content, item.markEntity, state.typeArr)
        }
      })
      dispatch({
        type: "SET_ARTICLES",
        articles
      })
    }
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
      let groupIndex = 0
      if (data[start-1]) groupIndex = data[start-1].type == type ? data[start-1].groupIndex + 1 : 0 
      for (let i = start;i < end;i++) {
        data[i].type = type
        data[i].groupIndex = groupIndex
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
      article.separateWordsProperty = util.formatWithoutProperty(article.separateWordsProperty)
      article.markEntity = util.formatWithoutProperty(article.markEntity)
      console.log(article)
      let res = await axios.put('http://localhost:3000/api/article', article)
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('Save Successed!', 1.5)
      } else {
        message.error('Save defeat!', 1.5)
      }
  }
  }
}
let mapDispatchToSiderNav = dispatch => {
  return {
    handleClick: id => {
      let state = store.getState()
      let showArticle = state.articles.find(item => item.id == id)
      dispatch({ type: "SET_SHOWARTICLE", showArticle })
    }
  }
}

let SeparateWordsProperty = connect(mapStateToSeparateWordsProperty, mapDispathToSeparateWordsProperty)(Main_UI)
let SeparateWords = connect(mapStateToSeparateWords, mapDispathToSeparateWords)(Main_UI)
let MarkEntity = connect(mapStateToMarkEntity, mapDispathToMarkEntity)(Main_UI)
let SiderNav = connect(mapAllStateToProps, mapDispatchToSiderNav)(SiderNav_UI)
let FooterBtn = connect(mapAllStateToProps, mapDispathToFooterBtn)(FooterBtn_UI)

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