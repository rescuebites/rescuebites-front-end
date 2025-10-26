import { Role } from "@/shared/enums/role.enum";

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    role: Role;
}