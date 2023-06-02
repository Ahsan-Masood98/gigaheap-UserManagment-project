import React from "react";

import TotalUserCard from "../Components/TotalUserCard";
import { json, useLoaderData } from "react-router-dom";
import { getCurrentUserType } from "../util/auth";
import { getUsers } from "../Services/usersServices";

const AdminDashboard = () => {
  const data = useLoaderData();
  const {
    data: { users },
  } = data;

  return (
    <>
      <TotalUserCard users={users} />
    </>
  );
};

export default AdminDashboard;
export const loader = async () => {
  const userType = getCurrentUserType();
  if (userType === "1") {
    return null;
  }
  const response = await getUsers();
  if (response.statusText !== "OK") {
    throw json({ message: "Could not fetch User." }, { status: 500 });
  }
  return response;
};
