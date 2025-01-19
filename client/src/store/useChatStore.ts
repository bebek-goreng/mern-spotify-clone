import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface ChatStore {
    users: any[];
    fetchUsers: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,
    fetchUsers: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.get("/users");
            set({ users: response.data.data });
        } catch (error: any) {
            console.log(error);
            set({ error: error.response.data.message || "Failed to fetch users" });
        } finally {
            set({ isLoading: false })
        }
    }
}));