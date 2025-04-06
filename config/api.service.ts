import axiosInstance from "./axios.config";

export const ApiService = {
    getUser: async (): Promise<User> => {
        const response = await axiosInstance.get('/user');
        return response.data;
    },

    getWallet: async (): Promise<Wallet> => {
        const response = await axiosInstance.get('/wallet');
        return response.data;
    },

    getTransactions: async (): Promise<Transaction[]> => {
        const response = await axiosInstance.get('/transactions');
        return response.data;
    }
};
