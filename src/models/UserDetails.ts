export interface UserDetails {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

export interface LoginUserDetails {
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name: string;
  email: string;
  birthDate: string;
}
