import React, { FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUncontrolledFormData, setSubmissionTime } from '../redux/formSlice';
import { RootState } from '../types';

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
  const countries = useSelector((state: RootState) => state.form.countries);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      country: countryRef.current?.value,
      terms: termsRef.current?.checked,
    };

    dispatch(setSubmissionTime(new Date().toISOString()));
    dispatch(setUncontrolledFormData(data));
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

        <label htmlFor="age">age</label>
        <input type="number" ref={ageRef} />

        <label htmlFor="email">email</label>
        <input type="email" ref={emailRef} />

        <label htmlFor="password">password</label>
        <input type="password" ref={passwordRef} />

        <label htmlFor="confirmPassword">confirm password</label>
        <input type="password" ref={confirmPasswordRef} />

        <label htmlFor="country">country</label>
        <input list="countries" ref={countryRef} />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <div className="sex">
          <label className="sex-label" htmlFor="gender">
            sex:
          </label>
          <label htmlFor="male">male</label>
          <input type="radio" value="male" ref={genderRef} />
          <label htmlFor="female">female</label>
          <input type="radio" value="female" ref={genderRef} />
        </div>
        <div className="terms">
          <input type="checkbox" ref={termsRef} />
          <label htmlFor="terms">accept terms and conditions</label>
        </div>
        <button className="submit" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}
