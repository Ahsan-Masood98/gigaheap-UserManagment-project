import React from "react";
import { json, redirect, useLoaderData } from "react-router-dom";
import EditModal from "../Components/EditModal";
import DeleteModal from "../Components/DeleteModal";
import { editUser } from "../Services/usersServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserDetail = () => {
  const data = useLoaderData();
  const {
    data: { users },
  } = data;
  return (
    <div>
      <ToastContainer />
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
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.firstName} </td>
                        <td>{user.lastName} </td>
                        <td>{user.email} </td>
                        <td>
                          {user.userType === "1" ? "Regular User" : "Admin"}
                        </td>
                        <td>{user.isActive ? "true" : "flase"} </td>
                        <td>{user.DT} </td>
                        <td>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              style={{
                                all: "unset",
                                cursor: "pointer",
                                margin: "0px 10px",
                              }}
                              className="btn btn-outline-success dropdown-item "
                              data-toggle="modal"
                              data-target={`#exampleModalCenter${user.id}`}
                            >
                              <i
                                className="far fa-edit fa-lg"
                                style={{ color: "#30bb47" }}
                              ></i>
                            </button>
                            <EditModal user={user} />

                            <button
                              style={{ all: "unset", cursor: "pointer" }}
                              className="btn btn-outline-danger dropdown-item "
                              data-toggle="modal"
                              data-target={`#deleteModal${user.id}`}
                            >
                              <i
                                className="far fa-trash-alt fa-lg"
                                style={{ color: "#f40606" }}
                              ></i>
                            </button>
                            <DeleteModal id={user.id} />
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
  const userId = data.get("id");
  const isActive = data.get("isActive") === "0" ? false : true;
  const updateForm = {
    id: data.get("id"),
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    userType: data.get("userType"),
    isActive: isActive,
    DT: data.get("DT"),
    password: data.get("password"),
  };

  try {
    const response = await editUser(updateForm, userId);
    if (response.statusText !== "OK") {
      throw json({ message: "Could not Edit User." }, { status: 500 });
    }
    toast.success(response.data.message);
  } catch (error) {
    toast.error(`${error.response.data.message} ${error.message}`);
  }
  return redirect("/dashboard/table");
};
