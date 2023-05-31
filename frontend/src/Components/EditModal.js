import React from "react";
import { Form, useNavigation } from "react-router-dom";

const EditModal = ({ user }) => {
  const { firstName, lastName, id, userType, isActive, email, DT } = user;
  //   console.log(user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <div
        className="modal fade"
        id={`exampleModalCenter${id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit User
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form method="PATCH" action="/dashboard/table" className="user">
                <div className="form-group">
                  <label htmlFor="id">Id</label>
                  <input
                    id="id"
                    name="id"
                    className="form-control"
                    type="text"
                    defaultValue={id}
                    readOnly
                  />
                </div>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        type="text"
                        defaultValue={firstName}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        type="text"
                        defaultValue={lastName}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Emial</label>
                  <input
                    id="email"
                    name="email"
                    className="form-control"
                    type="text"
                    defaultValue={email}
                    readOnly
                  />
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="userType">User Type</label>
                      <select
                        className="form-control"
                        id="userType"
                        name="userType"
                        defaultValue={userType}
                      >
                        <option value="">User Type</option>
                        <option value="1">User</option>
                        <option value="0">Admin</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="isActive">is Active</label>
                      <select
                        className="form-control"
                        id="isActive"
                        name="isActive"
                        defaultValue={isActive}
                      >
                        <option value="">isActive</option>
                        <option value="1">True</option>
                        <option value="0">False</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="DT">Date and Time of Registeration</label>
                  <input
                    id="DT"
                    name="DT"
                    className="form-control"
                    type="text"
                    defaultValue={DT}
                    readOnly
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-primary btn-user "
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-user "
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
