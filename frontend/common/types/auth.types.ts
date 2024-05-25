export type BaseUser = {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    avatarUrl: string;
};

export type AuthResponse = {
    authToken: string;
    user: BaseUser;
};

export type LoginDto = {
    username: string;
    password: string;
}

export type RegisterDto = {
    userName: string;
    email: string;
    password: string;
    isAnonymous: boolean;
    firstName: string;
    lastName: string;
    avatarUrl: string;
}