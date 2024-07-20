
export interface User {
    username: string;
    email: string;
    password: string;
}

export interface UserOutput {
    username: string;
    email: string;
    accessToken?: string;
    refershToken?: string;
}