import React, { useEffect, useState } from 'react';
import DeleteSVG from '../../assets/images/icons/delete-button.svg';
import ArrowBack from '../../assets/images/icons/Arrow-back-icon-05.png';
import eye from '../../assets/images/icons/visible.png';
import { getDeclinedForms, FormData } from '../../api/apiAdmin';
import { useFormContext } from "../../context/FormContext";
import { useNavigate } from 'react-router-dom';
import { handleForm } from '../../utils/userActions';
import { Modal } from 'flowbite-react';

interface managerName {
    name: string;
}


const DeclinedTable = ({ name }: managerName) => {
    const [forms, setForms] = React.useState<FormData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const rowsPerPage = 10;
    const { activeTab } = useFormContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await getDeclinedForms();
                const filteredForms = response.filter(
                    (form: FormData) => (!name || (`${form.fname} ${form.lname}`.toLowerCase().includes(name.toLowerCase())))
                );
                setForms(filteredForms);
            } catch (err) {
                console.error("Error fetching Forms:", err);
            }
        };

        fetchForms();
    }, [name, activeTab]);

    const handleDetails = (formId: number) => {
        navigate(`/form/${formId}`, { state: { source: "declined" } });
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentForms = forms.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(forms.length / rowsPerPage);

    const [auxForm, setForm] = useState<number>();

    const openModal = (formId: number) => {
        setForm(formId);
        setIsModalOpen(true);
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
                        {currentForms.map((form) => (
                            <tr
                                key={form.id}
                                className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {form.fname + ' ' + form.lname}
                                </td>
                                <td className="px-14 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center space-x-2">
                                    <img src={form.foodchain.image_url} alt="Restaurant Logo" className="w-8 h-8 rounded" />
                                    <span>{form.restaurantName}</span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={ArrowBack}
                                            alt="Edit"
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() => handleForm(form.id, forms, setForms, "pending")}
                                        />
                                        <img
                                            src={DeleteSVG}
                                            alt="Delete"
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() => openModal(form.id)}
                                        />
                                        <img src={eye} alt="View Details" className="w-5 h-5 cursor-pointer" onClick={() => handleDetails(form.id)} />
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
                                auxForm !== undefined && handleForm(auxForm, forms, setForms, "deleted"),
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

export default DeclinedTable;
