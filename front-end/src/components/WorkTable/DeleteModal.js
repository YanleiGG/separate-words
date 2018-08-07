import { Modal, Button } from 'antd';

const confirm = Modal.confirm;

function showConfirm() {
  confirm({
    title: '确认删除吗?',
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

class DeleteModal extends React.Component {
  render () {
    return (
      <div>
        <Button onClick={showConfirm}>
          Confirm
        </Button>
      </div>
    )
  }
}

export default DeleteModal