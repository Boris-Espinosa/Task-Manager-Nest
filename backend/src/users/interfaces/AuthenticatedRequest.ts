import { Request } from 'express';
import { ClientUser } from './clientUser';

export interface AuthenticatedRequest {
  request: Request;
  clientUser: ClientUser
}
