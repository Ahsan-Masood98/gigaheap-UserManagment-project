import React from "react";
import { json, redirect, useLoaderData, useSubmit } from "react-router-dom";
import EditModal from "../Components/EditModal";
import { getAuthToken } from "../util/auth";

const UserDetail = () => {
  const data = useLoaderData();
  const submit = useSubmit();
  const deleteUserHandler = (id) => {
    submit(null, {
      method: "delete",
      action: `/dashboard/table/${id}`,
    });
  };
  return (
    <div>
      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-10">
          {/* <!-- DataTales Example --> */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">User Detail</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>User Type</th>
                      <th>isActive</th>
                      <th>Date time of registeration</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>User Type</th>
                      <th>isActive</th>
                      <th>Date time of registeration</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {data.users.map((data) => (
                      <tr key={data.id}>
                        <td>{data.firstName} </td>
                        <td>{data.lastName} </td>
                        <td>{data.email} </td>
                        <td>
                          {data.userType === "1" ? "Regular User" : "Admin"}
                        </td>
                        <td>{data.isActive ? "true" : "flase"} </td>
                        <td>{data.DT} </td>
                        <td>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              className="btn btn-success"
                              data-toggle="modal"
                              data-target={`#exampleModalCenter${data.id}`}
                            >
                              Edit
                            </button>
                            <EditModal user={data} />

                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => deleteUserHandler(data.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const id = data.get("id");
  const isActive = data.get("isActive") === "0" ? false : true;
  const updateForm = {
    id: data.get("id"),
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    userType: data.get("userType"),
    isActive: isActive,
    DT: data.get("DT"),
  };

  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/users/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(updateForm),
  });
  if (response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }
  return redirect("/dashboard/table");
};
