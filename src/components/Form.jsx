import { useNavigate } from "react-router-dom";

const Form = ({ formData, setFormData, handleSubmit, isActive }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-5">
      <input
        type="text"
        placeholder="First Name"
        className="border p-2 w-full rounded-md"
        value={formData.firstname}
        onChange={(e) =>
          setFormData({ ...formData, firstname: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Last Name"
        className="border p-2 w-full rounded-md"
        value={formData.lastname}
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full rounded-md"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="border p-2 w-full rounded-md"
        value={formData.phonenumber}
        onChange={(e) =>
          setFormData({ ...formData, phonenumber: e.target.value })
        }
      />
      <select
        className="border p-2 w-full rounded-md"
        value={formData.maritalstatus}
        onChange={(e) =>
          setFormData({ ...formData, maritalstatus: e.target.value })
        }
      >
        <option value="">Marital Status</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
      </select>
      {!isActive && (
        <div className="flex flex-col space-y-5">
          <select
            className="border p-2 w-full rounded-md"
            value={formData.team}
            onChange={(e) => setFormData({ ...formData, team: e.target.value })}
          >
            <option value="">Team</option>
            <option value="Logistics">Logistics</option>
            <option value="Media">Media</option>
          </select>
          <select
            className="border p-2 w-full rounded-md"
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
            className="border p-2 w-full rounded-md"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>
      )}
      <button
        className="bg-green-500 text-white p-2 mt-4 w-full rounded-md hover:bg-green-400"
        onClick={handleSubmit}
      >
        Register
      </button>
      <button
        className="bg-red-500 text-white p-2 mt-4 w-full rounded-md hover:bg-red-400"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
    </div>
  );
};

export default Form;
