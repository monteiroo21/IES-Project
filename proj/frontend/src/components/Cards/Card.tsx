import { Card, Modal } from "flowbite-react";
import { useState } from "react";

interface CardComponentProps {
  image: string;
  name: string;
  price: number | string;
  rest: string;
}

function CardComponent({ image, name, price, rest }: CardComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = () => {
    console.log('Menu Clicked:', image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="pointer-cursor">
        <Card
          imgAlt="menuImage"
          imgSrc={image}
          onClick={handleMenuClick}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
            {name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            €{price}
          </p>
        </Card>
      </div>
      <Modal show={isModalOpen} onClose={closeModal} className="bg-opacity-50 bg-black">
        <Modal.Header>{rest}</Modal.Header>
        <Modal.Body>
        <div className="flex justify-between items-center">
          <div className="w-1/2 pr-4 ml-4">
            <h3 className="text-gray-900 font-bold text-xl mb-2">Menu: {name}</h3>
            <p className="text-lg font-semibold text-gray-900">Price: €{price}</p>
          </div>
          
          <div className="w-1/2 mr-4 rounded-2xl shadow-xl">
            <img src={image} alt={name} className="mb-4 w-full h-auto object-cover" />
          </div>
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardComponent;