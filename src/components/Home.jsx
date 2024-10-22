import { useSearchWorker } from "../services/search";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  const { debouncedSearch, search: searchValue } = useDebouncedSearch();
  const { data: filteredPeople, isLoading } = useSearchWorker(searchValue);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setQuery(e.target.value);
    debouncedSearch(
      e.target.value.startsWith(0)
        ? e.target.value.replace(0, "")
        : e.target.value
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:items-center bg-gray-50 p-4">
      <div className="lg:w-[50%] xl:w-[40%] md:w-[80%]">
        <Header />
        <img
          src="/workersball2.jpeg"
          alt="Harvesters International Christian Center Logo"
          className="h-32 w-full mx-auto object-cover opacity-70"
        />
        <div className="bg-white shadow-lg rounded-xl p-6 mb-24">
          <input
            type="text"
            placeholder="Search by name or phone number"
            className="w-full mb-4 p-2 h-14 border rounded-lg"
            value={query}
            onChange={handleSearch}
          />

          {/* Search Results */}
          {searchValue && filteredPeople?.length > 0 ? (
            <div>
              <ul className="space-y-2">
                {filteredPeople?.map((person, index) => (
                  <li
                    key={index}
                    className="p-4 border rounded-lg flex justify-between items-center"
                  >
                    <div className="flex flex-col">
                      <span>
                        {person.firstname} {person.lastname}
                      </span>
                      {person.workerrole && (
                        <span className="opacity-60">{person.workerrole}</span>
                      )}
                      {person.team ? (
                        <span className="opacity-50">
                          {person?.team} -{" "}
                          {person?.department && person?.department}
                        </span>
                      ) : (
                        <span>{person.team || person.department}</span>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/update/${person.id}`, {
                          state: {
                            firstname: person.firstname,
                            lastname: person.lastname,
                          },
                        })
                      }
                      className="px-3 py-3 text-sm bg-blue-500 text-white rounded-lg flex"
                    >
                      Register
                    </button>
                  </li>
                ))}
              </ul>
              <div className="items-center text-center">
                <div className="mt-6">OR</div>
                <button
                  onClick={() => navigate("/register")}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Manually Register
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center my-4">
                {isLoading && searchValue ? (
                  <p>Searching...</p>
                ) : !isLoading && searchValue ? (
                  <div>
                    <p>No results</p>
                    <button
                      onClick={() => navigate("/register")}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Manually Register
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
