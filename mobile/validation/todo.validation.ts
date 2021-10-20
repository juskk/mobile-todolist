import * as Yup from 'yup';

const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(10, 'Too Short!')
    .max(500, 'Too Long!')
    .required('Required'),
  year: Yup.number()
    .required('Required')
});

export default TodoSchema