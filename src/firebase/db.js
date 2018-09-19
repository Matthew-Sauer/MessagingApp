import { db } from './firebase';

import ConvoViewActions from '../Components/Convo/ConvoViewActions.js';
// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    roomIds: [],
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const getNamesArray = () =>
  db.ref('users').once('value').then()


export const doPushConvo = (displayName, people) => {
    // Add the convo to firebase
    const rid = db.ref('convos').push({
      displayName,
      messages: [],
      lastMessageTime: Date.now(),
    });

    return rid;
};

export const doAddRoomToParticipant = (uid, rid) => {
 	db.ref(`users/${uid}/convos`).push(rid);
};

export const startListening = (rid) => {
	console.log(rid);
    db.ref(`convos/${rid}/convoMessages`).on('child_added', (snapshot) => {

    	const val = snapshot.val();
    	console.log(val);
    	const user = val.sender.uid
    	const message = {
	      sender: { rid: user },
	      text: val.text,
	      createdAt: val.createdAt
	    }
	    console.log(snapshot.key);
    	ConvoViewActions.addText(rid, {
        	key:snapshot.key, value: message
      });
    })
  };

export const doGetConvo = (cid) =>
	db.ref(`convos/${cid}`).once('value');

// Other Entity APIs ...

export const doAddText = (cid, message) => {
	const mid = db.ref(`convos/${cid}/convoMessages`).push(message);
	return mid;
};

export const doRemoveRoomFromParticipant = (uid, rid) => {
	var convos = db.ref(`users/${uid}/convos`).orderByKey();

	convos.once('value', (snapshot) => {
		snapshot.forEach((childSnapshot) => {
			var key = childSnapshot.key;
			var value = childSnapshot.val();
			if(value === rid) {
				db.ref(`users/${uid}/convos/${key}`).remove();
			}
		});
	});
};



