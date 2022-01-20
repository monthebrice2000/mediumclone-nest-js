import { Express } from 'express';
import { User } from '@models/user.interface';

export interface ExpressRequest extends Request{
  user?: User
}