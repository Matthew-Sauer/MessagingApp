


import React from 'react';
import {auth} from '../../firebase';
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import { Button } from 'reactstrap';
import ConvoItem from './ConvoItem.js';
import ConvoNew from './ConvoNew.js';
import ConvoViewActions from './ConvoViewActions.js';

function Header(props) {
  return (
    <header id="header">
      <h1>Messages</h1>
      <ConvoNew />
    </header>
  );
}

 function Main(props) {
  if (props.convos.length > 0) {
    const temp = props.convos
    const convoNav = props.convos.map((convo) => {
        return (
            <Tab
              key={convo.id}
            >
              {convo.displayName}
            </Tab>

        )
      });

    const convContent = temp.map((convo) => {
      return ( 
          <TabPanel key={convo.id}>
            <ConvoItem 
              convoId={convo.rid}
              convoMessages={convo.messages}
              convoDisplayName={convo.displayName}
              convoPeople={convo.people}
            />
          </TabPanel>
        )
    });

      return (
        <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
          <TabList>
            {convoNav}
          </TabList>
          {convContent}
        </Tabs>
      ); 
    } else {
      return (<h3>no convos</h3>);
    }
}

function Footer(props) {
  return (
    <footer id="footer">
    </footer>
  );
}

function ConvoView(props) {
  return (
    <div>
      <Header {...props} />
      <Main {...props} />
      <Footer {...props} />
    </div>
  );
}



export default ConvoView;