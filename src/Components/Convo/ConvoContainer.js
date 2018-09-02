
import {Container} from 'flux/utils';
import ConvoViewActions from './ConvoViewActions';
import ConvoStore from './ConvoStore';
import ConvoView from './ConvoView';

function getStores() {
  return [
    ConvoStore
  ];
}

function getState() {
  return {
    convos: ConvoStore.getState(),
    onText: ConvoViewActions.addText,
    onAdd: ConvoViewActions.addConvo,
    onDeleteConvo: ConvoViewActions.deleteConvo,
  };
}

export default Container.createFunctional(ConvoView, getStores, getState);
