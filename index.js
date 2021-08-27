import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React from 'react';

import App from './App';
import { Provider } from 'react-redux';
import configureStore from './state/store/store';

const store = configureStore();

const RegionRedux = () => {
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
  
}
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(RegionRedux);
