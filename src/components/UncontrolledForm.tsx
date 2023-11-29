import { useDispatch } from 'react-redux';
import { setUncontrolledFormData } from '../redux/formSlice';

function UncontrolledForm() {
  const dispatch = useDispatch();
  dispatch(setUncontrolledFormData(FormData));

  return (
    <div>
      <h1>Uncontrolled Form</h1>
    </div>
  );
}

export default UncontrolledForm;
