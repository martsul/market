import { RequestStatus } from '../types/request-status';

export interface StatusState<T> {
  requestStatus: RequestStatus;
  data: T;
}
