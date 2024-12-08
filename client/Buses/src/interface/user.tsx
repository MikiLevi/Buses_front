export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "driver" | "admin" | "passenger";
}
