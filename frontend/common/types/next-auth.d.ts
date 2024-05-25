import { User } from 'next-auth';
import { TSTeam } from '@3steps-as/api-client/types';

type UserId = string;

declare module "next-auth/jwt" {
    interface JWT {
        id: UserId;
        access_token?: string;
        refresh_token?: string;
        expires_at: number;
        error?: "RefreshAccessTokenError";
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            id: UserId;
            access_token?: string;
            expires_at: number;
        };
        error?: "RefreshAccessTokenError";
    }
}

declare module "next-auth" {
    interface User {
        id: UserId;
        access_token?: string;
        expires_at: number;
    }
}