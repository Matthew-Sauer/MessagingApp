

import ConvoActionTypes from './ConvoActionTypes';
import Dispatcher from '../../Dispatcher';
import {db, auth, firebase} from '../../firebase/';

const ConvoViewActions = {
  addText(rid, message) {
    Dispatcher.dispatch({
      type: ConvoActionTypes.ADD_TEXT,
      message,
      rid,
    });
  },

  deleteConvo(id) {
    Dispatcher.dispatch({
      type: ConvoActionTypes.DELETE_CONVO,
      id,
    });
  },

  addConvo(id, displayName, people, messages = []) {
    Dispatcher.dispatch({
      type: ConvoActionTypes.ADD_CONVO,
      room: { id,
              displayName,
              people,
              messages }
    });
  },

  doAddConvo(displayName, people, messages = []) {
    // Add the convo to firebase
    const rid = db.doPushConvo(displayName, people, messages);
    const key = rid.key
    // Add the room id to each of the people's rooms
    if (people) {
      people.forEach((person) => {
        db.doAddRoomToParticipant(person, key);
      });
    }

    // show the room locally
    Dispatcher.dispatch({
      type: ConvoActionTypes.ADD_CONVO,
      room: { key,
              displayName,
              people,
              messages }
    });
  },

  startListening(rid) {
    db.startListening(rid)
  },

  doSetStart() {
    const uid = auth.currentUser.uid;
    db.ref(`users/${uid}`).once('value', (snapshot) => {
      if(snapshot.val()) {
        const convos = snapshot.val().convos;
        convos.forEach((rid) => {
          this.startListening(rid);
          db.ref(`convos/${rid}`).once('value', (snapshot) => {
              const convo = snapshot.val();
              let peopleArray = [], messagesArray = [];
              const displayName = convo.displayName;
              for (var peopleKey in convo.people) {
                peopleArray.push(convo.people[peopleKey]);
              }

              for (var messagesKey in convo.messages) {
                messagesArray.push({ ...convo.messages[messagesKey]});
              }

              this.addConvo(rid, displayName, peopleArray, messagesArray);
            });
        })
      }
    });
  },

  doAddText(rid, text) {
    const uid = auth.getCurrentUser().uid;
    const displayName = auth.getCurrentUser().displayName;
    const message1 = {
      sender: { uid, displayName },
      text,
      createdAt: Date.now()
    };
    const id = db.doAddText(rid, message1);
    // Dispatcher.dispatch({
    //   type: ConvoActionTypes.ADD_TEXT,
    //   message: {
    //     key:id, value: message1
    //   },
    //   rid,
    // });

  },

  doGetConvos(uid) {
    let convo = db.onceGetUsers().then(function(snapshot) {
      let child = snapshot.child(`${uid}/convos`);
      child.forEach((convo) => {
        let cid = convo.val();
        db.doGetConvo(cid).then(function(snapshot) {
          let rid = snapshot.key;
          let convoVal = snapshot.val();
          let displayName = convoVal.displayName;
          let messagesobj = convoVal.convoMessages;
          let messages = []
          // if (messagesobj) {
          //   for (var messageKey in messagesobj) {
          //     messages.push({key:messageKey, value:messagesobj[messageKey]})
          //   }
          // }
          let people = convoVal.people;
          Dispatcher.dispatch({
            type: ConvoActionTypes.ADD_CONVO,
            room: { rid,
              displayName,
              messages,
              people
            }
          });
          ConvoViewActions.startListening(rid);
        });
      });
    });
  },

  doAddParticipant(uid, rid) {
    db.doAddRoomToParticipant(uid,rid);
  },

};

export default ConvoViewActions;















