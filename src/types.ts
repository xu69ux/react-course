export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  terms: boolean;
  submitTime?: string;
}

export interface RootState {
  form: {
    uncontrolledFormData: FormData;
    hookFormData: FormData;
    countries: string[];
  };
}
