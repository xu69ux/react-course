import { useSelector } from 'react-redux';
import { RootState } from '../types';

import './MainPage.css';

function MainPage() {
  const data = useSelector((state: RootState) => state.form);

  return (
    <div>
      <h1>React Forms Data</h1>
      {data.hookFormData && (
        <div className="hook-form-data">
          <h2>Hook Form Data</h2>
          <table>
            <tr>
              <td>Name:</td>
              <td>{data.hookFormData.name}</td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>{data.hookFormData.age}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{data.hookFormData.email}</td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>{data.hookFormData.password}</td>
            </tr>
            <tr>
              <td>Confirm Password:</td>
              <td>{data.hookFormData.confirmPassword}</td>
            </tr>
            <tr>
              <td>Country:</td>
              <td>{data.hookFormData.country}</td>
            </tr>
            <tr>
              <td>Sex:</td>
              <td>{data.hookFormData.gender}</td>
            </tr>
            <tr>
              <td>Terms:</td>
              <td>{data.hookFormData.terms ? 'true' : 'false'}</td>
            </tr>
          </table>
        </div>
      )}
    </div>
  );
}

export default MainPage;
