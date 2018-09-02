import React, { Component } from 'react';


import ConvoViewActions from './ConvoViewActions.js';
import ConvoAddParticipant from './ConvoAddParticipant.js';


class ConvoItem extends Component {
  constructor(props) {
    super(props);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }

  componentDidMount() {
  }

  onSubmitMessage(e) {
    e.preventDefault();
    const message = e.target.message.value;

    if(!message.trim()) {
      e.target.submit.diabled = true;
      return;
    }
    ConvoViewActions.doAddText(this.props.convoId, message);
    e.target.reset();
  }

  onAddParticipant(uid) {
    ConvoViewActions.doAddParticipant(this.props.convoId, uid);
  }




  render() {
    let messages = (<h3>No messages</h3>);
    const messageInput = this.props.convoMessages;
    if(messageInput.length > 0) {
        messages = messageInput.map((message) =>
        <li key={message.key}>
          {message.value.text}
        </li>
        );
    }
    return (
      <div>
      <ConvoAddParticipant 
        rid={this.props.convoId}
      />
        <h1>{this.props.convoDisplayName}</h1>
        <ul>{messages}</ul>
        <form onSubmit={this.onSubmitMessage} autoComplete="off" id="message-form">
          <input type="text" name="message" className="text-input" placeholder="Send message" autoFocus />
          <button name="submit" className="login-button">Send</button>
        </form>
      </div>
    );
  }
}


export default ConvoItem;