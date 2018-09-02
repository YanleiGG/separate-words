
import Table_UI from './Table.js'
import { refresh, getType } from '../../../util'
import store from '../../../state/store'
import { connect } from "react-redux";

let mapStateToSeparateWords = state => {
  return {
    ...state,
    article: state.showArticle.separateWords
  }
}
let mapDispathToSeparateWords = dispatch => {
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
        if (selectedContent == '|') return
        let type = getType(data, store.getState().typeArr, start, end-1)
        let selection = store.getState().selection
        for (let i = selection.start;i < selection.end;i++) {
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
      }
    }
  };
};

export default connect(mapStateToSeparateWords, mapDispathToSeparateWords)(Table_UI)