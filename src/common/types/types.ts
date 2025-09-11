import { ResultCode } from "../enums/enums";

export type FieldError = {
  error: string;
  field: string;
};

export type BaseResponse<T = {}> = {
  data: T;
  fieldsErrors: FieldError[];
  messages: string[];
  resultCode: ResultCode;
};