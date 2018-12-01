import React from 'react'
import Message from './message'

const MessageList = ({ messageList, onMessageSelect, onStarSelect, onMarkAsRead }) => {

  if (!messageList.length) {
    return (
      <div className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <h4>Inbox Empty <small>(or maybe the server isn't on...)</small></h4>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        {
          messageList.map((message, i) => {
            return (
              <Message
                key={i}
                message={message}
                onMessageSelect={onMessageSelect}
                onStarSelect={onStarSelect}
                onMarkAsRead={onMarkAsRead}
              />
            )
          })
        }
      </div>
    )
  }
} 

export default MessageList
