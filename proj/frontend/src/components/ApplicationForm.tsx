import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getChains, FoodChain } from "../api/apiFoodChain";

export function ApplicationForm({ handleSubmit }: { handleSubmit: (formData: any) => void }) {
    const navigate = useNavigate();

    const [foodChains, setFoodChains] = useState<FoodChain[]>([]);

    useEffect(() => {
        const fetchFoodChains = async () => {
            try {
                const response = await getChains();
                const chains = response.map((chain: { id: number; name: string; image_url: string; food_type: string }) => ({
                    id: chain.id,
                    name: chain.name,
                    image_url: chain.image_url,
                    food_type: chain.food_type,
                })
                );
                setFoodChains(chains);
            } catch (error) {
                console.error("Failed to fetch food chains:", error);
            }
        };
        fetchFoodChains();
    }, []);

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        foodchain: { id: 0 },
        birthDate: "",
        restaurantName: "",
        restaurantAddress: "",
        latitude: "",
        longitude: "",
        restaurantEndpoint: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        if (id === "foodchain") {
            setFormData((prev) => ({ ...prev, foodchain: { id: parseInt(value, 10) } }));
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    const handleNavigation = () => {
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="flex items-center justify-center mt-8 rounded-3xl w-full max-w-5xl shadow-lg bg-gray-200">
                <form className="flex w-full flex-col gap-6 mt-8 mb-4" onSubmit={onSubmit}>
                    <div className="flex flex-col border-b-2 border-gray-400 px-4">
                        <h2 className="text-2xl font-bold mb-2 ml-4">Apply for Manager</h2>
                        <h4 className="text-xl text-gray mb-8 ml-4">Please fill all the information</h4>
                    </div>
                    <div className="flex flex-wrap gap-10 px-8">
                        <div className="flex-1">
                            <Label htmlFor="fname" value="Name" />
                            <TextInput
                                className="w-full"
                                id="fname"
                                type="text"
                                placeholder="Name"
                                value={formData.fname}
                                onChange={handleChange}
                                required
                                shadow
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="lname" value="Surname" />
                            <TextInput
                                className="w-full"
                                id="lname"
                                type="text"
                                placeholder="Surname"
                                value={formData.lname}
                                onChange={handleChange}
                                required
                                shadow
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-10 px-8">
                        <div className="flex-1">
                            <Label htmlFor="email" value="Email" />
                            <TextInput
                                className="w-full"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                shadow
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="password" value="Password" />
                            <TextInput
                                className="w-full"
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                shadow
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-10 px-8">
                        <div className="flex-1">
                            <Label htmlFor="foodchain" value="Chain" />
                            <select
                                id="foodchain"
                                className="w-full p-2 border rounded-md shadow"
                                value={formData.foodchain.id || ""}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    -- Select a Food Chain --
                                </option>
                                {foodChains.map((chain) => (
                                    <option key={chain.id} value={chain.id}>
                                        {chain.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="birthDate" value="Birth Date" />
                            <TextInput
                                className="w-full"
                                id="birthDate"
                                type="text"
                                placeholder="YYYY-MM-DD"
                                value={formData.birthDate}
                                onChange={handleChange}
                                required
                                shadow
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-10 px-8">
                        <div className="flex-1">
                            <Label htmlFor="restaurantName" value="Restaurant Name" />
                            <TextInput
                                className="w-full"
                                id="restaurantName"
                                type="text"
                                placeholder="Restaurant Name"
                                value={formData.restaurantName}
                                onChange={handleChange}
                                required
                                shadow
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="restaurantAddress" value="Address" />
                            <TextInput
                                className="w-full"
                                id="restaurantAddress"
                                type="text"
                                placeholder="Address"
                                value={formData.restaurantAddress}
                                onChange={handleChange}
                                required
                                shadow
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-10 px-8">
                        <div className="flex-1">
                            <Label htmlFor="latitude" value="Latitude" />
                            <TextInput
                                className="w-full"
                                id="latitude"
                                type="number"
                                placeholder="Latitude"
                                value={formData.latitude}
                                onChange={handleChange}
                                required
                                shadow
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="longitude" value="Longitude" />
                            <TextInput
                                className="w-full"
                                id="longitude"
                                type="number"
                                placeholder="Longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                                required
                                shadow
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center px-56">
                        <div className="flex-1">
                            <Label htmlFor="restaurantEndpoint" value="Endpoint" />
                            <TextInput
                                className="w-full"
                                id="restaurantEndpoint"
                                type="text"
                                placeholder="Endpoint"
                                value={formData.restaurantEndpoint}
                                onChange={handleChange}
                                required
                                shadow
                            />
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 px-4 mt-4">
                        <Button
                            className="bg-red-500 w-32 sm:w-48 rounded-2xl"
                            type="button"
                            onClick={handleNavigation}
                        >
                            Back
                        </Button>
                        <Button
                            className="bg-green-500 w-32 sm:w-48 rounded-2xl"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApplicationForm;