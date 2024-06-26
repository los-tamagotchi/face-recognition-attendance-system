import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Status } from "./client";

const getStatus = async (): Promise<Status> => {
  try {
    const { data } = await axios.get("/status");
    return data;
  } catch (error) {
    throw error;
  }
};

export const useStatus = () =>
  useQuery({
    queryKey: ["getStatus"],
    queryFn: getStatus,
  });
