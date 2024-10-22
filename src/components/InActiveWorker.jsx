import React, { useState } from "react";
import { registerInactiveWorker } from "../services/workersServices";
import Header from "./Header";
import Form from "./Form";

export const InactiveWorkerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    maritalStatus: "",
    team: "",
    department: "",
    role: "",
  });

  const handleSubmit = async () => {
    await registerInactiveWorker(formData);
    alert("Worker registration submitted!");
  };

  return (
    <div className="min-h-screen flex flex-col md:items-center bg-gray-50 p-4 mt-1 pb-8">
      <div className="lg:w-[40%] xl:w-[30%] md:w-[70%]">
        <Header isComplete={false} />
        <h1 className="font-bold mb-3 text-center text-xl">Worker Data Registration</h1>
        <Form formData={formData} handleSubmit={handleSubmit} setFormData={setFormData} isActive={false} />
      </div>
    </div>
  );
};
