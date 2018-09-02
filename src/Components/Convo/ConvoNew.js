import React, { Component } from 'react';

import ConvoViewActions from './ConvoViewActions.js';
import {auth} from '../../firebase'


class ConvoNew extends Component {

  componentDidMount() {

  }

  onSubmit = (e) => {
    console.log(auth.getCurrentUser().uid);
    e.preventDefault();
    const id = e.target.id.value;
    const displayname = e.target.displayname.value;

    if(!id.trim()) {
      e.target.submit.diabled = true;
      return;
    }
    ConvoViewActions.doAddConvo(displayname, [auth.getCurrentUser().uid]);
    e.target.reset();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} autoComplete="off" id="message-form">
          <input type="text" name="id" className="text-input" placeholder="convo id" autoFocus />
          <input type="text" name="displayname" className="text-input" placeholder="Room name" autoFocus />
          <button name="submit" className="login-button">Send</button>
        </form>
      </div>
    );
  }
}


export default ConvoNew;