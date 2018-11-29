import React from 'react'
import Message from './message'

const MessageList = ({ messageList, onMessageSelect, onStarSelect }) => {
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
            />
          )
        })
      }
    </div>
  )
} 

export default MessageList
