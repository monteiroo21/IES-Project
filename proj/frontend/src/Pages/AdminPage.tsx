import Layout from '../components/Layout';
import AdminTable from '../components/Statistics/AdminTable';
import SearchSVG from '../assets/images/icons/search.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContextFile';

const AdminPage = () => {
    const [searchName, setSearchName] = useState("");

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/requests');
    };

    const { user } = useUserContext();

    return (
        <Layout>
            <div className="bg-white min-h-screen py-10 px-20">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-orange-500">Hello {user?.fname} {user?.lname}</h1>
                        <p className="text-black text-xl">Welcome Back</p>
                    </div>
                </div>

                <div className="relative mb-6 flex items-center justify-between mx-40 mt-10">
                    <div className="flex items-center space-x-4 w-1/2">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search Managers"
                                className="p-2 pl-10 border-4 border-orange-500 rounded-xl w-full bg-gray-100 text-black placeholder-black"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            <img
                                src={SearchSVG}
                                alt="Search"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                            />
                        </div>
                        <button className="text-orange-500 font-medium hover:underline text-xl" onClick={() => { setSearchName("") }}>
                            See All
                        </button>
                    </div>

                    <div>
                        <button className="bg-orange-500 text-white text-lg px-10 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-all" onClick={handleNavigation} >
                            See Requests
                        </button>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <AdminTable name={searchName} />
                </div>
            </div>
        </Layout>
    );
};

export default AdminPage;