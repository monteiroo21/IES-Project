import axios from "axios";
import API_BASE_URL from "./apiConfig";

export interface FoodChain {
    id: number;
    name: string;
    image_url: string;
}

export interface FormData {
    id: number;
    foodchain: FoodChain;
    fname: string;
    lname: string;
    email: string;
    birthDate: string;
    restaurantName: string;
    restaurantAddress: string;
    latitude: number;
    longitude: number;
    restaurantEndpoint: string;
    password: string;
    manager: number;
    state?: string;
}

export interface ManagerData {
    id: number;
    fname: string;
    lname: string;
    birthDate: string;
    email: string;
}


export const getForm = async (id: string | undefined): Promise<FormData> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/forms/${id}`, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error fetching a form:", error);
        throw error
    }
};

export const getAcceptedForms = async (): Promise<FormData[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/forms?state=accepted`, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error fetching the accepted forms:", error);
        throw error;
    }
};

export const getDeclinedForms = async (): Promise<FormData[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/forms?state=declined`, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error fetching the declined forms:", error);
        throw error;
    }
}

export const getPendingForms = async (): Promise<FormData[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/forms?state=pending`, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error fetching pending forms:", error);
        throw error;
    }
}

export const changeForm = async (id: number, newForm: FormData): Promise<FormData> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/admin/forms/${id}`, newForm, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error changin form state:", error);
        throw error;
    }
}

export const aproveForm = async (newForm: FormData): Promise<FormData> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/managers`, newForm, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error aproving a forms:", error);
        throw error;
    }
}

export const changeManager = async (id: number, newForm: ManagerData): Promise<ManagerData> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/admin/managers/${id}`, newForm, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error changing manager:", error);
        throw error;
    }
}

export const getManager = async (id: number): Promise<ManagerData> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/managers/${id}`, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error fetching a manager:", error);
        throw error;
    }
}

export const deleteManager = async (id: number): Promise<void> => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/admin/managers/${id}`, { withCredentials: true, });
        return response.data;
    }
    catch (error) {
        console.error("Error deleting a manager:", error);
        throw error;
    }
}