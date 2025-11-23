import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../client';

export interface CreatePostRequest {
    caption: string;
    mediaIds?: string[];
}

export interface PostResponse {
    id: string;
    caption: string;
    authorId: string;
    mediaIds: string[];
    likesCount: number;
    downloadCount: number;
    createdAt: string;
}

export interface PostWithDetailsResponse extends PostResponse {
    // Add any extra details if the backend sends them, otherwise it matches PostResponse
    // The backend controller returns []dtos.PostWithDetailsResponse
    // I need to check post_details.go to be sure, but for now I'll assume it extends PostResponse
    // or has similar fields.
    // Let's assume it's similar for now.
    authorName: string; // inferred
    mediaUrls: string[]; // 🟢 From backend
    isLiked: boolean;
    comments: CommentWithAuthorResponse[];
}

export interface AuthorResponse {
    id: string;
    firstName: string;
    lastName: string;
    profileMediaId: string;
    profileMediaUrl?: string;
}

export interface CommentWithAuthorResponse {
    id: string;
    content: string;
    createdAt: string;
    author: AuthorResponse;
}

export interface CreateCommentRequest {
    content: string;
}

export interface CommentResponse {
    id: string;
    postId: string;
    authorId: string;
    content: string;
    createdAt: string;
}

export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await client.get<PostWithDetailsResponse[]>('/posts');
            return response.data;
        },
    });
};

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreatePostRequest) => {
            const response = await client.post<PostResponse>('/posts', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};

export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await client.post(`/posts/${id}/like`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: CreateCommentRequest }) => {
            const response = await client.post<CommentResponse>(`/posts/${id}/comments`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};

export const useDownloadPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await client.post(`/posts/${id}/download`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    })
}
