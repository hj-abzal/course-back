export interface User {
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  role: "teacher" | "student"
}