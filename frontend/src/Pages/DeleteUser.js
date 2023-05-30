import { redirect, json } from "react-router-dom";
import { getAuthToken } from "../util/auth";

export async function action({ params, request }) {
  const id = params.id;
  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/users/" + id, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete user." },
      {
        status: 500,
      }
    );
  }
  return redirect("/dashboard/table");
}
