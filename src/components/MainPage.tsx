import { useSelector } from 'react-redux';
import { RootState } from '../types';

import './MainPage.css';

function MainPage() {
  const uncontrolledFormData = useSelector(
    (state: RootState) => state.form.uncontrolledFormData
  );
  const hookFormData = useSelector(
    (state: RootState) => state.form.hookFormData
  );
  const lastUpdatedForm = useSelector(
    (state: RootState) => state.form.lastUpdatedForm
  );
  const history = useSelector((state: RootState) => state.form.history);

  function formatDate(time: string | undefined | null | Date): string {
    if (!time) {
      return '';
    }
    const date = new Date(time);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const renderHookFormData = () => {
    const tableClass = lastUpdatedForm === 'hook' ? 'new-data' : '';
    return (
      <div className="hook-form-data">
        <h2>Hook Form Data</h2>
        <div className="table-container">
          <table className={tableClass}>
            <tbody>
              <tr>
                <td>Submission Time:</td>
                <td>{formatDate(hookFormData.submitTime)}</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>{hookFormData.name}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{hookFormData.age}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{hookFormData.email}</td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>{hookFormData.password}</td>
              </tr>
              <tr>
                <td>Confirm Password:</td>
                <td>{hookFormData.confirmPassword}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{hookFormData.country}</td>
              </tr>
              <tr>
                <td>Sex:</td>
                <td>{hookFormData.gender}</td>
              </tr>
              <tr>
                <td>Picture:</td>
                <td>
                  {hookFormData.picture ? (
                    <img src={hookFormData.picture} alt="Uploaded" />
                  ) : (
                    ''
                  )}
                </td>
              </tr>
              <tr>
                <td>Terms:</td>
                <td>{hookFormData.terms ? 'true' : ''}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderUncontrolledFormData = () => {
    const tableClass = lastUpdatedForm === 'uncontrolled' ? 'new-data' : '';
    return (
      <div className="uncontrolled-form-data">
        <h2>Uncontrolled Form Data</h2>
        <div className="table-container">
          <table className={tableClass}>
            <tbody>
              <tr>
                <td>Submission Time:</td>
                <td>{formatDate(uncontrolledFormData.submitTime)}</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>{uncontrolledFormData.name}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{uncontrolledFormData.age}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{uncontrolledFormData.email}</td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>{uncontrolledFormData.password}</td>
              </tr>
              <tr>
                <td>Confirm Password:</td>
                <td>{uncontrolledFormData.confirmPassword}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{uncontrolledFormData.country}</td>
              </tr>
              <tr>
                <td>Sex:</td>
                <td>{uncontrolledFormData.gender}</td>
              </tr>
              <tr>
                <td>Picture:</td>
                <td>
                  {uncontrolledFormData.picture ? (
                    <img src={uncontrolledFormData.picture} alt="Uploaded" />
                  ) : (
                    ''
                  )}
                </td>
              </tr>
              <tr>
                <td>Terms:</td>
                <td>{uncontrolledFormData.terms ? 'true' : ''}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderHistory = () => {
    return (
      <>
        <h2>Submission History</h2>
        <div className="history">
          {history.map((formData, index) => (
            <div key={index}>
              <h3>Submission {index + 1}</h3>
              <div className="table-container-history">
                <table>
                  <tbody>
                    <tr>
                      <td>Submission Time:</td>
                      <td>{formatDate(formData.submitTime)}</td>
                    </tr>
                    <tr>
                      <td>Name:</td>
                      <td>{formData.name}</td>
                    </tr>
                    <tr>
                      <td>Age:</td>
                      <td>{formData.age}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{formData.email}</td>
                    </tr>
                    <tr>
                      <td>Password:</td>
                      <td>{formData.password}</td>
                    </tr>
                    <tr>
                      <td>Confirm Password:</td>
                      <td>{formData.confirmPassword}</td>
                    </tr>
                    <tr>
                      <td>Country:</td>
                      <td>{formData.country}</td>
                    </tr>
                    <tr>
                      <td>Sex:</td>
                      <td>{formData.gender}</td>
                    </tr>
                    <tr>
                      <td>Picture:</td>
                      <td className="history-img">
                        {formData.picture ? (
                          <img src={formData.picture} alt="Uploaded" />
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Terms:</td>
                      <td>{formData.terms ? 'true' : ''}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      <h1>React Forms Data</h1>
      {hookFormData ? renderHookFormData() : null}
      {uncontrolledFormData ? renderUncontrolledFormData() : null}
      {history.length ? renderHistory() : null}
    </div>
  );
}

export default MainPage;
