import { RegisterUser } from './register-user.model';
import { Role } from './role.model';

export interface User extends RegisterUser {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
  currentCreation: string;
}
