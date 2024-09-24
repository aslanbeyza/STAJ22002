import axios from 'axios';
import { Address } from '../interface/types';

const API_URL = 'http://localhost:5000/api';

// Adresleri almak için API isteği
export const getAddresses = async (userId: number | null): Promise<Address[]> => {
    if (userId === null) {
        throw new Error('User ID is not available');
    }
    // URL'deki userId parametresi doğru olmalı
    const response = await axios.get<Address[]>(`${API_URL}/address/${userId}`);
    return response.data;
};

export const createAddress = async (addressData: Address): Promise<Address> => {
  
    try {
        const response = await axios.post<Address>(`${API_URL}/address`, addressData);
        return response.data;
    } catch (error) {
        console.error('Error creating address:', error);
        throw error; 
    }
};
