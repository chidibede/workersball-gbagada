import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";
import {
  generateInActiveWorkerId,
  generateWorkerId,
} from "./assignmentServices";

export const fetchActiveWorkers = async () => {
  const { data, error } = await supabase
    .from("worker")
    .select("*")
    .eq("status", "active");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Register an active worker
export const updateActiveWorker = async (worker) => {
  const { id, ...rest } = worker;
  const othername = worker.othername ? worker.othername : ""
  const { data, error } = await supabase
    .from("worker")
    .update({
      ...rest,
      isactive: true,
      isverified: true,
      isregistered: true,
      fullname: `${worker.firstname} ${othername} ${worker.lastname}`,
      fullnamereverse: `${worker.lastname} ${othername} ${worker.firstname}`,
    })
    .eq("id", worker.id);

  if (error) {
    throw new Error(error.message);
  }

  try {
    await generateWorkerId(id, worker.email, worker.firstname);
  } catch (error) {
    throw new Error(error.message);
  }

  return data;
};

export const registerInactiveWorker = async (newWorkerDetails) => {
   const othername = newWorkerDetails.othername ? newWorkerDetails.othername : ""
  const { data, error } = await supabase.from("worker").insert({
    ...newWorkerDetails,
    isactive: false,
    isverified: false,
    isregistered: true,
    fullname: `${newWorkerDetails.firstname} ${othername} ${newWorkerDetails.lastname}`,
    fullnamereverse: `${newWorkerDetails.lastname} ${othername} ${newWorkerDetails.firstname}`,
  });

  if (error) {
    throw new Error(error.message);
  }

  try {
    await generateInActiveWorkerId(
      newWorkerDetails.id,
      newWorkerDetails.email,
      newWorkerDetails.firstname
    );
  } catch (error) {
    throw new Error(error.message);
  }
  return data;
};

// Fetch all registered workers
export const fetchRegisteredWorkers = async () => {
  const { data, error } = await supabase
    .from("worker")
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
    .from("worker")
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
    .from("worker")
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
    .from("worker")
    .select("*")
    .eq("id", workerData.id);

  const workerAttendance = worker[0][isPresentKey];

  if (workerAttendance) return worker[0];

  const dateUTC = new Date();
  const dateISO = dateUTC.toISOString();

  const { data, error } = await supabase
    .from("worker")
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
export const useRegisterInActiveWorker = () => {
  return useMutation({
    mutationFn: registerInactiveWorker,
    cacheTime: 0,
  });
};
