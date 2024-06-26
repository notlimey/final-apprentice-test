"use server";
import type { AxiosRequestConfig } from "axios";
import { getCurrentUser } from "./session";
import axios from "axios";
import { BASE_URL } from "./constants/api";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const fetchApi = async <T,>(path: string, options: AxiosRequestConfig<any> = {}) => {
    const user = await getCurrentUser();

    if (!user) {
        return await axios<T>(`${BASE_URL}${path}`, {
            ...options,
            headers: {
                ...options.headers,
                ...(process.env.API_KEY && { ApiKey: process.env.API_KEY })
            }
        });
    }

    return await axios<T>(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${user?.access_token}`,
        },
    })
}