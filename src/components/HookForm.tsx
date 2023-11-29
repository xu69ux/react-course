import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { setHookFormData } from '../redux/formSlice';

import './HookForm.css';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z].*$/, 'First letter should be uppercase')
    .required('Name is required'),
  age: yup
    .number()
    .positive('Age should be a positive number')
    .required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  country: yup.string().required('Country is required'),
  terms: yup
    .bool()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
});

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  terms: boolean;
}
function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const onSubmit = (data: FormData) => {
    dispatch(setHookFormData(data));
  };

  return (
    <div className="container">
      <h1>Hook Form</h1>
      <form className="hook-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">name</label>
        <input type="text" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}

        <label htmlFor="age">age</label>
        <input type="number" {...register('age')} />
        {errors.age && <p>{errors.age.message}</p>}

        <label htmlFor="email">email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="password">password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor="confirmPassword">confirm password</label>
        <input type="password" {...register('password')} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <label htmlFor="country">country</label>
        <input {...register('country')} />
        {errors.country && <p>{errors.country.message}</p>}

        <div className="sex">
          <label className="sex-label" htmlFor="gender">
            sex:
          </label>
          <label htmlFor="male">male</label>
          <input type="radio" value="male" {...register('gender')} />
          <label htmlFor="female">female</label>
          <input type="radio" value="female" {...register('gender')} />
        </div>
        {errors.gender && <p>{errors.gender.message}</p>}

        <div className="terms">
          <label htmlFor="terms">accept terms & conditions</label>
          <input type="checkbox" {...register('terms')} />
          {errors.terms && <p>{errors.terms.message}</p>}
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default HookForm;
