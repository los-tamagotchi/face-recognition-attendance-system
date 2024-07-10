import { useQuery } from "@tanstack/react-query";
import { Student, client } from "./client";

const getList = async (): Promise<Student[]> => {
  try {
    const { data } = await client.get("/attendance-list");
    return data;
  } catch (error) {
    throw error;
  }
};

export const useList = () =>
  useQuery({
    queryKey: ["getList"],
    queryFn: getList,
  });
