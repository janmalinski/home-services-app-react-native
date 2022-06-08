export interface SignUpPayload {
  email: string;
  password: string;
  termsAccepted: boolean;
  latitude: number;
  longitude: number;
  userType: string;
  language: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}
