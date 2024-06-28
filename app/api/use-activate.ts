import { UseMutationOptions } from "@tanstack/react-query";
import { Status, client, useBaseMutation, Request } from "./client";

const activateAssistance = async ({ ...rest }: Request) => {
  try {
    const { data } = await client.post("/on", rest);
    return data;
  } catch (error) {
    throw error;
  }
};

export const useActivate = (
  props?: UseMutationOptions<Status, string, Request, any>,
) =>
  useBaseMutation<Request, Status>({
    mutationKey: ["activateAssistance"],
    mutationFn: activateAssistance,
    ...props,
  });

  const deactivateAssistance = async ({ ...rest }: Request) => {
    try {
      const { data } = await client.post("/off", rest);
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const useDeactivate = (
    props?: UseMutationOptions<Status, string, Request, any>,
  ) =>
    useBaseMutation<Request, Status>({
      mutationKey: ["deactivateAssistance"],
      mutationFn: deactivateAssistance,
      ...props,
    });