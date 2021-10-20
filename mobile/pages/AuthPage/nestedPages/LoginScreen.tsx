import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthForm from '../../../components/AuthForm/AuthForm';

const LoginScreen: React.FC = () => {

  const params: any = useRoute().params

  return (
    <View style={styles.container}>
      <AuthForm params={params} type="login"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
