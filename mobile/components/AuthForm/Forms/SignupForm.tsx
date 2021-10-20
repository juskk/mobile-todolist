import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TextInput, Button, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { useMutation } from 'react-query';
import globalStyles, { mainColor } from '../../../styles/globalStyles';
import { SignUpValidation } from '../../../validation/user.validation';
import { signUp } from '../../../service/http.service';
import { StackActions, useNavigation } from '@react-navigation/native';

interface IProps {
  type: string,
}

const SignupForm: React.FC<IProps> = (props) => {
  const [errorMessage, setErrorMessage] = React.useState('')
  const { mutateAsync, isLoading, isError } = useMutation(signUp);
  const navigation: any = useNavigation()

  const toSIgnUp = async (info: {email: string, password: string}) => {
    try {
      const data = await mutateAsync(info)
      navigation.dispatch(
        StackActions.replace('Log In')
      )
    } catch(e) {
      setErrorMessage(e.message)
    }
  }

  const signUpValues = { email: '', password1: '', password2: '' };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={signUpValues}
          validationSchema={SignUpValidation}
          onSubmit={(values: any) => { toSIgnUp({email: values.email, password: values.password1}) }}
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
              <View style={styles.inputBlock}>
                <Text style={globalStyles.boldText}>Enter your password:</Text>
                <TextInput
                  onChangeText={handleChange('password1')}
                  onBlur={handleBlur('password1')}
                  value={values.password1}
                  style={globalStyles.input}
                  secureTextEntry={true}
                />
                <Text style={styles.errorText}>{errors.password1 ? errors.password1 : null}</Text>
              </View>
              <View style={styles.inputBlock}>
                <Text style={globalStyles.boldText}>Verify you password:</Text>
                <TextInput
                  onChangeText={handleChange('password2')}
                  onBlur={handleBlur('password2')}
                  value={values.password2}
                  style={globalStyles.input}
                  secureTextEntry={true}
                />
                <Text style={styles.errorText}>{errors.password2 ? errors.password2 : null}</Text>
              </View>
              {!isLoading 
              ? <Button onPress={handleSubmit} title="SIGN UP" />
              : <ActivityIndicator size="large" color={mainColor}/>}
              <Text style={styles.errorbold}>{errorMessage}</Text>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignupForm

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

