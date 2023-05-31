import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ userType }) => {
  return (
    <>
      {/* <!-- Sidebar --> */}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            SB {userType === "0" ? "Admin" : "User"}
          </div>
        </Link>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {userType === "0" && (
          <>
            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />
            {/* <!-- Heading --> */}
            <div className="sidebar-heading">Users</div>
            {/* <!-- Nav Item - Tables --> */}
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/table">
                <i className="fas fa-fw fa-table"></i>
                <span>Tables</span>
              </Link>
            </li>
            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block" />
          </>
        )}
      </ul>
      {/* <!-- End of Sidebar --> */}
    </>
  );
};

export default Sidebar;
