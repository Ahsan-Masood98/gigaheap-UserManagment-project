import http from "./httpService";
import config from "../util/config.json";
import { getAuthToken } from "../util/auth";

const apiEndpoint = config.apiUrl + "/users";
export function getUsers() {
  return http.get(apiEndpoint, {
    headers: { Authorization: "Bearer " + getAuthToken() },
  });
}

export function deleteUser(userId) {
  return http.delete(apiEndpoint + "/" + userId, {
    headers: { Authorization: "Bearer " + getAuthToken() },
  });
}

export function getCurrUser(userId) {
  return http.get(apiEndpoint + "/" + userId, {
    headers: { Authorization: "Bearer " + getAuthToken() },
  });
}

export function editUser(user, userId) {
  return http.patch(
    apiEndpoint + "/" + userId,
    { ...user },
    {
      headers: { Authorization: "Bearer " + getAuthToken() },
    }
  );
}
