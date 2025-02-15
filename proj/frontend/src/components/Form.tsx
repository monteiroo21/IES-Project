import { Button, Label, TextInput } from "flowbite-react";
import { FormData } from "../api/apiAdmin";
import { handleForm } from "../utils/userActions";
import { useLocation, useNavigate } from "react-router-dom";

interface FormProps {
    data: FormData;
    source: "pending" | "declined";
}

export function Form({data}: FormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { source } = location.state as { source: "pending" | "declined" };

  const handleDelete = () => {
      handleForm(data, null, null, "deleted");
      navigate("/requests");
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex items-center justify-center rounded-3xl w-full max-w-5xl shadow-lg bg-gray-200">
            <form className="flex w-full flex-col gap-6 mb-4">
                <div className="flex border-b-2 border-gray-400 mt-4">
                    <h1 className="flex text-4xl font-bold mb-8 ml-12">New Manager Request</h1>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="fname" value="Name" />
                        </div>
                        <TextInput className="w-full" id="fname" type="text" placeholder={data.fname} disabled readOnly />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="lname" value="Surname" />
                        </div>
                        <TextInput className="w-full" id="lname" type="text" placeholder={data.lname} disabled readOnly />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="birthDate" value="Birth Date" />
                        </div>
                        <TextInput className="w-full" id="birthDate" type="text" placeholder={data.birthDate} disabled readOnly />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput className="w-full" id="email" type="email" placeholder={data.email} disabled readOnly />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="restaurantName" value="Restaurant Name" />
                        </div>
                        <TextInput className="w-full" id="restaurantName" type="text" placeholder={data.restaurantName} disabled readOnly />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="restaurantAddress" value="Restaurant Address" />
                        </div>
                        <TextInput className="w-full" id="restaurantAddress" type="text" placeholder={data.restaurantAddress} disabled readOnly />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="foodchainName" value="Foodchain Name" />
                        </div>
                        <TextInput className="w-full" id="foodchainName" type="text" placeholder={data.foodchain.name} disabled readOnly />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="restaurantEndpoint" value="Restaurant Endpoint" />
                        </div>
                        <TextInput className="w-full" id="restaurantEndpoint" type="text" placeholder={data.restaurantEndpoint} disabled readOnly />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4 gap-12">
                    {source === "pending" ? (
                        <>
                            <Button className="bg-green-500 w-48 rounded-2xl" type="button" onClick={() => {
                                                                        handleForm(data, null, null, "accepted");
                                                                        navigate("/admin");
                                                                    }} >Accept</Button>
                            <Button className="bg-red-500 w-48 rounded-2xl"type="button" onClick={() => {
                                                                        handleForm(data, null, null, "declined");
                                                                        navigate("/requests");
                                                                    }} >Decline</Button>
                        </>
                    ) : source === "declined" ? (
                        <>
                            <Button className="bg-amber-600 w-48 rounded-2xl" type="button" onClick={() => {
                                                                        handleForm(data, null, null, "pending");
                                                                        navigate("/requests");
                                                                    }} >Restore</Button>
                            <Button className="bg-red-500 w-48 rounded-2xl"type="button" onClick={() => {
                                                                        handleDelete();
                                                                    }} >Delete</Button>
                        </>
                    ) : null}
                </div>
            </form>
        </div>

        {/* <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} position="center" >
            <Modal.Header>
                <p className="flex items-center justify-center text-black">
                    Are you sure you want to delete this request?
                </p>
            </Modal.Header>
            <Modal.Body className="flex items-center justify-center mt-4 gap-12">
                <Button className="bg-red-500 rounded-xl" onClick={handleDelete}>
                    Delete
                </Button>
                <Button className="bg-gray-300 rounded-xl" onClick={() => setIsModalOpen(false)}>
                    Cancel
                </Button>
            </Modal.Body>
        </Modal> */}
    </div>
  );
}