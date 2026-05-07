export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
}

export interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;
}