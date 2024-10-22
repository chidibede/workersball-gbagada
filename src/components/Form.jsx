import { useNavigate } from "react-router-dom";
import { teamsAndDepartments } from "../utils/teams";

const Form = ({ formData, setFormData, handleSubmit, isActive }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-5 pb-8">
      <div className="flex">
        <label className="text-lg text-red-500 mt-2 mr-2">*</label>
        <input
          type="text"
          placeholder="First Name"
          className="border p-2 w-full rounded-md"
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
        />
      </div>
      <div className="flex">
        <label className="text-lg text-red-500 mt-2 mr-2">*</label>
        <input
          type="text"
          placeholder="Last Name"
          className="border p-2 w-full rounded-md"
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
        />
      </div>
      <div className="flex">
        <label className="text-lg text-red-500 mt-2 mr-2">*</label>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded-md"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="flex">
        <label className="text-lg text-red-500 mt-2 mr-2">*</label>
        <input
          type="tel"
          placeholder="Phone Number"
          className="border p-2 w-full rounded-md"
          value={formData.phonenumber}
          onChange={(e) =>
            setFormData({ ...formData, phonenumber: e.target.value })
          }
        />
      </div>
      <div className="flex">
        <label className="text-lg text-transparent invisible mt-2 mr-2">
          *
        </label>
        <select
          className="border p-2 w-full rounded-md bg-gray-100"
          value={formData.maritalstatus}
          onChange={(e) =>
            setFormData({ ...formData, maritalstatus: e.target.value })
          }
        >
          <option value="">Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>
      </div>

      {!isActive && (
        <div className="flex flex-col space-y-5">
          <div className="flex">
            <label className="text-lg text-red-500 mt-2 mr-2">*</label>
            <select
              className="border p-2 w-full rounded-md bg-gray-100"
              value={formData.team}
              onChange={(e) =>
                setFormData({ ...formData, team: e.target.value })
              }
            >
              <option value="">Select team</option>
              {teamsAndDepartments.map((item) => (
                <option key={item.team} value={item.team}>
                  {item.team}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <label className="text-lg text-red-500 mt-2 mr-2">*</label>
            <select
              className="border p-2 w-full bg-gray-100 rounded-md"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            >
              <option value="">Select department</option>
              {teamsAndDepartments
                .find((item) => item.team === formData.team)
                ?.department.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex">
            <label className="text-lg text-transparent invisible mt-2 mr-2">
              *
            </label>
            <input
              type="text"
              placeholder="Role"
              className="border p-2 w-full rounded-md"
              value={formData.workerrole}
              onChange={(e) =>
                setFormData({ ...formData, workerrole: e.target.value })
              }
            />
          </div>
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
