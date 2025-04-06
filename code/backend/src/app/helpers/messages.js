const MESSAGES = {
  resCode: {
    HTTP_OK: 200,
    HTTP_CREATE: 201,
    HTTP_NO_CONTENT: 204,
    HTTP_BAD_REQUEST: 400,
    HTTP_UNAUTHORIZED: 401,
    HTTP_FORBIDDEN: 403,
    HTTP_NOT_FOUND: 404,
    HTTP_METHOD_NOT_ALLOWED: 405,
    HTTP_CONFLICT: 409,
    HTTP_INTERNAL_SERVER_ERROR: 500,
    HTTP_SERVICE_UNAVAILABLE: 503,
  },
  errorTypes: {
    INTERNAL_SERVER_ERROR: "InternalServerError",
  },
  apiErrorStrings: {
    SERVER_ERROR: "Oops! something went wrong",
    DATA_NOT_EXISTS: (data) => `${data} does not exists`,
    DATA_ALREADY_EXISTS: (data) => `${data} already exists`,
  },
  apiSuccessStrings: {
    CREATE: (value) => `${value} created Successfully`,
    UPDATE: (value) => `${value} updated Successfully`,
    DELETE: (value) => `${value} deleted Successfully`,
    LOGIN: (value) => `${value} login Successfully`,
  },
  emailStrings: {},
};

export default MESSAGES;
