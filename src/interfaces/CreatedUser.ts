export interface CreatedUser {
  id: number;
  
  username: string;

  classe: string;

  level: number;
}

export interface CompleteUser extends CreatedUser {
  password: string;
}