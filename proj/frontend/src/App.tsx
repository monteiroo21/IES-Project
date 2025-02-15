import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import SettingsPage from "./Pages/SettingsPage";
import RestaurantStatistics from "./Pages/RestaurantStatistics";
import ChainFoodPage from "./Pages/FoodChainPage";
import LoginPage from "./Pages/LoginPage";
import UserForm from "./Pages/UserForm";
import ManagerForm from "./Pages/ManagerFormPage";
import AdminPage from "./Pages/AdminPage";
import Requests from "./Pages/RequestPage";
import {UserProvider} from "./context/UserContextFile";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="/foodChain/:foodchainId/restaurant/:restaurantId"
              element={<RestaurantStatistics />}
            />
            <Route path="/foodChain/:id" element={<ChainFoodPage />} />
            <Route path="/managerForm" element={<ManagerForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/form/:formId" element={<UserForm />} />
            <Route path="/editManager/:managerId" element={<UserForm />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/requests" element={<Requests />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
};

export default App;
