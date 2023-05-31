import { json, redirect } from "react-router-dom";

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
  const response = await fetch("http://localhost:8080/users/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw json({ message: "Could not fetch User." }, { status: 500 });
  }
  return response;
};
