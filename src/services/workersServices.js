import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";

export const fetchActiveWorkers = async () => {
  const { data, error } = await supabase
    .from("workers")
    .select("*")
    .eq("status", "active");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Register an active worker
export const updateActiveWorker = async (worker) => {
  console.log({ worker });
  const { data, error } = await supabase
    .from("workers")
    .update({ ...worker })
    .eq("id", worker.id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Register an inactive worker
export const registerInactiveWorker = async (newWorkerDetails) => {
  const { data, error } = await supabase
    .from("workers")
    .insert([newWorkerDetails]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Fetch all registered workers
export const fetchRegisteredWorkers = async () => {
  const { data, error } = await supabase
    .from("workers")
    .select("*")
    .neq("status", "inactive");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Mark a worker as present
export const markAsPresent = async (workerId) => {
  const { data, error } = await supabase
    .from("workers")
    .update({ attendance: "Present" })
    .eq("id", workerId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Generate unique ID and assign auditorium
export const assignAuditorium = async (workerId, auditoriumDetails) => {
  const { data, error } = await supabase
    .from("workers")
    .update(auditoriumDetails)
    .eq("id", workerId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const markPresent = async (workerData) => {
  // const day = getAwakeningDay();
  const isPresentKey = "ispresent";
  const { data: worker } = await supabase
    .from("workers")
    .select("*")
    .eq("id", workerData.id);

  const workerAttendance = worker[0][isPresentKey];

  if (workerAttendance) return worker[0];

  const dateUTC = new Date();
  const dateISO = dateUTC.toISOString();

  const { data, error } = await supabase
    .from("workers")
    .update({ [isPresentKey]: true, updatedat: dateISO })
    .eq("id", worker.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// const manualAttendance = async (worker) => {
//   const { data, error } = await supabase
//     .from("workers")
//     .insert({ ...worker })
//     .select("*");

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// };

export const useAttendance = () => {
  return useMutation({
    mutationFn: markPresent,
    cacheTime: 0,
  });
};

export const useUpdateActiveWorker = () => {
  return useMutation({
    mutationFn: updateActiveWorker,
    cacheTime: 0,
  });
};
