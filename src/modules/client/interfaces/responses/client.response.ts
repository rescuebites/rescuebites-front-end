import { PreferenceType } from "@/modules/client/enums/preference-type.enum";
import { ImageResponse } from "@/shared/interfaces/image-response.interface";
import { UserResponse } from "./user.response";

export interface ClientResponse {
  clientId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  image: ImageResponse;
  address: string;
  phone: string;
  user: UserResponse;
  preferences: PreferenceType[];
  locality: string;
}
