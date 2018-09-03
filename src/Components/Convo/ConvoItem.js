import React, { Component } from 'react';

import {db} from '../../firebase';
import ConvoViewActions from './ConvoViewActions.js';
import ConvoAddParticipant from './ConvoAddParticipant.js';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


class ConvoItem extends Component {
  constructor(props) {
    super(props);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getName = this.getName.bind(this);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.getUsers();
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

  getUsers() {
    db.onceGetUsers().then((snapshot)  => {
      let value = snapshot.val();
      this.setState({
        users: value
      });
    });
  }

  getName(uid) {
    let name = this.state.users[uid];
    if (name) {
      return name.username;
    }
    return uid;
  }

  render() {
    let messages = (<i>No messages</i>);
    const messageInput = this.props.convoMessages;
    if(messageInput.length > 0) {
        messages = messageInput.map((message) =>
        <ListItem key={message.key}>
          <ListItemAvatar>
            <Avatar>
              {this.getName(message.value.sender.rid)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={message.value.text}
            secondary={this.getName(message.value.sender.rid)}
          />
        </ListItem>
        );
    }

    return (
      <div>
        <ConvoAddParticipant 
          rid={this.props.convoId}
        />
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {this.props.convoDisplayName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper>
          <List
            style={{maxHeight: 600, overflow: 'auto'}}
          >
            {messages}
          </List>
        </Paper>
        <form onSubmit={this.onSubmitMessage} autoComplete="off" id="message-form">
          <input type="text" name="message" className="text-input" placeholder="Send message" autoFocus />
          <button name="submit" className="login-button">Send</button>
        </form>
      </div>
    );
  }
}


export default ConvoItem;