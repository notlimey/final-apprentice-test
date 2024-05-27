import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthResponse, LoginDto } from "../types/auth.types";
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

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.access_token = user.access_token;
                token.expires_at = user.expires_at;
                token.roles = user.roles;
            }

            return token;
        },
        session: async ({ session, token }) => {
            session.user = {
                id: token.id,
                email: token.email,
                roles: token.roles,
                access_token: token.access_token,
                expires_at: token.expires_at,
                name: token.name
            };
            return session;
        },
        // redirect: async ({ url, baseUrl }) => {
        //     return url.startsWith(baseUrl) ? url : baseUrl;
        // }
    },

    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username/Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                authToken: { label: "Token", type: "text" },
                userId: { label: "User ID", type: "text" },
            },
            authorize: async (credentials, req) => {
                const { username, password, authToken } = credentials as LoginDto & { authToken?: string, userId?: string };

                if (authToken) {
                    try {
                        const { data, status } = await axios.get<AuthResponse>(`${BASE_URL}Auth/Personal`, {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                            },
                        });

                        if (status === 200) {
                            const res = {
                                id: data.user.id,
                                access_token: authToken,
                                expires_at: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
                                email: data.user.email,
                                name: data.user.userName, // Ensure name is correctly formatted
                                image: data.user.avatarUrl,
                                roles: data.roles,
                            };

                            return res;
                        }
                    } catch (error) {
                        if (process.env.NODE_ENV === 'development') {
                            console.error('Error fetching personal data', error);
                        }
                    }
                    return null;
                }

                try {
                    const { data, status } = await axios.post<AuthResponse>(`${BASE_URL}Auth/login`, {
                        email: username,
                        password,
                    });

                    if (status === 200) {
                        const res = {
                            id: data.user.id,
                            access_token: data.authToken,
                            expires_at: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
                            email: data.user.email,
                            name: data.user.userName, // Ensure name is correctly formatted
                            image: data.user.avatarUrl,
                            roles: data.roles,
                        };

                        return res;
                    }
                    return null;
                } catch (error) {
                    if (process.env.NODE_ENV === 'development') {
                        console.error('Error logging in', error);
                    } else {
                        console.error('Error logging in');
                    }
                    return null;
                }
            }
        }),
    ],
}