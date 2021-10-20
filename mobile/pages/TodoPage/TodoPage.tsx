import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import TodosScreen from './nestedPages/TodosScreen';
import SelectedTodoScreen from './nestedPages/SelectedTodoScreen';
import Icon from '../../UI/Icon';
import FullTodoPage from './nestedPages/FullTodoPage';
import { mainColor } from '../../styles/globalStyles';

const TodoPage: React.FC = () => {
  const [loged, setLoged] = React.useState<any>(null)
  const isFocused = useIsFocused();
  if (isFocused) {
    checkToken()
  }
  
  async function checkToken () {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLoged(true)
    } else {
      setLoged(false)
    }
  };

  const navigateToTodo = () => {
    navigation.navigate('SelectedTodo', { type: 'add', title: 'Add todo' })
  }

  const TodoStack = createNativeStackNavigator();
  const navigation: any = useNavigation();

  let headerRight: any = loged 
  ? (
      <TouchableOpacity onPress={navigateToTodo}>
        <Icon name="add-outline" color="white" />
      </TouchableOpacity>
    )
  : null

  if (loged === null) return <View><Text>loading</Text></View>
  return (
    <TodoStack.Navigator screenOptions={{
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: mainColor,
      },
    }}
    >
      <TodoStack.Screen
        name="Todos"
        component={TodosScreen}
        options={{
          headerRight: () => headerRight,
        }}
      />
      <TodoStack.Screen
        name="SelectedTodo"
        component={SelectedTodoScreen}
        options={({ route }: any) => ({
          title: route.params.title,
        })}
      />
      <TodoStack.Screen
        name="FullTodo"
        component={FullTodoPage}
        options={({ route }: any) => ({
          title: route.params.title,
        })}
      />
    </TodoStack.Navigator>
  );
};

export default TodoPage;
