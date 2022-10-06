export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  token: string;
  image: string;
 
}

export interface FirebaseUser
{
  uid: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface LoginParams {
  username: string;
  password: string;
  type?: string;
  app?: string;
}

export interface Credentials
{
  email: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  token: string;
  view: string;
}

export const otpConfig = {
  allowNumbersOnly: true,
  length: 4,
  isPasswordInput: false,
  disableAutoFocus: false,
  placeholder: "",
  inputStyles: {
    width: "50px",
    height: "50px",
    "background-color": "#eeeeee",
    border: "none",
  },
};
