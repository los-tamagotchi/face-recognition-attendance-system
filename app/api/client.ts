import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const client = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export type Status = {
  active: boolean;
  remainingTime: string;
};

// Util for POST requests
/* 
- TData: The type of the data that the mutation will return.
- string: The type of the error, which in this case is a string.
- TVariables: The type of the variables that will be passed to the mutation function.
- any: The type of the context, which is typically used for optimistically updating the UI before the mutation is confirmed. 
*/

export const useBaseMutation = <TVariables, TData>(
  props: UseMutationOptions<TData, string, TVariables, any>,
) => useMutation(props);
