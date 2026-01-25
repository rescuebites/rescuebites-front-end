import { httpClient } from "@/shared/lib/httpClient";
import {Deal, Store} from "../interfaces/types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getFeaturedStores = async (): Promise<Store[]> => {
    const {data} = await httpClient.get<Store[]>(`${BACKEND_URL}/stores/featured`);
    return data;
};

export const getTopDeals  =async (): Promise<Deal[]> => {
    const {data} = await httpClient.get<Deal[]>(`${BACKEND_URL}/deals/top`);
    return data;
};