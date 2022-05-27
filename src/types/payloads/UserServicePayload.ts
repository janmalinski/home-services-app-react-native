interface userService {
  id: string;
  name: string;
}

export interface UserServicePayload {
  userServices: userService[];
  description: string;
}
