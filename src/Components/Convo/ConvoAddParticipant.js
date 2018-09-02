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

  }

  componentDidMount() {
    db.onceGetUsers().then((snapshot)  => {
      let value = snapshot.val();
      let namesArr = [];
      for (var personKey in value) {
        // namesArr.push(value[personKey].username);
        namesArr.push(personKey);
      }
      this.setState ({
        users: value,
        names: namesArr
      });

    });
  }


  handleNewRequest = (searchText) => {
    ConvoViewActions.doAddParticipant(searchText, this.props.rid);
  };



  render() {
    return (
      <div>
        {this.state && 
          <AutoComplete
            onNewRequest={this.handleNewRequest}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={this.state.names}
            hintText="text-value data"
          />
        }
      </div>
    );
  }
}
