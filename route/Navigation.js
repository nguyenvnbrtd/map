import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../Screen/MainScreen';
import WelcomeScreen from '../Screen/WelcomeScreen';
import PointList from '../Screen/PointList';
// import Login from '../Screen/Login';
import PointInfo from '../Screen/PointInfo';



const Stack = createNativeStackNavigator();

const MyStack = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: 'Welcome' }, {headerMode: 'none'}, {headerShown: false}}
        />
        <Stack.Screen
          name="Map"
          component={MainScreen}
          options={{ title: 'Main' }, {headerMode: 'none'}, {headerShown: false}}
        />
        <Stack.Screen
          name="PointList"
          component={PointList}
          options={{ title: 'PointList' }, {headerMode: 'none'}, {headerShown: false}}
        />
        <Stack.Screen
          name="PointInfo"
          component={PointInfo}
          options={{ title: 'Point Information' } }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;