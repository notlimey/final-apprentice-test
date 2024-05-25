"use server";

import axios from "axios";
import type { BaseUser, RegisterDto } from "../types/auth.types";
import { BASE_URL } from "./constants/api";

export const registerUser = async (data: RegisterDto) => {
    const res = await axios.post<BaseUser>(`${BASE_URL}Auth/register`, data);
    return res.data;
}