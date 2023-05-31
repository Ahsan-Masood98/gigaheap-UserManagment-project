import React from "react";

import TotalUserCard from "../Components/TotalUserCard";
import { json, useLoaderData } from "react-router-dom";
import { getAuthToken, getCurrentUserType } from "../util/auth";

const AdminDashboard = () => {
  const data = useLoaderData();
  return (
    <>
      {/* <!-- Content Row --> */}
      <TotalUserCard data={data} />
    </>
  );
};

export default AdminDashboard;
export const loader = async () => {
  const userType = getCurrentUserType();
  if (userType === "1") {
    return null;
  }
  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/users", {
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
