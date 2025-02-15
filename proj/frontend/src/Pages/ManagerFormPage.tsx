import Layout from '../components/Layout';
import ApplicationForm from '../components/ApplicationForm';
import { useNavigate } from 'react-router-dom';
import { submitForm } from '../api/apiLogin';

const ManagerForm = () => {
    const navigate = useNavigate();

    const handleFormSubmit = async (formData: any) => {
        try {
          const response = submitForm(formData);
          console.log("Form submitted successfully:", response);
          navigate('/login');
        } catch (error) {
          console.error("Failed to submit form:", error);
        }
    };

    return (
        <Layout>
            <ApplicationForm handleSubmit={handleFormSubmit} />
        </Layout>
    );
};

export default ManagerForm;