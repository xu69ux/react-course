export interface FormData {
  name: string;
  age: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  terms: boolean;
  picture: string | null;
  submitTime?: string;
}

export interface RootState {
  form: {
    uncontrolledFormData: FormData;
    hookFormData: FormData;
    countries: string[];
    lastUpdatedForm: string | null;
    history: FormData[];
  };
}
