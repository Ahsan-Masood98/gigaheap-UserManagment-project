import { redirect, json } from "react-router-dom";
import { deleteUser } from "../Services/usersServices";
import { toast } from "react-toastify";

export async function action({ params, request }) {
  const id = params.id;
  try {
    const response = await deleteUser(id);
    if (response.statusText !== "OK") {
      throw json({ message: "Could not Delete User." }, { status: 500 });
    }
    toast.success(response.data.message);
  } catch (error) {
    toast.error(`${error.response.data.message} ${error.message}`);
  }

  return redirect("/dashboard/table");
}
