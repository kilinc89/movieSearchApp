export interface IUserState {
  users?: IUser[];
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export interface IUser {
  name: string;
  id: string;
}
