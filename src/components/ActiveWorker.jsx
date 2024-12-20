import React, { useState } from "react";
import { useUpdateActiveWorker } from "../services/workersServices";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";
import Form from "./Form";
import { validateEmail } from "../utils/validate";
import WorkersBallImage from "./WorkersBallImage";

export const ActiveWorkerRegistration = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: updateActiveWorker } = useUpdateActiveWorker();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstname: location?.state?.firstname || "",
    lastname: location?.state?.lastname || "",
    email: "",
    phonenumber: "",
    maritalstatus: "",
    nlp: false,
  });

  const handleSubmit = async () => {
    const isDisabled =
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phonenumber ||
      !formData.nlp;

    if (!formData.nlp) {
      toast.error("Please register to serve in NLP 2025");
      return;
    }

    const isValid = validateEmail(formData.email);
    if (!isValid) {
      toast.error("Invalid email address");
      return;
    }

    if (isDisabled) {
      toast.error("Some fields are missing");
      return;
    } else {
      setIsLoading(true);
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
            setIsLoading(false);
            toast.success("Worker registered and email sent successfully");
            navigate("/");
          },
          onError(error) {
            setIsLoading(false);
            const errorMessage = error.message.includes(
              "duplicate key value violates unique constraint"
            )
              ? "You have already registered"
              : "Error registering";
            toast.error(errorMessage);
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
        <WorkersBallImage picture="/workersball1.jpeg" />
        <h1 className="font-bold text-xl mb-3 text-center">
          Register for 2024 Gbagada Workers ball
        </h1>
        <Form
          formData={formData}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          isActive
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
