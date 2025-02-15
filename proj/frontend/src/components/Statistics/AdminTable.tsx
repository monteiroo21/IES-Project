import React, { useEffect, useState } from 'react';
import EditSVG from '../../assets/images/icons/edit-button.svg';
import DeleteSVG from '../../assets/images/icons/delete-button.svg';
import { getAcceptedForms, FormData, deleteManager, changeForm } from '../../api/apiAdmin';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'flowbite-react';

interface managerName {
    name: string;
}


const AdminTable = ({ name }: managerName) => {
    const [forms, setForms] = React.useState<FormData[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await getAcceptedForms();
                const filteredForms = response.filter(
                    (form: FormData) => (!name || (`${form.fname} ${form.lname}`.toLowerCase().includes(name.toLowerCase())))
                );

                setForms(filteredForms);
            } catch (err) {
                console.error("Error fetching Forms:", err);
            }
        };

        fetchForms();
    }, [name]);

    const handleEdit = (managerId: number) => {
        navigate(`/editManager/${managerId}`);
        setForms((prevForms) => prevForms.filter((form) => form.id !== form.id));
    }

    const handleDelete = async (managerId: number, form: FormData) => {
        await deleteManager(managerId);
        await changeForm(form.id, { ...form, state: "deleted" });
        setForms((prevForms) => prevForms.filter((item) => item.id !== form.id));
        console.log("Manager deleted successfully");
    }

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentForms = forms.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(forms.length / rowsPerPage);

    const [manager, setManager] = useState<number>();
    const [rest, setRestaurant] = useState<FormData>();

    const openModal = (managerId: number, form: FormData) => {
        setIsModalOpen(true);
        setManager(managerId);
        setRestaurant(form);
    }


    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/12">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-lg text-white uppercase bg-orange-400 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-12 py-3">
                                Manager
                            </th>
                            <th scope="col" className="px-14 py-3">
                                Restaurant
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        style={{
                            minHeight: `${10 * 48}px`,
                        }}
                        className="bg-white"
                    >
                        {currentForms.map((restaurant) => (
                            <tr
                                key={restaurant.id}
                                className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {restaurant.fname + ' ' + restaurant.lname}
                                </td>
                                <td className="px-14 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center space-x-2">
                                    <img src={restaurant.foodchain.image_url} alt="Restaurant Logo" className="w-8 h-8 rounded" />
                                    <span>{restaurant.restaurantName}</span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center space-x-2">
                                        <img src={EditSVG} alt="Edit" className="w-5 h-5 cursor-pointer" onClick={() => handleEdit(restaurant.manager)} />
                                        <img src={DeleteSVG} alt="Delete" className="w-5 h-5 cursor-pointer" onClick={() => openModal(restaurant.manager, restaurant)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {currentForms.length < rowsPerPage &&
                            Array.from({ length: rowsPerPage - currentForms.length }).map((_, index) => (
                                <tr key={`empty-${index}`} className="bg-white">
                                    <td className="px-12 py-4">&nbsp;</td>
                                    <td className="px-14 py-4">&nbsp;</td>
                                    <td className="px-6 py-4">&nbsp;</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4 pb-3">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`px-4 py-2 mx-1 text-sm font-medium text-white ${pageNumber === currentPage ? "bg-orange-400" : "bg-gray-500"
                                } rounded hover:bg-orange-500`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
            </div>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} className="bg-opacity-50 bg-black">
                <Modal.Body>
                    <div>
                        <h1 className="text-2xl font-bold text-center">Are you sure you want to delete this manager?</h1>
                        <div className="flex items-center justify-center mt-4 gap-12">
                            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => {
                                manager !== undefined && rest !== undefined && handleDelete(manager, rest),
                                    setIsModalOpen(false)
                            }}>
                                Delete
                            </button>
                            <button className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200" onClick={() => setIsModalOpen(false)} >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AdminTable;