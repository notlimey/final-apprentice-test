import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthResponse } from "../types/auth.types";
import { BASE_URL } from "./constants/api";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        newUser: "/auth/signup",
        signIn: "/auth/signin",
        error: "/auth/error",
        signOut: "/auth/signout",
    },

    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username/Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials, req) => {
                const { username, password } = credentials as { username: string, password: string };

                try {
                    const { data, status } = await axios.post<AuthResponse>(`${BASE_URL}Auth/login`, {
                        email: username,
                        password,
                    });

                    if (status === 200) {

                        return {
                            id: data.user.id,
                            access_token: data.authToken,
                            expires_at: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
                            email: data.user.email,
                            name: data.user.userName,
                            image: data.user.avatarUrl,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    if (process.env.NODE_ENV === 'development') {
                        console.error('Error logging in', error);
                    } else {
                        console.error('Error logging in');
                    }
                    return null; // Ensure proper error handling
                }
            }
        })
    ],
}