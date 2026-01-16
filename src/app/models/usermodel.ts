//login data 
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user' | 'chef';
  token: string;
  createdAt?: Date;
}

//login details display interface

export interface LoginRequest {
  email: string;
  password: string;
  role: 'admin' | 'user' | 'chef';
}

//signup details
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'user' | 'chef';
}

//signup responsen interface

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}