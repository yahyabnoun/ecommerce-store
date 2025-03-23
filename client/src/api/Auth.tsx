import { api } from "@/setup/axios";

export type Tokens = {
    access: string;
    refresh: string;
};

export enum UserRole {
    ADMIN = "admin",
    CUSTOMER = "customer",
}

export type UserProfile = {
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
};
export type UserProps = {
    id: number;
    email: string;
    username: string,
    first_name: string;
    last_name: string;
    role: UserRole;
};

type ObtainTokenResponse = {
    tokens: Tokens;
    user: UserProps;
};

type ObtainTokenRequest = {
    username: string;
    password: string;
};

export type RegisterRequest = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    first_name?: string;
    last_name?: string; 
};

export const obtainTokens = async (data: ObtainTokenRequest) => {
    return await api.post<ObtainTokenResponse>(`/userauths/login/`, data);
};

export const registerUser = async (data: RegisterRequest) => {
    return await api.post<ObtainTokenResponse>(`/userauths/register/`, data);
};

export const refreshToken = async (refresh?: string, markAsRetry = false) => {
    return await api.post<ObtainTokenResponse>(`/userauths/token/refresh`, { refresh }, {
        re_try: markAsRetry,
    } as any);
};

// export const resendActivationEmail = async ({ email }: { email: string }) => {
//     return await api.post(`/auth/users/resend_activation/`, { email });
// };

// export const activateUserAccount = async (data: { uid: string; token: string }) => {
//     // return Promise.resolve({
//     //     data: {
//     //         tokens: { access: "access", refresh: "refresh" },
//     //         user: { email: "email", first_name: "first_name", last_name: "last_name", role: UserRole.ADMIN }
//     //     }
//     // })
//     return await api.post<ObtainTokenResponse>(`/auth/users/activation/`, data);
// };

// export const sendResetPasswordEmail = async (data: { email: string }) => {
//     return await api.post(`/auth/users/reset_password/`, data);
// };

// export const resetPassword = async (data: {
//     uid: string;
//     token: string;
//     new_password: string;
//     re_new_password: string;
// }) => {
//     return await api.post<ObtainTokenResponse>(
//         `/auth/users/reset_password_confirm/`,
//         data
//     );
// };

// export const checkEmailExists = async (email: string) => {
//     return await api.get(`/auth/users/exists/?email=${email}`);
// };

export const logoutUser = async () => {
    return await api.post(`/auth/users/logout/`);
};
