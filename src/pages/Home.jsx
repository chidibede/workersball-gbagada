import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/Hooks";

export const Home = () => {
  const { user } = useUser();

  return (
    <div className="flex justify-center mt-20">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">
          Harvesters Worker's Ball
        </h1>
        <p>Coming soon...</p>

       
      </div>
    </div>
  );
};

export default Home;
