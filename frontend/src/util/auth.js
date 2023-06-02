import { redirect } from "react-router-dom";
import { getCurrUser } from "../Services/usersServices";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}
export function getCurrentUserId() {
  const id = localStorage.getItem("id");
  return id;
}
export function getCurrentUserType() {
  const userType = localStorage.getItem("userType");
  return userType;
}

export const checkAuthLoader = async () => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/");
  }
  const id = getCurrentUserId();
  const response = await getCurrUser(id);

  return response;
};
