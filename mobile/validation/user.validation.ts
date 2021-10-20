import * as Yup from 'yup';

export const LogInValidation = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Required'),
});

export const SignUpValidation = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password1: Yup.string()
    .min(6, 'Too Short!')
    .required('Required'),
  password2: Yup.string()
    .min(6, 'Too Short!')
    .required('Required')
    .oneOf([Yup.ref('password1'), null], 'Password dont match'),
});
