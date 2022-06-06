import React from 'react';
import DOMPurify from 'dompurify';
import './Message.css';
import phone from "../icons/contact.png"


const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

    return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
            <div id="currsender" className="messageBox backgroundBlue" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}></div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
            )
  );
}

export default Message;