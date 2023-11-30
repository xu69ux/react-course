import { useSelector } from 'react-redux';
import { RootState } from '../types';

import './MainPage.css';

function MainPage() {
  const data = useSelector((state: RootState) => state.form);

  function formatDate(time: string | undefined | null | Date): string {
    if (!time) {
      return '';
    }
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const renderHookFormData = () => {
    return (
      <div className="hook-form-data">
        <h2>Hook Form Data</h2>
        <table>
          <tbody>
            <tr>
              <td>Submission Time:</td>
              <td>{formatDate(data.hookFormData.submitTime)}</td>
            </tr>
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
              <td>{data.hookFormData.terms ? 'true' : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderUncontrolledFormData = () => {
    return (
      <div className="uncontrolled-form-data">
        <h2>Uncontrolled Form Data</h2>
        <table>
          <tbody>
            <tr>
              <td>Submission Time:</td>
              <td>{formatDate(data.uncontrolledFormData.submitTime)}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{data.uncontrolledFormData.name}</td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>{data.uncontrolledFormData.age}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{data.uncontrolledFormData.email}</td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>{data.uncontrolledFormData.password}</td>
            </tr>
            <tr>
              <td>Confirm Password:</td>
              <td>{data.uncontrolledFormData.confirmPassword}</td>
            </tr>
            <tr>
              <td>Country:</td>
              <td>{data.uncontrolledFormData.country}</td>
            </tr>
            <tr>
              <td>Sex:</td>
              <td>{data.uncontrolledFormData.gender}</td>
            </tr>
            <tr>
              <td>Terms:</td>
              <td>{data.uncontrolledFormData.terms ? 'true' : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h1>React Forms Data</h1>
      {data.hookFormData ? renderHookFormData() : null}
      {data.uncontrolledFormData ? renderUncontrolledFormData() : null}
    </div>
  );
}

export default MainPage;
