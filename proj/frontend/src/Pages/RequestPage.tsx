import Layout from "../components/Layout";
import userIcon from '../assets/images/icons/user.png';
import SearchSVG from '../assets/images/icons/search.svg';
import { Tabs } from "flowbite-react";
import PendingTable from "../components/Statistics/PendingTable";
import DeclinedTable from "../components/Statistics/DeclinedTable";
import { FormProvider, useFormContext } from "../context/FormContext";

const RequestsContent = () => {
    const { setActiveTab, searchName, setSearchName } = useFormContext();
    return (
        <Layout>
            <div className="bg-white min-h-screen py-10 px-20">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-orange-500">Hello Alice Martins</h1>
                        <p className="text-black text-xl">Welcome Back</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
                            <img src={userIcon} alt="User Icon" className="w-4 h-4" />
                        </div>
                        <span className="text-black font-medium">Alice Martins</span>
                    </div>
                </div>

                <div className="flex justify-center items-center mx-40 mt-10">
                    <Tabs className="w-full" aria-label="Request Tabs" variant="default" onActiveTabChange={(index) => setActiveTab(index === 0 ? "Pending" : "Rejected")}>
                        <Tabs.Item active title="Pending">
                            <div className="flex justify-center items-center space-x-4 mb-6">
                                <div className="relative w-1/2">
                                    <input
                                        type="text"
                                        placeholder="Search Requests"
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
                                <button
                                    className="text-orange-500 font-medium hover:underline text-xl"
                                    onClick={() => setSearchName("")}
                                >
                                    See All
                                </button>
                            </div>

                            <div className="flex justify-center">
                                <PendingTable name={searchName} />
                            </div>
                            
                        </Tabs.Item>

                        <Tabs.Item title="Rejected">
                            <div className="flex justify-center items-center space-x-4 mb-6">
                                <div className="relative w-1/2">
                                    <input
                                        type="text"
                                        placeholder="Search Requests"
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
                                <button
                                    className="text-orange-500 font-medium hover:underline text-xl"
                                    onClick={() => setSearchName("")}
                                >
                                    See All
                                </button>
                            </div>

                            <div className="flex justify-center">
                                <DeclinedTable name={searchName} />
                            </div>

                        </Tabs.Item>
                    </Tabs>
                </div>
            </div>
        </Layout>
    );
};

const Requests = () => (
    <FormProvider>
        <RequestsContent />
    </FormProvider>
);

export default Requests;
