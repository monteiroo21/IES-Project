import Layout from "../components/Layout";
import { Tabs } from "flowbite-react";
import userIcon from "../assets/images/icons/user.png";
import DonutChart from '../components/Statistics/DonutChart';
import LineGraph from '../components/Statistics/LineGraph';
import CardComponent from "../components/Cards/Card";
import Table from "../components/Statistics/Table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import { getOrdersToDo, getOrdersDone, getOrdersInProgress } from "../api/apiOrders";
import { getMenus, Menu, DonutData, Restaurant, getRestaurant } from "../api/apiFoodChain";
import { getOrdersStatistics, Order, MenuData } from "../api/apiOrders";
import { useUserContext } from '../context/UserContextFile';
import { WEBSOCKET_URL } from "../api/apiConfig";

const RestaurantStatistics = () => {
    const { foodchainId, restaurantId } = useParams<{ foodchainId: string; restaurantId: string }>();
    const foodchainID = Number(foodchainId);
    const restID = Number(restaurantId);
    const [orders_todo, setOrders_todo] = useState<Order[]>([]);
    const [orders_preparing, setOrders_preparing] = useState<Order[]>([]);
    const [orders_ready, setOrders_ready] = useState<Order[]>([]);
    const [graphData, setGraphData] = useState<MenuData[]>([]);
    const [donutGraphData, setDonutGraphData] = useState<DonutData[]>([]);
    const [menus, setMenus] = useState<Menu[]>([]);
    const { isAuthenticated, user } = useUserContext();
    const [restaurantName, setRestaurantName] = useState<string>("");

    let stompClientOrders: StompJs.Client | null = null; // Keep track of the connection


    const restaurantData = async (id: number, restId: number): Promise<Restaurant | undefined> => {
        try {
            const response = await getRestaurant(id, restId);
            if (response) {
                setRestaurantName(response.name);
                console.log("Restaurant Data:", response.name);
                console.log("Restaurant Name:", restaurantName);
            }
            return response;
        } catch (error) {
            console.error("Error fetching restaurant:", error);
        }
    }

    const connectWebSocketOrder = async (restaurantId: number) => {

        if (stompClientOrders && stompClientOrders.active) {
            console.log("WebSocket already connected");
            return;
        }

        stompClientOrders = new StompJs.Client({
            brokerURL: WEBSOCKET_URL,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
        });

        // Define behavior on successful connection
        stompClientOrders.onConnect = (frame) => {
            console.log("Connected: " + frame);

            // Subscribe to the topic and listen for updates
            stompClientOrders?.subscribe("/topic/orders", (message) => {
                const newOrder = JSON.parse(message.body);

                // If the order if from this restaurant, update the order list
                if (newOrder.restaurantId === restaurantId) {
                    // Remove the order from all lists
                    setOrders_todo((prevOrders) => prevOrders.filter(order => order.orderId !== newOrder.orderId));
                    setOrders_preparing((prevOrders) => prevOrders.filter(order => order.orderId !== newOrder.orderId));
                    setOrders_ready((prevOrders) => prevOrders.filter(order => order.orderId !== newOrder.orderId));

                    // Add the order to the correct list
                    if (newOrder.status === "to-do") {
                        setOrders_todo((prevOrders) => [newOrder, ...prevOrders]);
                    } else if (newOrder.status === "in-progress") {
                        setOrders_preparing((prevOrders) => [newOrder, ...prevOrders]);
                    } else if (newOrder.status === "done") {
                        setOrders_ready((prevOrders) => [newOrder, ...prevOrders]);
                    }
                }
            });
        }

        // Handle WebSocket errors
        stompClientOrders.onWebSocketError = (error) => {
            console.error("WebSocket error: ", error);
        };

        // Handle STOMP protocol errors
        stompClientOrders.onStompError = (frame) => {
            console.error("Broker reported error: " + frame.headers["message"]);
            console.error("Additional details: " + frame.body);
        };

        // Activate the client
        stompClientOrders.activate();

        // Cleanup on component unmount
        return () => {
            if (stompClientOrders && stompClientOrders.active) {
                stompClientOrders.deactivate();
                console.log("WebSocket connection closed");
            }
        };
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Fetch and sort "to-do" orders
                const responseTodo = await getOrdersToDo(restID);
                const sortedTodo = responseTodo.sort(
                    (a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setOrders_todo(sortedTodo);

                // Fetch and sort "in-progress" orders
                const responsePreparing = await getOrdersInProgress(restID);
                const sortedPreparing = responsePreparing.sort(
                    (a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setOrders_preparing(sortedPreparing);

                // Fetch and sort "done" orders
                const responseReady = await getOrdersDone(restID);
                const sortedReady = responseReady.sort(
                    (a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setOrders_ready(sortedReady);

                const responseGraph = await getOrdersStatistics(restID);
                console.log("Orders Data:", responseGraph);
                const formattedGraphData = Object.keys(responseGraph).map((menu: string) => {
                    return {
                        name: menu,
                        values: (responseGraph as any)[menu].values
                    };
                });
                setGraphData(formattedGraphData);
                const formattedDonutData = Object.keys(responseGraph).map((menu) => {
                    return {
                        name: menu,
                        value: (responseGraph as any)[menu].values.reduce((acc: number, val: number) => acc + val, 0)
                    };
                });
                setDonutGraphData(formattedDonutData);

            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };

        const fetchMenus = async () => {
            try {
                const response = await getMenus(foodchainID);
                setMenus(response);
            } catch (err) {
                console.error("Error fetching menus:", err);
            }
        }

        // Initial fetch
        fetchMenus();
        fetchOrders();
        connectWebSocketOrder(restID);

        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const todo = orders_todo.map((order) => order.orderId);
    const preparing = orders_preparing.map((order) => order.orderId);
    const ready = orders_ready.map((order) => order.orderId);

    const dataNames = [...new Set([...graphData.map(item => item.name), ...donutGraphData.map(item => item.name)])];
    const colorMapping = dataNames.reduce<{ [key: string]: string }>((acc, name, index) => {
        acc[name] = `hsl(${(index * 360) / dataNames.length}, 70%, 50%)`;
        return acc;
    }, {});

    const handleSortChange = async (sortType: string) => {
        const sortedMenus = [...menus];

        if (sortType === "name") {
            sortedMenus.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortType === "price-asc") {
            sortedMenus.sort((a, b) => a.price - b.price);
        }
        else if (sortType === "price-desc") {
            sortedMenus.sort((a, b) => b.price - a.price);
        } else if (sortType === "popular-asc" || sortType === "popular-desc") {
            try {
                const responseGraph = await getOrdersStatistics(restID);

                const popularityMap = Object.keys(responseGraph).reduce<{ [key: string]: number }>((acc, menu) => {
                    acc[menu] = (responseGraph as any)[menu].values.reduce((acc: number, val: number) => acc + val, 0);
                    return acc;
                }, {});

                sortedMenus.sort((a, b) => {
                    const popularityA = popularityMap[a.name] || 0;
                    const popularityB = popularityMap[b.name] || 0;
                    return sortType === "popular-asc"
                        ? popularityA - popularityB
                        : popularityB - popularityA;
                });
            } catch (err) {
                console.error("Error sorting by popularity:", err);
            }
        }

        setMenus(sortedMenus);
    }

    useEffect(() => {
        const fetchRestaurant = async () => {
            await restaurantData(foodchainID, restID);
        };
    
        fetchRestaurant();
    }, [foodchainID, restID]);

    return (
        <Layout>
            <div className="flex min-h-screen">
                <div className="flex-1 ml-4">
                    <h4 className="text-orange-300 text-lg mb-2 mt-4">Hello</h4>
                    <h2 className="text-black text-2xl">{restaurantName}</h2>
                    <div className="bg-gray-100 mt-8 mb-8 mx-auto p-8 rounded-lg shadow-xl max-w-5xl">
                        <h1 className="text-4xl font-bold text-center mb-8">Trending Orders</h1>
                        <div className="p-4">
                            <LineGraph data={graphData} colorMapping={colorMapping} />
                        </div>
                    </div>
                    <Tabs aria-label="Default tabs" variant="default">
                        <Tabs.Item active title="Menus">
                            <div className="flex items-center justify-between mt-4 ml-4 mr-6 mb-8">
                                <h2 className="text-xl font-bold">Available Orders: </h2>
                                <div className="flex items-center space-x-2">
                                    <select
                                        onChange={(e) => handleSortChange(e.target.value)}
                                        className="p-2 border-2 border-orange-500 bg-gray-200 text-black rounded-xl"
                                    >
                                        <option value="">Sort By</option>
                                        <option value="name">Name</option>
                                        <option value="price-asc">Price (Low to High)</option>
                                        <option value="price-desc">Price (High to Low)</option>
                                        <option value="popular-asc">Popularity (Low to High)</option>
                                        <option value="popular-desc">Popularity (High to Low)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {menus.map((menu) => (
                                    <CardComponent
                                        key={menu.id}
                                        image={menu.image_url}
                                        name={menu.name}
                                        price={menu.price.toFixed(2)}
                                        rest={restaurantName}
                                    />
                                ))}
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="Current Orders">
                            <DonutChart data={donutGraphData} colorMapping={colorMapping} />
                        </Tabs.Item>
                    </Tabs>
                </div>
                <div className="w-3/12 flex flex-col bg-gray-300 text-white p-4 shadow-2xl">
                    <div className="flex items-center mt-8 space-x-2">
                        {!isAuthenticated ? <Link to="/login" className="text-xl font-bold text-black bg-orange-400 p-2 rounded-lg hover:bg-orange-300">
                            Login
                        </Link> : <><div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
                            <img src={userIcon} alt="User Icon" className="w-4 h-4" />
                        </div>  <span className='text-lg text-black font-semibold'>{user?.fname} {user?.lname}</span></>}
                    </div>
                    <h2 className="text-2xl text-black font-bold mt-8 ml-4">Live Orders</h2>
                    <Table todo={todo} preparing={preparing} ready={ready} />
                </div>
            </div>
        </Layout>
    );
};

export default RestaurantStatistics;