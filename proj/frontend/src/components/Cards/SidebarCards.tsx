import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import { getMenus } from '../../api/apiFoodChain';

interface SideBarCardProps {
    restId: number;
    foodchainId: number;
    item1: string;
    item2: string;
    item3?: string;
    item4?: number;
    image: string;
    naveTrue?:boolean;
}

const SideBarCard: React.FC<SideBarCardProps> = ({ restId, foodchainId, item1, item2,item3, item4, image,naveTrue }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [menuPrice, setMenuPrice] = useState<number>();

    const handleCardClick = async () => {
        if (naveTrue) {
            navigate(`/foodchain/${foodchainId}/restaurant/${restId}`);
        } else {
            const price = await getMenuPriceByName(foodchainId, item4);
            setMenuPrice(price);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getMenuPriceByName = async (foodchainId: number, id: number | undefined) => {
        if (!id) {
            return;
        }
        try {
            const menus = await getMenus(foodchainId);
            return menus.find(menu => menu.id === id)?.price;
        } catch (error) {
            console.error("Error fetching menus form a foodchain:", error);
            throw error;
        }
    };


    return (
        <>
            <div className="card card-side bg-gray-400 shadow-md h-20 mb-6 cursor-pointer" onClick={handleCardClick}>
                <figure className="flex items-center justify-center">
                    <img
                        src={image}
                        alt={item1}
                        className="w-14 h-14 object-contain rounded-lg bg-white p-2 ml-4" />
                </figure>
                <div className="card-body p-2 mt-1">
                    <h2 className="text-sm font-bold text-black">{item1}</h2>
                    {item3 && <h2 className="text-xs -mt-1.5 -mb-1.5 font-base text-black">{item3} m</h2>}
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} className="bg-opacity-50 bg-black">
                <Modal.Header>{item2}</Modal.Header>
                <Modal.Body>
                <div className="flex justify-between items-center">
                    <div className="w-1/2 pr-4 ml-4">
                    <h3 className="text-gray-900 font-bold text-xl mb-2">Menu: {item1}</h3>
                    <p className="text-lg font-semibold text-gray-900">Price: €{menuPrice}</p>
                    </div>
                    
                    <div className="w-1/2 mr-4 rounded-2xl shadow-xl">
                    <img src={image} alt={item1} className="mb-4 w-full h-auto object-cover" />
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SideBarCard;
