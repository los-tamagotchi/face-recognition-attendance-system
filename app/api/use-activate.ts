import { UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { Status, useBaseMutation } from "./client";

const activateAssistance = async ({ ...rest }: Status) => {
  try {
    const { data } = await axios.post("/activate", rest);
    return data;
  } catch (error) {
    throw error;
  }
};

export const useActivate = (
  props?: UseMutationOptions<Status, string, Status, any>,
) =>
  useBaseMutation<Status, Status>({
    mutationKey: ["activateAssistance"],
    mutationFn: activateAssistance,
    ...props,
  });
