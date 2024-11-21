import { useSearchWorker } from "../services/search";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { useState } from "react";
import { useAttendance } from "../services/attendance";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AttendanceTable from "./AttendanceTable";

const Attendance2 = () => {
  const { debouncedSearch, search: searchValue } = useDebouncedSearch();
  const { data: filteredPeople, isLoading } = useSearchWorker(searchValue);
  const { mutate: markAttendanceMutation } = useAttendance();
  const [query, setQuery] = useState("");
  const [mutateIsLoadingId, setMutateIsLoadingId] = useState(0);
  const queryClient = useQueryClient();

  const handleSearch = (e) => {
    setQuery(e.target.value);
    debouncedSearch(
      e.target.value.startsWith(0)
        ? e.target.value.replace(0, "")
        : e.target.value
    );
  };

  const handleMarkPresent = (person) => {
    setMutateIsLoadingId(person.id);
    markAttendanceMutation(person, {
      onSuccess() {
        toast.success("Attendance marked successfully");
        setMutateIsLoadingId(0);
        queryClient.invalidateQueries();
      },
      onError(error) {
        setMutateIsLoadingId(0);
        throw error;
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:items-center bg-gray-50 p-4">
      <div className="lg:w-10/12">
        {/* Header with Logo and Title */}
        <header className="text-center mb-4 mt-8">
          <h1 className="text-2xl font-bold mt-4">
            Harvesters International Christian Centre, Gbagada campus
          </h1>
        </header>
        <div className="bg-white shadow-lg rounded-xl p-6 mb-24 mt-12">
          <h1 className="text-2xl text-center font-bold mb-4">
            Workers Ball 2024
          </h1>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name or phone number"
            className="w-full mb-4 p-2 h-14 border rounded-lg"
            value={query}
            onChange={handleSearch}
          />

          {isLoading ? (
            <div>Searching worker...</div>
          ) : (
            <AttendanceTable
              people={filteredPeople}
              handleActive={handleMarkPresent}
              // handleInactive={handleMarkInActive}
              // loading={{ active: loading, inactive: inActiveLoading }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance2;
