

import {ReduceStore} from 'flux/utils';
import ConvoActionTypes from './ConvoActionTypes';
import Dispatcher from '../../Dispatcher';
import ConvoViewActions from './ConvoViewActions.js';

class ConvoStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case ConvoActionTypes.ADD_CONVO:
        return [...state, action.room];

      case ConvoActionTypes.DELETE_CONVO:
        return state.filter((convo) => {
          return convo.rid !== action.rid;
        });

      case ConvoActionTypes.ADD_TEXT:
        return state.map((room) => {
        if(room.rid === action.rid) {
          return {
            ...room,
            messages: [...room.messages, action.message]
          }
        }
        else {
          return room;
        }
      });

      default:
        return state;
    }
  }
}

export default new ConvoStore();
