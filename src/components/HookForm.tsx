import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setHookFormData } from '../redux/formSlice';
import { FormData, RootState } from '../types';
import { SCHEMA } from '../constants';
import * as yup from 'yup';

import './HookForm.css';

function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SCHEMA),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countries = useSelector((state: RootState) => state.form.countries);

  const onSubmit = (data: FormData) => {
    SCHEMA.validate(data, { abortEarly: false })
      .then(() => {
        if (data.picture) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const updatedData = {
              ...data,
              picture: reader.result as string,
              submitTime: new Date().toISOString(),
            };

            dispatch(setHookFormData({ data: updatedData, formName: 'hook' }));
            navigate('/');
          };
          reader.readAsDataURL(data.picture[0] as unknown as File);
        }
      })
      .catch((err) => {
        if (err instanceof yup.ValidationError) {
        }
      });
  };

  return (
    <div className="container-form">
      <h1>Hook Form</h1>
      <form
        className="hook-form"
        id="hook-form"
        onSubmit={handleSubmit((data) => onSubmit(data as FormData))}
      >
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

        <div>
          <label htmlFor="picture">picture:</label>
          <input type="file" {...register('picture')} />
        </div>
        <div
          className="error"
          data-error={errors.picture ? errors.picture.message : ''}
        ></div>

        <div className="terms">
          <input type="checkbox" {...register('terms')} />
          <label htmlFor="terms">accept terms and conditions</label>
        </div>
        <div
          className="error"
          data-error={errors.terms ? errors.terms.message : ''}
        ></div>

        <button className="submit" type="submit" form="hook-form">
          submit
        </button>
      </form>
    </div>
  );
}

export default HookForm;
