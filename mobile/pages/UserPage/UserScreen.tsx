import React from 'react';
import {
  Text, View, Button, StyleSheet, LogBox 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const UserScreen = () => {
  const { setLogedIn }: any = useRoute().params;

  const removeToken = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    setLogedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text>
        <Button title="logout" onPress={removeToken} />
      </Text>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
