import React, { useState } from "react";
import { useUpdateActiveWorker } from "../services/workersServices";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";
import Form from "./Form";

export const ActiveWorkerRegistration = () => {
  const params = useParams();
  const { mutate: updateActiveWorker } = useUpdateActiveWorker();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    maritalstatus: "",
  });

  const handleSubmit = async () => {
    const isDisabled =
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phonenumber ||
      !formData.maritalstatus;

    if (isDisabled) {
      toast.error("Some fields are missing");
      return;
    } else {
      updateActiveWorker(
        { id: params.id, ...formData },
        {
          onSuccess() {
            queryClient.invalidateQueries();
            setFormData({
              firstname: "",
              lastname: "",
              email: "",
              phonenumber: "",
              maritalstatus: "",
            });
            toast.success("Worker registration submitted!");
          },
          onError(error) {
            setFormData({
              firstname: "",
              lastname: "",
              email: "",
              phonenumber: "",
              maritalstatus: "",
            });
            toast.error("Error registering");
            throw error;
          },
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:items-center bg-gray-50 p-4 mt-1 pb-8">
      <div className="lg:w-[40%] xl:w-[30%] md:w-[70%]">
        <Header isComplete={false} />
        <h1 className="font-bold text-xl mb-3 text-center">
          Worker Data Update
        </h1>
        <Form
          formData={formData}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          isActive
        />
      </div>
    </div>
  );
};
