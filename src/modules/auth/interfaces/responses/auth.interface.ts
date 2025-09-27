import { Role } from "@/shared/enums/role.enum";

export interface AuthResponse {
    userId: string
    email: string
    token: string
    role: Role
}
