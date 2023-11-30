import * as yup from 'yup';

export const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
];

export const SCHEMA = yup.object().shape({
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
