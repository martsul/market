type RequestStatus = 'idle' | 'loading' | 'error' | 'fulfilled';

export interface StatusState<T> {
  requestStatus: RequestStatus;
  data: T;
}
