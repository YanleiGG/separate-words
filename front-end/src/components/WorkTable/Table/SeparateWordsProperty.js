
import Table_UI from './Table.js'
import { refresh } from '../../../util'
import store from '../../../state/store'
import { connect } from "react-redux";

let mapStateToSeparateWordsProperty = state => {
  return {
    ...state,
    article: state.showArticle.separateWordsProperty
  }
}

let mapDispathToSeparateWordsProperty = dispatch => {
  return {
    handleCancel: () => {
      dispatch({ type: 'CLOSE_PROPERTY_MODAL' })
    },
    radioOnChange: (e) => {
      dispatch({
        type: 'SET_RADIO_VALUE',
        radioValue: e.target.value
      })
    },
    pageChange: async (page) => {
      dispatch({ type: "SET_PAGE", page })
      refresh(dispatch)
    },
    handleOk: () => {
      let start = store.getState().selection.start
      let end = store.getState().selection.end
      let data = store.getState().showArticle.separateWordsProperty
      let type = store.getState().radioValue
      for (let i = start;i < end;i++) {
        data[i].type = type
      }
      if (data[start-1] && data[start-1].content != '|') {
        data.splice(start, 0, { id: null, content: '|', type: '0' })
        start ++
        end ++
      }
      if (data[end] && data[end].content != '|') {
        data.splice(end, 0, { id: 1, content: '|', type: '0' })
      }
      for (let i = end-1;i >= start;i--) {
        if (data[i] && data[i].content == '|') data.splice(i, 1)
      }
      dispatch({ type: 'CLOSE_PROPERTY_MODAL' })
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
        if (selectedContent == '|') return
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

export default connect(mapStateToSeparateWordsProperty, mapDispathToSeparateWordsProperty)(Table_UI)