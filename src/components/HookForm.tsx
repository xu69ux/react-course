import { useDispatch } from 'react-redux';
import { setHookFormData } from '../redux/formSlice';

function HookForm() {
  const dispatch = useDispatch();
  dispatch(setHookFormData(FormData));

  return (
    <div>
      <h1>Hook Form</h1>
    </div>
  );
}

export default HookForm;
