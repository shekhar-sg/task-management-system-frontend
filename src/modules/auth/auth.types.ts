export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponse = {
  user: User;
  message: string;
};

export type GetProfilePayload = {
  message: string;
  profile: User;
};
