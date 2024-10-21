import React, { useState } from "react";
import { registerInactiveWorker } from "../services/workersServices";

export const ActiveWorkerRegistration = () => {
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
    <div className="w-full max-w-md mx-auto mt-8 space-y-4">
      <h3>Inactive Worker Registration</h3>
      <input
        type="text"
        placeholder="First Name"
        className="border p-2 w-full"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Last Name"
        className="border p-2 w-full"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone"
        className="border p-2 w-full"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <select
        className="border p-2 w-full"
        value={formData.maritalStatus}
        onChange={(e) =>
          setFormData({ ...formData, maritalStatus: e.target.value })
        }
      >
        <option value="">Marital Status</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
      </select>
      <select
        className="border p-2 w-full"
        value={formData.team}
        onChange={(e) => setFormData({ ...formData, team: e.target.value })}
      >
        <option value="">Team</option>
        <option value="Logistics">Logistics</option>
        <option value="Media">Media</option>
      </select>
      <select
        className="border p-2 w-full"
        value={formData.department}
        onChange={(e) =>
          setFormData({ ...formData, department: e.target.value })
        }
      >
        <option value="">Department</option>
        <option value="Admin">Admin</option>
        <option value="Security">Security</option>
      </select>
      <input
        type="text"
        placeholder="Role"
        className="border p-2 w-full"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      />
      <button
        className="bg-green-500 text-white p-2 mt-4 w-full"
        onClick={handleSubmit}
      >
        Register
      </button>
    </div>
  );
};
