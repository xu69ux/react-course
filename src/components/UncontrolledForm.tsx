import React, { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUncontrolledFormData } from '../redux/formSlice';
import { RootState, FormData } from '../types';
import { SCHEMA } from '../constants';
import * as yup from 'yup';

import './UncontrolledForm.css';

export default function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.form.countries);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data: FormData = {
      name: nameRef.current?.value ?? '',
      age: Number(ageRef.current?.value) ?? 0,
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
      confirmPassword: confirmPasswordRef.current?.value ?? '',
      gender: genderRef.current?.value ?? '',
      country: countryRef.current?.value ?? '',
      terms: termsRef.current?.checked ?? false,
      submitTime: new Date().toISOString(),
    };

    try {
      SCHEMA.validateSync(data, { abortEarly: false });
      setErrors({});
      dispatch(setUncontrolledFormData({ data, formName: 'uncontrolled' }));
      navigate('/');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors = err.inner.reduce((errors, error) => {
          if (typeof error.path === 'string') {
            return { ...errors, [error.path]: error.message };
          }
          return errors;
        }, {});
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="container-form">
      <h1>Uncontrolled Form</h1>
      <form
        className="uncontrolled-form"
        id="uncontrolled-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">name</label>
        <input type="text" ref={nameRef} />
        <div className="error" data-error={errors.name || ''}></div>

        <label htmlFor="age">age</label>
        <input type="number" ref={ageRef} />
        <div className="error" data-error={errors.age || ''}></div>

        <label htmlFor="email">email</label>
        <input type="email" ref={emailRef} />
        <div className="error" data-error={errors.email || ''}></div>

        <label htmlFor="password">password</label>
        <input type="password" ref={passwordRef} />
        <div className="error" data-error={errors.password || ''}></div>

        <label htmlFor="confirmPassword">confirm password</label>
        <input type="password" ref={confirmPasswordRef} />
        <div className="error" data-error={errors.confirmPassword || ''}></div>

        <label htmlFor="country">country</label>
        <input list="countries" ref={countryRef} />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <div className="error" data-error={errors.country || ''}></div>

        <div className="sex">
          <label className="sex-label" htmlFor="gender">
            sex:
          </label>
          <label htmlFor="male">male</label>
          <input type="radio" value="male" ref={genderRef} />
          <label htmlFor="female">female</label>
          <input type="radio" value="female" ref={genderRef} />
        </div>
        <div className="error" data-error={errors.gender || ''}></div>

        <div className="terms">
          <input type="checkbox" ref={termsRef} />
          <label htmlFor="terms">accept terms and conditions</label>
        </div>
        <div className="error" data-error={errors.terms || ''}></div>

        <button className="submit" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}
