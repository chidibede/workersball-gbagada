import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAlert, useUser } from "../hooks/Hooks";

function Navbar() {
  const { id } = useParams();
  const { dispatchAlert } = useAlert();
  const { user, dispatchUser } = useUser();

  const handleLogout = () => {
    dispatchUser({ type: "LOG_OUT" });
    dispatchAlert({
      type: "SHOW",
      payload: "Log out",
      variant: "Danger",
    });
    window.location.href = "/";
  };

  return (
    <div className="backdrop-blur-md fixed inset-0 h-16 w-full bg-white bg-opacity-50 justify-between flex items-center px-10 py-5">
      <Link to="/" className="text-xl font-semibold">
        Harvesters Gbagada
      </Link>
    </div>
  );
}

export default Navbar;
