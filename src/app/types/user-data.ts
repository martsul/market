import { AuthResponse } from '../interfaces/auth-response';

export type UserData = Omit<AuthResponse, 'accessToken' | 'refreshToken'>;
