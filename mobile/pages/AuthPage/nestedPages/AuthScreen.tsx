import React from 'react';
import {
  Button, StyleSheet, Text, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthScreen: React.FC = () => {
  const navigation: any = useNavigation();
  
  const changeScreen = (path: string) => {
    navigation.navigate(path);
  };

  return (
    <View style={styles.container}>
      <Button title="log in" onPress={() => changeScreen('Log In')}/>
      <Button title="sign up" onPress={() => changeScreen('Sign Up')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthScreen;
