import React, {createContext} from 'react';
import { useSetState } from 'react-use';

export const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  isNewUser: false,
  loginError: null
}

export const ContextProvider = props => {
  const [state, setState] = useSetState(initialState);

  const setLoginPending = (isLoginPending) => setState({isLoginPending});
  const setLoginSuccess = (isLoggedIn) => setState({isLoggedIn});
  const setNewUser= (isNewUser) => setState({isNewUser});
  const setLoginError = (loginError) => setState({loginError});

  const login = (email, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);
    setNewUser(false);

    fetchLogin( email, password, error => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    })
  }

  const signUp = (email, password, displayname) =>{
    setLoginPending(false);
    setLoginSuccess(true);
    setLoginError(null);
    setNewUser(true);
}


  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setNewUser(false);
    setLoginError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        signUp,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
// fake login
const fetchLogin = (email, password, callback) => 
  setTimeout(() => {
    if (email != " " && password != " ") {
      return callback(null);
    } else {
      return callback(new Error('Invalid email and password'));
    }
  }, 1000);

  export default AuthContext;