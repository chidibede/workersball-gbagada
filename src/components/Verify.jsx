import React from "react";
import Table from "./Table";
import { useFetchPendingWorkers } from "../services/workersServices";

function Verify() {
  const { data } = useFetchPendingWorkers();
  return (
    <div>
      <Table people={data} />
    </div>
  );
}

export default Verify;
