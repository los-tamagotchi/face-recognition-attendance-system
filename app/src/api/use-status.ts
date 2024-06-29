import { useQuery } from "@tanstack/react-query";
import { Status, client } from "./client";

const getStatus = async (): Promise<Status> => {
  try {
    const { data } = await client.get("/status");
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
