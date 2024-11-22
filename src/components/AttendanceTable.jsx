import { useState } from "react";
import supabase from "../services/supabase";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";

export default function AttendanceTable({ people = [] }) {
  const [loading, setLoading] = useState({}); // Object to track loading per person
  const [peopleState, setPeopleState] = useState(people);

  const markAttendance = async (person) => {
    setLoading((prev) => ({ ...prev, [person.id]: true }));

    try {
      // Update the workers table
      const { error: workerError } = await supabase
        .from("worker")
        .update({ ispresent: true })
        .eq("id", person.id);

      if (workerError) throw workerError;

      setPeopleState((prev) =>
        prev.map((p) => (p.id === person.id ? { ...p, ispresent: true } : p))
      );

      const { error: activeError } = await supabase
        .from("workertables")
        .update({ ispresent: true })
        .eq("workerid", person.id);

      if (activeError) throw activeError;

      toast.success("Worker marked successfully");
    } catch (error) {
      console.error("Error marking attendance:", error.message);
      toast.error(`Failed to mark attendance for ${person.firstname}.`);
    } finally {
      setLoading((prev) => ({ ...prev, [person.id]: false }));
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Workers Ball 2024
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the workers that registered
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Unique code
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Team
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Phone number
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Attendance status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    Action
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {peopleState.map((person) => (
                  <tr key={person.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.firstname} {person.lastname}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.code}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.department}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.team}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.phonenumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.ispresent ? "Yes" : "No"}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      {person.ispresent ? (
                        <button className="px-5 py-2 text-sm bg-green-500 text-white rounded-lg flex justify-between cursor-not-allowed">
                          <CheckBadgeIcon className="text-white size-5" />
                          <span className="ml-3">Present</span>
                        </button>
                      ) : (
                        <button
                          className="text-white hover:bg-indigo-400 bg-indigo-600 px-2 py-2 rounded-lg hover:text-gray-50 flex items-center"
                          onClick={() => markAttendance(person)}
                          disabled={loading[person.id]}
                        >
                          {loading[person.id]
                            ? "Marking..."
                            : "Mark attendance"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
