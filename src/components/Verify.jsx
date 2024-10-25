import React, { useState } from "react";
import Table from "./Table";
import {
  useFetchPendingWorkers,
  useUpdateActiveWorker,
  useUpdateInActiveWorker,
} from "../services/workersServices";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function Verify() {
  const { data } = useFetchPendingWorkers();
  const { mutate: updateActiveWorker } = useUpdateActiveWorker();
  const { mutate: updateInActiveWorker } = useUpdateInActiveWorker();
  const [loading, setIsLoading] = useState();
  const [inActiveLoading, setInActiveLoading] = useState();
  const queryClient = useQueryClient();

  const handleMarkActive = (worker) => {
    setIsLoading(true);
    updateActiveWorker(
      { ...worker },
      {
        onSuccess() {
          queryClient.invalidateQueries();
          setIsLoading(false);
          toast.success("Worker successfylly marked as active");
        },
        onError(error) {
          setIsLoading(false);
          toast.error("Error registering");
          throw error;
        },
      }
    );
  };

  const handleMarkInActive = (worker) => {
    setInActiveLoading(true);
    updateInActiveWorker(
      { ...worker },
      {
        onSuccess() {
          queryClient.invalidateQueries();
          setInActiveLoading(false);
          toast.success("Worker successfylly marked as inactive");
        },
        onError(error) {
          setInActiveLoading(false);
          toast.error("Error registering");
          throw error;
        },
      }
    );
  };
  return (
    <div>
      <Table
        people={data}
        handleActive={handleMarkActive}
        handleInactive={handleMarkInActive}
        loading={{ active: loading, inactive: inActiveLoading }}
      />
    </div>
  );
}

export default Verify;
