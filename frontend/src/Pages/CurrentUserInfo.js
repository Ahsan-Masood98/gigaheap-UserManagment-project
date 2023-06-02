import React from "react";

const CurrentUserInfo = ({ user }) => {
  const { firstName, lastName, userType, isActive, email, DT } = user;
  return (
    <div>
      <div style={{ width: "50%" }}>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              {firstName} {lastName}
            </h6>
            <br />
            <h6 className="card-subtitle mb-2 text-muted">
              {userType === "0" ? "Admin" : "User"}
            </h6>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Email: {email}</li>
              <li className="list-group-item">
                isActive: {isActive ? "true" : "false"}
              </li>
              <li className="list-group-item">Registeration Date: {DT}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserInfo;
