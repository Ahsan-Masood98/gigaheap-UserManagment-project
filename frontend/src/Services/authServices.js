import http from "./httpService";
import config from "../util/config.json";

const apiEndpoint = config.apiUrl;

export function postCredentials(userData, mode) {
  return http.post(
    apiEndpoint + "/" + mode,
    { ...userData },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
