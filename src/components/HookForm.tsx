import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { setHookFormData, setSubmissionTime } from '../redux/formSlice';
import { useSelector } from 'react-redux';
import { FormData, RootState } from '../types';

import './HookForm.css';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z].*$/, '⚠️ First letter should be uppercase')
    .required('⚠️ Name is required'),
  age: yup
    .number()
    .transform((value) => {
      return isNaN(value) ? undefined : Number(value);
    })
    .positive('⚠️ Age should be a positive number')
    .required('⚠️ Age is required'),
  email: yup
    .string()
    .email('⚠️ Invalid email')
    .required('⚠️ Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      '⚠️ Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('⚠️ Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], '⚠️ Passwords must match')
    .required('⚠️ Confirm Password is required'),
  gender: yup.string().required('⚠️ Gender is required'),
  country: yup.string().required('⚠️ Country is required'),
  terms: yup
    .bool()
    .oneOf([true], '⚠️ You must accept the terms and conditions')
    .required(),
});

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
    dispatch(setSubmissionTime(new Date().toISOString()));
    dispatch(setHookFormData(data));
  };

  const countries = useSelector((state: RootState) => state.form.countries);

  return (
    <div className="container">
      <h1>Hook Form</h1>
      <form className="hook-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">name</label>
        <input type="text" {...register('name')} />
        <div
          className="error"
          data-error={errors.name ? errors.name.message : ''}
        ></div>

        <label htmlFor="age">age</label>
        <input type="number" {...register('age')} />
        <div
          className="error"
          data-error={errors.age ? errors.age.message : ''}
        ></div>

        <label htmlFor="email">email</label>
        <input type="email" {...register('email')} />
        <div
          className="error"
          data-error={errors.email ? errors.email.message : ''}
        ></div>

        <label htmlFor="password">password</label>
        <input type="password" {...register('password')} />
        <div
          className="error"
          data-error={errors.password ? errors.password.message : ''}
        ></div>

        <label htmlFor="confirmPassword">confirm password</label>
        <input type="password" {...register('confirmPassword')} />
        <div
          className="error"
          data-error={
            errors.confirmPassword ? errors.confirmPassword.message : ''
          }
        ></div>

        <label htmlFor="country">country</label>
        <input list="countries" {...register('country')} />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <div
          className="error"
          data-error={errors.country ? errors.country.message : ''}
        ></div>

        <div className="sex">
          <label className="sex-label" htmlFor="gender">
            sex:
          </label>
          <label htmlFor="male">male</label>
          <input type="radio" value="male" {...register('gender')} />
          <label htmlFor="female">female</label>
          <input type="radio" value="female" {...register('gender')} />
        </div>
        <div
          className="error"
          data-error={errors.gender ? errors.gender.message : ''}
        ></div>

        <div className="terms">
          <label htmlFor="terms">accept terms & conditions</label>
          <input type="checkbox" {...register('terms')} />
        </div>
        <div
          className="error"
          data-error={errors.terms ? errors.terms.message : ''}
        ></div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default HookForm;
