import React from "react";
import { useSubmit } from "react-router-dom";

const DeleteModal = ({ id }) => {
  const submit = useSubmit();
  const deleteUserHandler = (id) => {
    submit(null, {
      method: "delete",
      action: `/dashboard/table/${id}`,
    });
  };
  return (
    <>
      {/* <!-- Logout Modal--> */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are you Sure?
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Select "Delete" below if you are sure to delete this User.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => deleteUserHandler(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
