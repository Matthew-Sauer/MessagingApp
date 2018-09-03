import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import {db} from '../../firebase';

import ConvoViewActions from './ConvoViewActions';

const dataSource2 = ['12345', '23456', '34567'];


// TODO: implement a search to allow us to look for names

export default class ConvoAddParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.getUID = this.getUID.bind(this);
  }

  componentDidMount() {
    db.onceGetUsers().then((snapshot)  => {
      let value = snapshot.val();
      let namesArr = [];
      let backward = [];
      for (var personKey in value) {
        namesArr.push(value[personKey].email);
        backward.push({key: value[personKey].email, value: personKey});
        // namesArr.push(personKey);
      }
      this.setState ({
        users: value,
        names: namesArr,
        backward
      });

    });
  }

  getUID(searchText) {
    var found = this.state.backward.find(function(element) {
      return element.key === searchText;
    });
    return found.value;
  }



  handleNewRequest(searchText) {
    const uid = this.getUID(searchText);
    ConvoViewActions.doAddParticipant(uid, this.props.rid);
  }


  render() {
    return (
      <div>

        {this.state && 
          <AutoComplete
            onNewRequest={this.handleNewRequest}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={this.state.names}
            hintText="add participant"
          />
        }
      </div>
    );
  }
}
