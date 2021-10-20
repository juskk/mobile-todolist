import React from 'react';
import SignupForm from './Forms/SignupForm';
import LoginForm from './Forms/LoginForm';

interface IProps {
  type: string,
  params?: {setLogedIn: (isLogged: boolean) => void}
}

const AuthForm: React.FC<IProps> = (props) => {
  if (props.type === 'signup') {
    return <SignupForm type="signup"/>
  }

  return <LoginForm type="login" setLogedIn={() => props.params?.setLogedIn(true)}/>
}


export default AuthForm;
