import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Text } from 'react-native';
import TodoItem from './TodoItem';

interface IProps {
    todos: any,
}

const TodoContainer: React.FC<IProps> = ({ todos }) => {
  if (todos.length === 0) return <View><Text>no todos</Text></View>
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }: any) => (
          <TodoItem
            title={item.title}
            description={item.description}
            completed={item.completed}
            isPublic={item.public}
            year={item.year}
            id={item._id}
          />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListStyles}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  flatListStyles: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 10,
  }
});

export default TodoContainer;
