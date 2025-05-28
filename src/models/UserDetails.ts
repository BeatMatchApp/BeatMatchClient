export interface UserDetails {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
}

export interface LoginUserDetails {
  email: string;
  password: string;
}

export interface UserDetailsInput {
  name: string;
  email: string;
  birthDate: string;
}
