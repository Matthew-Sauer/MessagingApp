import React from 'react';

import AuthUserContext from './AuthUserContext';
import ConvoViewActions from './Convo/ConvoViewActions.js';
import { auth, firebase } from '../firebase';

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.setState({ authUser })
          ConvoViewActions.doGetConvos(authUser.uid);
        } else {
          this.setState({ authUser: null });
        }
      });
    }

    render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }

export default withAuthentication;