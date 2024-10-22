import React, { useState } from "react";
import { useRegisterInActiveWorker } from "../services/workersServices";
import Header from "./Header";
import Form from "./Form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { validateEmail } from "../utils/validate";

export const InactiveWorkerRegistration = () => {
  const params = useParams();
  const { mutate: registerInActiveWorker } = useRegisterInActiveWorker();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    maritalstatus: "",
    team: "",
    department: "",
    workerrole: "",
  });

  const handleSubmit = async () => {
    const isDisabled =
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phonenumber ||
      !formData.maritalstatus ||
      !formData.team ||
      !formData.department;
    
    const isValid = validateEmail(formData.email);
    if (!isValid) {
      toast.error("Invalid email address");
      return;
    }
    if (isDisabled) {
      toast.error("Some fields are missing");
      return;
    } else {
      registerInActiveWorker(
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
              team: "",
              department: "",
              workerrole: "",
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
              team: "",
              department: "",
              workerrole: "",
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
        <h1 className="font-bold mb-3 text-center text-xl">
          Worker Data Registration
        </h1>
        <Form
          formData={formData}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          isActive={false}
        />
      </div>
    </div>
  );
};