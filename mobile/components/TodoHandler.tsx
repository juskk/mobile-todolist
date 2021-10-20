import React from 'react';
import {
  Button, TextInput, View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQueryClient } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { updateTodo, addTodo } from '../service/http.service';
import Checkbox from '../UI/Checkbox';
import globalStyles, { mainColor } from '../styles/globalStyles';
import TodoSchema from '../validation/todo.validation';

const TodoHandler: React.FC = () => {
  const [userId, setUserId] = React.useState<string | null>('')
  const queryClient = useQueryClient();
  const navigation: any = useNavigation();
  const data: any = useRoute().params;
  const [isPublic, setPublic] = React.useState<boolean>(data.isPublic ? data.isPublic : false);
  const changePublicValue = () => {
    setPublic((prev) => !prev);
  };
  const [isCompleted, setCompleted] = React.useState<boolean>(data.completed ? data.completed : false);
  const changeCompletedValue = () => setCompleted((prev) => !prev);

  React.useEffect( () => {
    AsyncStorage.getItem('id')
    .then(id => setUserId(id))
    
  }, [] )

  const values: any = data.type === 'edit'
    ? { title: data.title, description: data.description, year: data.year.toString() }
    : { title: '', description: '', year: '' };

  const { mutateAsync, isLoading, isError } = useMutation(data.type === 'edit' ? updateTodo : addTodo);
 
  const toUpdateTodo = async (info: any) => {
    await mutateAsync({ ...info, createdBy: userId, id: data.id });
    queryClient.invalidateQueries('todos');
    navigation.navigate('Todos');
  };

  const toAddTodo = async (data: any) => {
    await mutateAsync({ ...data, createdBy: userId });
    queryClient.invalidateQueries('todos');
    navigation.navigate('Todos');
  };

  if (isLoading) return <ActivityIndicator color={mainColor} size="large" />;

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent} 
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={values}
          validationSchema={TodoSchema}
          onSubmit={(values: any) => {
            data.type === 'edit'
              ? toUpdateTodo({
                title: values.title, 
                description: values.description, 
                completed: isCompleted, 
                public: isPublic, 
                year: values.year,
              })
              : toAddTodo({
                title: values.title, 
                description: values.description, 
                completed: isCompleted, 
                public: isPublic, 
                year: values.year,
              });
          }}
        >
          {({
            handleChange, handleBlur, handleSubmit, values, errors,
          }: any) => (
            <View style={styles.container}>
              <View style={styles.inputBlock}>
                <Text style={globalStyles.boldText}>
                  Title<Text style={styles.errorText}>{errors.title ? `(${errors.title})` : null}</Text>
                </Text>
                <TextInput
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  style={globalStyles.input}
                />

              </View>
              <View style={styles.inputBlock}>
                <Text style={globalStyles.boldText}>
                  Description<Text style={styles.errorText}>{errors.description ? `(${errors.description})` : null}</Text>
                </Text>
                <TextInput
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  style={globalStyles.bigInput}
                  multiline
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={globalStyles.boldText}>
                  Year<Text style={styles.errorText}>{errors.year ? `(${errors.year})` : null}</Text>
                </Text>
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={handleChange('year')}
                  onBlur={handleBlur('year')}
                  value={values.year}
                  style={globalStyles.input}
                />
              </View>
              <View style={styles.checkboxDiv}>
                <Text style={globalStyles.boldText}>Public</Text>
                <Checkbox checked={isPublic} pressed={changePublicValue} />
              </View>
              <View style={styles.checkboxDiv}>
                <Text style={globalStyles.boldText}>Completed</Text>
                <Checkbox checked={isCompleted} pressed={changeCompletedValue} />
              </View>
              <View style={styles.buttonHover}>
                <Button onPress={handleSubmit} title={data.type === 'edit' ? 'Edit' : 'Add'} color={mainColor} />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TodoHandler;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
  },
  inputBlock: {
    marginVertical: 10,
  },
  checkboxDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: 5,
    width: 150,
  },
  errorText: {
    color: 'red',
  },
  buttonHover: {
    marginVertical: 10,
  },
});