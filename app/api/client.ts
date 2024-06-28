import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const client = axios.create({
  baseURL: "http://192.168.0.164:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Type for status object

export type Request = {
  active: boolean;
  initialTime: number;
}

export type Status = {
  active: boolean;
  remainingTime: number;
  initialTime: number;
};

// Util for POST requests

export const useBaseMutation = <TVariables, TData>(
  props: UseMutationOptions<TData, string, TVariables, any>,
) => useMutation(props);

/* 
- TData: The type of the data that the mutation will return.
- string: The type of the error, which in this case is a string.
- TVariables: The type of the variables that will be passed to the mutation function.
- any: The type of the context, which is typically used for optimistically updating the UI before the mutation is confirmed. 
*/

const DEFAULT_ERROR_MESSAGE = 'something went wrong';

const parseError = (data: any) => {
  // TODO: refactor this and include types
  const { error, errors } = data || {};

  if (error) return error;

  if (errors) {
    const { fullMessages, base } = errors;

    if (fullMessages) {
      const [firstMessage] = fullMessages;
      return firstMessage;
    } else if (base) {
      const [firstMessage] = base;
      return firstMessage;
    } else if (Array.isArray(errors)) {
      const [firstMessage] = errors;
      return firstMessage;
    } else {
      const errorKey = Object.keys(errors)[0];
      const error = errors[errorKey][0];
      return `${errorKey} ${error}`;
    }
  }

  return DEFAULT_ERROR_MESSAGE;
};

export const parseAxiosError = (error: any) => {
  if (error) {
    const { response } = error;

    if (!response) {
      return DEFAULT_ERROR_MESSAGE;
    }

    if (response.status === 500) {
      return DEFAULT_ERROR_MESSAGE;
    } else {
      return parseError(response?.data);
    }
  }

  return DEFAULT_ERROR_MESSAGE;
};