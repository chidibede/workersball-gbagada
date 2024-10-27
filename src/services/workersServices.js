import { useMutation, useQuery } from "@tanstack/react-query";
import supabase from "./supabase";
import {
  generateInActiveWorkerId,
  generateWorkerId,
} from "./assignmentServices";
import { sendEmail } from "./emailjs";

export const fetchPendingWorkers = async () => {
  const { data, error } = await supabase
    .from("worker")
    .select("id, email, firstname, lastname, workerrole, team, department, isverified")
    .eq("isverified", false)
    .eq("isregistered", true);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Register an active worker
export const updateActiveWorker = async (worker) => {
  const { id, ...rest } = worker;
  const { data, error } = await supabase
    .from("worker")
    .update({
      ...rest,
      isactive: true,
      isverified: true,
      isregistered: true,
      fullname: `${worker.firstname} ${worker.lastname}`,
      fullnamereverse: `${worker.lastname} ${worker.firstname}`,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  try {
    await generateWorkerId(id, worker.email, worker.firstname, worker.workerrole);
  } catch (error) {
    throw new Error(error.message);
  }

  return data;
};
export const updateInActiveWorker = async (worker) => {
  const { id, ...rest } = worker;
  const { data, error } = await supabase
    .from("worker")
    .update({
      ...rest,
      isactive: false,
      isverified: true,
      isregistered: true,
      fullname: `${worker.firstname} ${worker.lastname}`,
      fullnamereverse: `${worker.lastname} ${worker.firstname}`,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  try {
    await generateInActiveWorkerId(worker.id, worker.email, worker.firstname);
  } catch (error) {
    throw new Error(error.message);
  }

  return data;
};

export const registerInactiveWorker = async (newWorkerDetails) => {
  const { data, error } = await supabase.from("worker").insert({
    ...newWorkerDetails,
    isactive: false,
    isverified: false,
    isregistered: true,
    fullname: `${newWorkerDetails.firstname} ${newWorkerDetails.lastname}`,
    fullnamereverse: `${newWorkerDetails.lastname} ${newWorkerDetails.firstname}`,
  });

  if (error) {
    throw new Error(error.message);
  }

  try {
    await sendEmail(
      newWorkerDetails.firstname,
      newWorkerDetails.email,
      newWorkerDetails.code,
      "inactive"
    );
  } catch (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useUpdateActiveWorker = () => {
  return useMutation({
    mutationFn: updateActiveWorker,
    cacheTime: 0,
  });
};
export const useUpdateInActiveWorker = () => {
  return useMutation({
    mutationFn: updateInActiveWorker,
    cacheTime: 0,
  });
};
export const useRegisterInActiveWorker = () => {
  return useMutation({
    mutationFn: registerInactiveWorker,
    cacheTime: 0,
  });
};

export const useFetchPendingWorkers = () => {
  return useQuery({
    queryKey: [],
    queryFn: () => fetchPendingWorkers(),
  });
};
