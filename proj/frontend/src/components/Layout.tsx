import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../index.css";
import "../output.css";
import homeIcon from '../assets/images/icons/casa_grey.png';
import userIcon from '../assets/images/icons/user_grey.png';
import homeIconWhite from '../assets/images/icons/casa_white.png';
import userIconWhite from '../assets/images/icons/user_white.png';
import logoutIcon from '../assets/images/icons/logout_grey.png';
import logoutIconWhite from '../assets/images/icons/logout.png';
import { useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContextFile";
import { Modal } from "flowbite-react";
const SideBarLayout = () => {

    interface IconItem {
        id: string;
        path?: string;
        grey: string;
        white: string;
        click?: () => void;
    };

    const icons = [
        { id: "home", path: "/", grey: homeIcon, white: homeIconWhite },
    ];
    const [selected, setSelected] = useState<IconItem[]>([]);

    const { contextLogout, isAuthenticated, user } = useUserContext();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            if (user?.role === "ADMIN") {
                setSelected([...icons, {
                    id: "admin", path: "/admin", grey: userIcon, white: userIconWhite
                }, {
                    id: "logout", grey: logoutIcon, white: logoutIconWhite, click: () => {
                        setIsModalOpen(true);
                    }
                }]);
            } else {
                setSelected([...icons, {
                    id: "manager", path: `/foodChain/${user?.ChainFoodID}/restaurant/${user?.RestaurantID}`, grey: userIcon, white: userIconWhite
                }, {
                    id: "logout", grey: logoutIcon, white: logoutIconWhite, click: () => {
                        setIsModalOpen(true);
                    }
                }]);
            }
        } else {
            setSelected(icons);
        }
    }, [isAuthenticated]);

    return (
        <>
            <aside className="fixed top-0 left-0 w-20 h-full bg-orange-500 p-5 shadow-md">
                <ul className="flex flex-col items-center">
                    {selected.map((icon, index) => (
                        <li
                            key={icon.id}
                            className={`mb-2 ${index === 0 ? "mt-16" : "mt-8"}`}
                        >
                            <NavLink
                                to={icon.path || ""}
                                className={({ isActive }) =>
                                    `flex items-center justify-center w-14 h-14 rounded-lg transition ${icon.path && isActive ? "bg-orange-400 shadow-lg" : "hover:bg-orange-600"}`
                                }
                                onClick={() => { icon.click && icon.click() }}
                            >
                                <img
                                    src={icon.white}
                                    alt={icon.id}
                                    className="h-10 w-10"
                                />
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </aside>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} className="bg-opacity-50 bg-black">
                <Modal.Body>
                    <div>
                        <h1 className="text-2xl font-bold text-center">Are you sure you want to logout?</h1>
                        <div className="flex items-center justify-center mt-4 gap-12">
                            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => {
                                                                                contextLogout(),
                                                                                setIsModalOpen(false)}}>
                                Logout
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

const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const excludeRoutes = ["/login"];

    if (excludeRoutes.includes(location.pathname)) {
        return <>{children}</>;
    }

    return (
        <>
            <div className="flex flex-col h-full bg-white bg-scroll">
                <SideBarLayout />
            </div>

            <div className="h-full bg-white bg-scroll">
                <main className="flex-grow ml-10">
                    {children}
                </main>
            </div>
        </>
    );
};

export default Layout;