import { useQuery } from '@tanstack/react-query';
import client from '../client';

export interface Announcement {
    id: string; // Backend sends string ID
    title: string;
    content: string;
    imageUrl?: string;
    publishDate: string;
    createdAt: string;
    updatedAt: string;
}

export const useGetAnnouncements = () => {
    return useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const response = await client.get<Announcement[]>('/announcements/announcements');
            return response.data;
        },
    });
};
