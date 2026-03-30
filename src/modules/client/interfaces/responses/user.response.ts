import { Role } from "@/shared/enums/role.enum";

export interface UserResponse {
  userId: string;
  email: string;
  role: Role;
  enabled: boolean;
}
