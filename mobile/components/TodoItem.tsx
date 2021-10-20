import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator,
} from 'react-native';
import { useMutation, useQueryClient } from 'react-query';

import { deleteTodo } from '../service/http.service';
import { mainColor } from '../styles/globalStyles';
import Icon from '../UI/Icon';

interface IProps {
    title: string,
    description: string,
    completed: boolean,
    isPublic: boolean,
    year: number,
    id: any,
}

const TodoItem: React.FC<IProps> = ({
  title, description, completed, isPublic, year, id,
}) => {
  const navigation: any = useNavigation();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(deleteTodo);

  const navigationProps: {} = {
    title, description, completed, isPublic, year, type: 'edit', id,
  }

  const removeTodo = async () => {
    await mutateAsync(id);
    queryClient.invalidateQueries('todos');
  };

  const goToFullTodoPage = () => {
    navigation.navigate('FullTodo', { id, title });
  };

  const goToSelectedTodoPage = () => {
    navigation.navigate('SelectedTodo', navigationProps);
  };

  const todoCompleted = completed ? 'Completed' : 'Not completed';
  const todoPublic = isPublic ? 'Public' : 'Private';

  return (
    <TouchableWithoutFeedback onPress={goToFullTodoPage}>
      <View style={styles.wrapper}>
        <View style={styles.line} />

        <View style={styles.container}>
          <View style={styles.info}>
            <View>
              <Text style={styles.title}>
                {title}
                {' '}
                {year}
              </Text>
              <Text
                numberOfLines={5}
                ellipsizeMode="tail"
              >
                {description}
              </Text>
            </View>

            <View style={styles.statistic}>
              <Text>
                {todoCompleted}
                ,
                {todoPublic}
              </Text>
            </View>
          </View>

          {!isLoading
            ? (
              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={goToSelectedTodoPage}
                  style={styles.touchableDiv}
                >
                  <View>
                    <Icon name="create-outline" style={styles.icon} />
                    <Text style={styles.buttonText}>Edit</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={removeTodo} style={styles.touchableDiv}>
                  <View>
                    <Icon name="trash-outline" style={styles.icon} />
                    <Text style={styles.buttonText}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
            : (
              <View style={styles.buttons}>
                <Text>
                  {' '}
                  <ActivityIndicator color={mainColor} size="large" />
                  {' '}
                </Text>
              </View>
            )}
        </View>
      </View>

    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: '100%', alignItems: 'center' },
  line: {
    width: 75, height: 2, backgroundColor: 'black', marginBottom: -10,
  },
  container: {
    maxWidth: '94%',
    width: '100%',
    height: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  info: {
    maxWidth: '74%',
    width: '100%',
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  title: { marginBottom: 10, fontWeight: '600' },
  description: {},
  statistic: { marginBottom: 10 },
  buttons: {
    maxWidth: '26%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 11,
    textAlign: 'center',
  },
  touchableDiv: {
    height: 50
  },
  icon: {
    margin: 7
  }
});

export default TodoItem;
