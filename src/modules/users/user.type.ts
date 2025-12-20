import type { User } from "@/modules/auth";

export type GetUsersResponse = {
  message: string;
  users: User[];
};
