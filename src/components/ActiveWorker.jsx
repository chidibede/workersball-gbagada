import React, { useState } from "react";
import { useUpdateActiveWorker } from "../services/workersServices";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

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
    console.log({ formData });
    updateActiveWorker(
      {id: params.id, ...formData},
      {
        onSuccess() {
          toast.success("Attendance manually added successfully");
          queryClient.invalidateQueries();
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            phonenumber: "",
            maritalstatus: "",
          });
          
        },
        onError(error) {
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            phonenumber: "",
            maritalstatus: "",
          });
          toast.error("Error registering")
          throw error;
        },
      }
    );
    toast.success("Worker registration submitted!");
  };

  return (
    <div className="min-h-screen flex flex-col md:items-center bg-gray-50 p-4 mt-12">
      <div className="lg:w-5/12">
        <h1 className="font-bold mb-8">Worker Data Update</h1>
        <div className="flex flex-col space-y-5">
          <input
            type="text"
            placeholder="First Name"
            className="border p-2 w-full"
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border p-2 w-full"
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border p-2 w-full"
            value={formData.phonenumber}
            onChange={(e) =>
              setFormData({ ...formData, phonenumber: e.target.value })
            }
          />
          <select
            className="border p-2 w-full"
            value={formData.maritalstatus}
            onChange={(e) =>
              setFormData({ ...formData, maritalstatus: e.target.value })
            }
          >
            <option value="">Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          <button
            className="bg-green-500 text-white p-2 mt-4 w-full"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
