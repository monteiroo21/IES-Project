import React, { useEffect, useState } from 'react';
import tick from '../../assets/images/icons/checkmark.png';
import cross from '../../assets/images/icons/cross.png';
import eye from '../../assets/images/icons/visible.png';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from "../../context/FormContext";
import { getPendingForms, FormData } from '../../api/apiAdmin';
import { handleForm } from '../../utils/userActions';

interface managerName {
    name: string;
}


const PendingTable = ({ name }: managerName) => {
    const [forms, setForms] = React.useState<FormData[]>([]);
    const { activeTab } = useFormContext();


    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await getPendingForms();

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

    console.log(forms);

    const handleDetails = (formId: number) => {
        navigate(`/form/${formId}`, { state: { source: "pending" } });
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentForms = forms.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(forms.length / rowsPerPage);

    return (
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
                                    <img src={tick} alt="Accept" className="w-5 h-5 cursor-pointer" onClick={() => handleForm(restaurant.id, forms, setForms, "accepted")} />
                                    <img src={cross} alt="Reject" className="w-5 h-5 cursor-pointer" onClick={() => handleForm(restaurant.id, forms, setForms, "declined")} />
                                    <img src={eye} alt="View Details" className="w-5 h-5 cursor-pointer" onClick={() => handleDetails(restaurant.id)} />
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
    );
};

export default PendingTable;