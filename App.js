import React from 'react';
import MainContainer from './navigation/MainContainer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import friendsReducer from './FriendsReducer';

const store = createStore(friendsReducer);

function App(){
  return(
    <Provider store={store}>
      <MainContainer/>
    </Provider>
  );
}

export default App;