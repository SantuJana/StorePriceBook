import { View, Text } from 'react-native'
import React from 'react';
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ShareData from './src/screens/ShareData';
import Backup from './src/screens/Backup';
import Icon from 'react-native-vector-icons/AntDesign';
import AddUnit from './src/screens/AddUnit';
import RestoreData from './src/screens/RestoreData';

const App = () => {

  const Drawer = createDrawerNavigator();

  return (
    <Provider store={store} >
      <NavigationContainer  >
        <Drawer.Navigator
          initialRouteName='Home'
          screenOptions={{
            drawerActiveBackgroundColor: '#b3e5d3',
            drawerActiveTintColor: '#2d8665',
            headerTintColor: '#194d3a',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#b3e5d3',

            }
          }}
        >
          <Drawer.Screen name='Home' component={Home} options={{
            header: () => null,
            drawerIcon: ({ focused, size }) => (
              <Icon name="home" size={focused ? size + 10 : size} color={focused ? '#2d8665' : '#697689'} />
            )
          }} />

          <Drawer.Screen name='Units' component={AddUnit} options={{
            drawerIcon: ({ focused, size }) => (
              <Icon name='bars' size={focused ? size + 10 : size} color={focused ? '#2d8665' : '#697689'} />
            )
          }} />

          <Drawer.Screen name='Share Data' component={ShareData} options={{
            drawerIcon: ({ focused, size }) => (
              <Icon name='sharealt' size={focused ? size + 10 : size} color={focused ? '#2d8665' : '#697689'} />
            )
          }} />

          <Drawer.Screen name='Backup' component={Backup} options={{
            drawerIcon: ({ focused, size }) => (
              <Icon name='clouduploado' size={focused ? size + 10 : size} color={focused ? '#2d8665' : '#697689'} />
            )
          }} />

          <Drawer.Screen name='Restore' component={RestoreData} options={{
            drawerIcon: ({ focused, size }) => (
              <Icon name='fork' size={focused ? size + 10 : size} color={focused ? '#2d8665' : '#697689'} />
            )
          }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App