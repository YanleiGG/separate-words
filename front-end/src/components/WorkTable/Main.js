import * as React from "react";
import { Modal, Radio } from "antd";

const RadioGroup = Radio.Group;

class Navigation extends React.Component {
  render() {
    let { article, color, selection, visible, handleOk, handleCancel, pickWords, radioOnChange, radioValue, wordsType } = this.props 

    return (
      <div>
        <div onMouseUp={ pickWords } style={{ fontSize: 20 + 'px' } }>
          { 
            article.map((i, index) => {
              return <span key={index} id={index} style={{color: color[i.type]}}>{ i.content }</span>
            })
          }
        </div>
        <Modal
          title={ selection.content }
          visible={ visible }
          onOk={ handleOk }
          onCancel={ handleCancel }
        >
          <RadioGroup onChange={radioOnChange} value={radioValue}>
            { 
              wordsType.map((i, index) => {
                return <Radio value={index} key={index}>{ i }</Radio>
              }) 
            }
          </RadioGroup>
        </Modal>        
      </div>
    )
  }
}

export default Navigation