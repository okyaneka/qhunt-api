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

const response = { success, error };

export default response;
