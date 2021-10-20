import React from 'react';
import { View, StyleSheet } from 'react-native';
import TodoHandler from '../../../components/TodoHandler';

const SelectedTodoScreen: React.FC = () => (
  <View style={styles.container}>
    <TodoHandler />
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

export default SelectedTodoScreen;
