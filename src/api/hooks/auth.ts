import { useMutation } from '@tanstack/react-query';
import client from '../client';

export interface LoginRequest {
    nic: string;
    password: string;
}

export interface RegisterRequest {
    nic: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface AuthResponse {
    token: string;
}

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginRequest) => {
            const response = await client.post<AuthResponse>('/auth/login', data);
            return response.data;
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegisterRequest) => {
            const response = await client.post<AuthResponse>('/auth/register', data);
            return response.data;
        },
    });
};
