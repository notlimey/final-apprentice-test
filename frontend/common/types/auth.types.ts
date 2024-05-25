export type BaseUser = {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    userName: string;
    email: string;
};

export type AuthResponse = {
    authToken: string;
    user: BaseUser;
};