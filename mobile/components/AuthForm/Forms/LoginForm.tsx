import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TextInput, Button, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles, { mainColor } from '../../../styles/globalStyles';
import { LogInValidation } from '../../../validation/user.validation';
import { logIn } from '../../../service/http.service';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  type: string,
  setLogedIn: () => void
}

const LoginForm: React.FC<IProps> = (props) => {
  const [errorMessage, setErrorMessage] = React.useState('')
  const { mutateAsync, isLoading, isError } = useMutation(logIn);
  const navigation: any = useNavigation()

  const toLogIn = async (info: { email: string, password: string }) => {
    try {
      const data = await mutateAsync(info)
      AsyncStorage.setItem('token', data.token)
      AsyncStorage.setItem('id', data.id)
      props.setLogedIn()
      navigation.navigate('Todo')
    } catch(e) {
      setErrorMessage(e.message);
    }
  }

  const logInValues = { email: 'admin@gmail.com', password: 'password' }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={logInValues}
          validationSchema={LogInValidation}
          onSubmit={(values: any) => { toLogIn({email: values.email, password: values.password}) }}
        >
          {({
            handleChange, handleBlur, handleSubmit, values, errors,
          }: any) => (
            <View style={styles.container}>
              <View style={styles.inputBlock}>
                <Text style={globalStyles.boldText}>Enter your email:</Text>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={globalStyles.input}
                />
                <Text style={styles.errorText}>{errors.email ? 'Not valid email' : null}</Text>
              </View>
              <View>
                <Text style={globalStyles.boldText}>Enter your password:</Text>
                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={globalStyles.input}
                  secureTextEntry
                />
                <Text style={styles.errorText}>{errors.password ? errors.password : null}</Text>
              </View>
              {!isLoading
              ? <Button onPress={handleSubmit} title="LOG IN" />
              : <ActivityIndicator size="large" color={mainColor}/>}
              <Text style={styles.errorbold}>{errorMessage}</Text>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginForm

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
    height: 20
  },
  errorbold: {
    color: 'red',
    height: 20,
    fontWeight: '600'
  },
  buttonHover: {
    marginVertical: 10,
  },
});

