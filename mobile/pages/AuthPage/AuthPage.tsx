import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './nestedPages/AuthScreen';
import { mainColor } from '../../styles/globalStyles';
import LoginScreen from './nestedPages/LoginScreen';
import SignupScreen from './nestedPages/SignupScreen';
import { useRoute } from '@react-navigation/native';

const AuthPage: React.FC = () => {
  const UserStack = createNativeStackNavigator();

  const { params: { logedin, setLogedIn } }: any = useRoute();
  
  const navigationStyles = {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: mainColor,
    },
  };

  return (
    <UserStack.Navigator screenOptions={navigationStyles}>
      <UserStack.Screen name="Authenticate" component={AuthScreen} />
      <UserStack.Screen name="Log In" component={LoginScreen} initialParams={{ logedin: logedin, setLogedIn: setLogedIn }}/>
      <UserStack.Screen name="Sign Up" component={SignupScreen} />
    </UserStack.Navigator>
  );
};

export default AuthPage;