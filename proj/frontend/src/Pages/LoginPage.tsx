import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, getMe } from "../api/apiLogin";
import { useUserContext } from "../context/UserContextFile";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { contextLogin, isAuthenticated } = useUserContext();

  const handleNavigation = () => {
    navigate("/managerForm");
  };

  if (isAuthenticated) {
    setError("You are already logged in");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);

      const userData = await getMe();
      contextLogin(
        userData.role,
        userData.fname,
        userData.lname,
        userData.restaurant_id,
        userData.foodchain_id
      );
      navigate('/');
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 bg-orange-500 flex flex-col justify-center">
        <div className="ml-40 mb-28">
          <h1 className="text-6xl text-white font-bold mb-2">
            FoodFlow
          </h1>
          <p className="text-white text-2xl">
            Where food trends meet data for tastier decisions!
          </p>
          <Link
            className="btn w-56 bg-white text-orange-500 text-base border-orange-500 rounded-3xl mt-4 hover:bg-gray-200 hover:text-orange-500"
            to="/"
          >
            Go to the Home Page
          </Link>
        </div>
      </div>
      <div className="w-1/3 bg-white flex items-center justify-center">
        <div className="w-[380px]">
          <div className="mb-16">
            <h1 className="text-3xl font-bold mb-1">Hello,</h1>
            <h1 className="text-2xl font-bold mb-4">
              Welcome back to FoodFlow!
            </h1>
            <p className="text-lg text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              type="submit"
              className="btn w-full mt-10 bg-orange-500 text-white border-orange-500 rounded-3xl text-base hover:text-orange-500"
            >
              Login
            </button>
          </form>
          <button
            className="btn w-full mt-4 bg-white text-orange-500 border-orange-500 border-2 rounded-3xl text-base"
            onClick={handleNavigation}
          >
            Become a Manager
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
