import { ValidationError } from "joi";

const success = (data: any = null, message: string = "success") => {
  return {
    code: 200,
    message,
    data: data || {},
    error: {},
  };
};

const error = (error: any = null, message: string = "", code: number = 400) => {
  return {
    code,
    message,
    data: {},
    error: error || {},
  };
};

const errorValidation = (error: ValidationError) => {
  const validation = error?.details.reduce((car, cur) => {
    return { ...car, [cur.context?.key as string]: cur.message };
  }, {});

  return response.error({ validation }, "validation error");
};

const response = { success, error, errorValidation };

export default response;
