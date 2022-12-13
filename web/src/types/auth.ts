export interface RegisterInput {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  contact?: string;
  avatar?: string;
  location?: string;
  role: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
