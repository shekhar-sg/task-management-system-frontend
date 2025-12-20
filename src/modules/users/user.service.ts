import { api } from "@/api/axios";
import type { User } from "@/modules/auth";
import type { GetUsersResponse } from "@/modules/users/user.type";

export const UserService = {
  getAllUsers: async (): Promise<User[]> => {
    const { data } = await api.get<GetUsersResponse>("/users");
    return data.users;
  },
};
