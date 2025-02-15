import SideBarCard from './Cards/SidebarCards';
import userIcon from '../assets/images/icons/user.png';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContextFile';

interface Data {
  name: string;
  data: any[];
  navigateBool?: boolean;
}

const Sidebar = ({ name, data, navigateBool }: Data) => {
  const { isAuthenticated, user } = useUserContext();

  return (
    <div className="w-3/12 flex flex-col bg-gray-300 text-white p-4 shadow-2xl">
      <div className="flex items-center mt-8 space-x-2">
        {!isAuthenticated ? <Link to="/login" className="text-xl font-bold text-black bg-orange-400 p-2 rounded-lg hover:bg-orange-300">
          Login
        </Link> : <><div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
          <img src={userIcon} alt="User Icon" className="w-4 h-4" />
        </div>  <span className='text-lg text-black font-semibold'>{user?.fname} {user?.lname}</span></>}
      </div>
      <div className="flex items-center mb-4 mt-8">
        <h2 className="text-2xl text-black font-bold">{name}</h2>
      </div>
      <div>
        {data.map((restaurant) => (
          <SideBarCard
            restId={restaurant.id}
            foodchainId={restaurant.foodchain.id}
            item1={restaurant.name}
            item2={restaurant.address || restaurant.foodchain.name}
            item3={restaurant.distance}
            item4={restaurant.id}
            image={restaurant.image_url || restaurant.foodchain.image_url}
            naveTrue={navigateBool}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
