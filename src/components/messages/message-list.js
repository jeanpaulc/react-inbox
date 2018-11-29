import React from 'react'
import Message from './message'

const MessageList = ({ messageList, onMessageSelect }) => {
  return (
    <div>
      {
        messageList.map((message, i) => {
          return (
            <Message 
              key={i} 
              message={message}
              onMessageSelect={onMessageSelect} 
            />
          )
        })
      }
    </div>
  )
} 

export default MessageList
