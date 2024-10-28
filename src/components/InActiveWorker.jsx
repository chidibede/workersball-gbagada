import React, { useState } from "react";
import { useRegisterInActiveWorker } from "../services/workersServices";
import Header from "./Header";
import Form from "./Form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { validateEmail } from "../utils/validate";
import WorkersBallImage from "./WorkersBallImage";

export const InactiveWorkerRegistration = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: registerInActiveWorker } = useRegisterInActiveWorker();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    maritalstatus: "",
    team: "",
    department: "",
    workerrole: "",
    nlp: false,
  });

  const handleSubmit = async () => {
    const isDisabled =
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phonenumber ||
      !formData.team ||
      !formData.department ||
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
            setIsLoading(false);
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
        <h1 className="font-bold mb-3 text-center text-xl">
          Register for 2024 Gbagada Workers ball
        </h1>
        <Form
          formData={formData}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          isActive={false}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
