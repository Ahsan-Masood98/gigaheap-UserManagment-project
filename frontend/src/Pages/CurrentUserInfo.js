import React from "react";

const CurrentUserInfo = ({ data }) => {
  const { firstName, lastName, userType, isActive, email, DT } = data.user;
  return (
    <div>
      <div class="card" style={{ width: "25rem" }}>
        <div class="card-body">
          <h5 class="card-title">
            {firstName} {lastName}
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">
            {userType === "0" ? "Admin" : "User"}
          </h6>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Email: {email}</li>
            <li class="list-group-item">
              isActive: {isActive ? "true" : "false"}
            </li>
            <li class="list-group-item">Registeration Date: {DT}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserInfo;
