import * as React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import { refresh } from '../../util'
import HeaderNav from './HeaderNav'
import CreateArticle from './CreateArticle'
import ClassList from './ClassList'
import SeparateWords from './Table/SeparateWords'
import MarkWordsProperty from './Table/SeparateWordsProperty'
import MarkEntity from './Table/MarkEntity'
import Emotion from './Emotion/Emotion'

const { Header, Content } = Layout;

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
            <Layout>
              <Switch>
                <Route path='/WorkTable/separate-words' component={ SeparateWords }></Route>
                <Route path='/WorkTable/mark-entity' component={ MarkEntity }></Route>
                <Route path='/WorkTable/separate-words-property' component={ MarkWordsProperty }></Route>
                <Route path='/WorkTable/class-list' component={ ClassList }></Route>
                <Route path='/WorkTable/create-article' component={ CreateArticle }></Route>
                <Route path='/emotion' component={ Emotion }></Route>
              </Switch>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

let mapAllStateToProps = state => {
  return state
};
let mapDispatchToApp = dispatch => {
  return {
    refresh: () => refresh(dispatch)
  }
}

export default connect(mapAllStateToProps, mapDispatchToApp)(App) 