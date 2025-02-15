import axios from "axios";
import API_BASE_URL from "./apiConfig";

export interface Order {
    id: number;
    createdAt: string; 
    orderId: number;
    status: string;
    restaurantId: number;
}

export interface MenuData {
    name: string;
    values: number[];
}

export const getOrdersToDo = async ( id: number ): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/orders?status=to-do`);
        return response.data;
    } catch (error) {
        console.error("Error fetching to-do orders:", error);
        throw error;
    }
};

export const getOrdersInProgress = async ( id: number ): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/orders?status=in-progress`);
        return response.data;
    } catch (error) {
        console.error("Error fetching in-progress orders:", error);
        throw error;
    }
};

export const getOrdersDone = async ( id: number ): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/orders?status=done`);
        return response.data;
    } catch (error) {
        console.error("Error fetching done orders:", error);
        throw error;
    }
};

export const getOrdersStatistics = async ( id: number ): Promise<MenuData[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/orders/statistics`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching orders statistics from a restaurant:", error);
        throw error;
    }
};
