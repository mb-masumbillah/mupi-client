export interface IUser {
  user: string;
  role: "superAdmin" | "temporaryAdmin" | "student" | "instructor";
  email: string;
  status: "approved" | "pending";
  isDeleted: boolean;
  iat: number;
  exp: number;
}
