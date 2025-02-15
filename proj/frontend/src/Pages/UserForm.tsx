import { Form } from '../components/Form';
import Layout from '../components/Layout';
import userIcon from "../assets/images/icons/user.png";
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getForm, FormData, ManagerData, getManager } from '../api/apiAdmin';
import { EditableForm } from '../components/EditableForm';


const UserForm = () => {
    const { formId, managerId } = useParams<{ formId?: string; managerId?: string }>();
    const location = useLocation();
    const [form, setForm] = useState<FormData>();
    const [manager, setManager] = useState<ManagerData>();
    console.log(formId);

    useEffect(() => {
        const fetchData = async () => {
            if (location.pathname.includes("/form")) {
                if (formId) {
                    try {
                        const response = await getForm(formId);
                        setForm(response);
                        console.log(response);
                    } catch (error) {
                        console.error("Failed to fetch users: ", error);
                    }
                }
            } else if (location.pathname.includes("/editManager")) {
                if (managerId) {
                    try {
                        const response = await getManager(Number(managerId));
                        setManager(response);
                        console.log(response);
                    } catch (error) {
                        console.error("Failed to fetch managers: ", error);
                    }
                }
            }
        };
        fetchData();
    }, []);

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between mt-8 ml-4 mr-24">
                    <div>
                        <h2 className="text-orange-300 text-lg mb-2 ml-8">Hello Admin</h2>
                        <h1 className="text-black text-2xl ml-8">Welcome Back</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
                            <img src={userIcon} alt="User Icon" className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-bold text-black">Admin</h3>
                    </div>
                </div>
                {location.pathname.includes("/form") && form && (
                    <Form data={form} source="pending" />
                )}
                {location.pathname.includes("/editManager") && manager && (
                    <EditableForm data={manager} />
                )}
            </div>
        </Layout>
    );
};

export default UserForm;