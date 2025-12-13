import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../client';

export interface UpdateProfileRequest {
    firstName: string;
    lastName: string;
    profileMediaId?: string;
    phone?: string;
    whatsapp?: string;
    district?: string;
}

export interface UserProfileResponse {
    nic: string;
    firstName: string;
    lastName: string;
    role: string;
    profileMediaId: string;
    phone?: string;
    whatsapp?: string;
    district?: string;
}

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await client.get<UserProfileResponse>('/users/profile');
            return response.data;
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UpdateProfileRequest) => {
            const response = await client.put<UserProfileResponse>('/users/profile', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
};
