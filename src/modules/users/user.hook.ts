import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/modules/users/user.service";

export const useGetAllUsers = () => {
  return useQuery({
    queryFn: UserService.getAllUsers,
    queryKey: ["getAllUsers"],
  });
};
