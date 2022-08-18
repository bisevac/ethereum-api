import { HttpStatus } from '@nestjs/common';

export interface IAPIResponseBase<T> {
  error: boolean;
  message: string[] | string;
  statusCode: HttpStatus;
  errorCode: string;
  data: T | any;
  timestamp: string;
}

export class ApiResponse<T> implements IAPIResponseBase<T> {
  public error = false;
  public message = 'OK';
  public statusCode: number = HttpStatus.OK;
  public errorCode: string = null;
  public data: T = null;
  public timestamp = new Date().toISOString();

  constructor(data: T) {
    this.data = data;
  }

  toJSON(): IAPIResponseBase<T> {
    return {
      error: this.error,
      message: this.message,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      data: this.data,
      timestamp: this.timestamp,
    };
  }
}
