import React, { Component } from 'react'

class Toolbar extends Component {

  state = {
    label: ''
  }
  
  updateAllMsgIcon = (list) => {
    const selectedCount = list.filter(message => message.isSelected === true).length

    if (selectedCount > 0 && selectedCount < list.length) {
      return "fa fa-minus-square-o"
    }
    if (selectedCount === list.length) {
      return "fa fa-check-square-o"
    }
    else {
      return "fa fa-square-o"
    }
  }

  handleAllMsgToggle = () => {
    const { onAllMessageToggle, messageList } = this.props
    onAllMessageToggle(messageList)
  }

  handleMarkAsRead = () => {
    const { onMarkAsRead, messageList } = this.props
    const selectedMsgsIDs = messageList.filter(msg => msg.isSelected === true).map(msg => msg.id)
    onMarkAsRead(selectedMsgsIDs)
  }

  handleMarkAsUnread = () => {
    const { onMarkAsUnread, messageList } = this.props
    const selectedMsgsIDs = messageList.filter(msg => msg.isSelected === true).map(msg => msg.id)
    onMarkAsUnread(selectedMsgsIDs)
  }

  handleApplyLabel = (e) => {
    e.preventDefault()
    const { onApplyLabel, messageList } = this.props

    const label = e.target.value
    const selectedMsgsIDs = messageList.filter(msg => msg.isSelected === true).map(msg => msg.id)
    onApplyLabel(selectedMsgsIDs, label)

    this.setState({ value: "" })
  }

  handleRemoveLabel = (e) => {
    e.preventDefault()
    const { onRemoveLabel, messageList } = this.props

    const label = e.target.value
    const selectedMsgsIDs = messageList.filter(msg => msg.isSelected === true).map(msg => msg.id)
    onRemoveLabel(selectedMsgsIDs, label)

    this.setState({ value: "" })
  }

  handleMsgDelete = () => {
    const { onMsgDelete, messageList } = this.props
    const selectedMsgsIDs = messageList.filter(msg => msg.isSelected === true).map(msg => msg.id)

    onMsgDelete(selectedMsgsIDs)
  }

  handleComposeMsgBtn = () => {
    const { composeFormOpen, updateComposeMsgState } = this.props
    composeFormOpen ? updateComposeMsgState(false) : updateComposeMsgState(true)
  }

  render() {
    const { messageList } = this.props
    const unreadCount = messageList.filter(message => message.read !== true).length
    const msgsSelected = messageList.filter(message => message.isSelected === true).length

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadCount}</span>
            {unreadCount === 1 ? "unread message" : "unread messages"}
          </p>

          <a onClick={this.handleComposeMsgBtn} className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

          <button onClick={this.handleAllMsgToggle} className="btn btn-default">
            <i className={this.updateAllMsgIcon(messageList)}></i>
          </button>

          <button onClick={this.handleMarkAsRead} className="btn btn-default" disabled={msgsSelected ? "" : "disabled"}>
            Mark As Read
          </button>

          <button onClick={this.handleMarkAsUnread} className="btn btn-default" disabled={msgsSelected ? "" : "disabled"}>
            Mark As Unread
          </button>

          <select value={this.state.value} onChange={this.handleApplyLabel} className="form-control label-select" disabled={msgsSelected ? "" : "disabled"}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select value={this.state.value} onChange={this.handleRemoveLabel} className="form-control label-select" disabled={msgsSelected ? "" : "disabled"}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button onClick={this.handleMsgDelete} className="btn btn-default" disabled={msgsSelected ? "" : "disabled"}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}


export default Toolbar