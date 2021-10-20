import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthForm from '../../../components/AuthForm/AuthForm';

const SignupScreen: React.FC = () => (
  <View style={styles.container}>
    <AuthForm type="signup" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignupScreen;
