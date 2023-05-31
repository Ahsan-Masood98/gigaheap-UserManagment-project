import React from "react";

const CurrentUserInfo = ({ data }) => {
  const { firstName, lastName, userType, isActive, email, DT } = data.user;
  return (
    <div>
      <div className="card" style={{ width: "25rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            {firstName} {lastName}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {userType === "0" ? "Admin" : "User"}
          </h6>
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
  );
};

export default CurrentUserInfo;
