import React from "react";
import Sidebar from "../Components/Sidebar";
import LogoutModal from "../Components/LogoutModal";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Outlet, useLoaderData } from "react-router-dom";
import CurrentUserInfo from "./CurrentUserInfo";

const DashboardLayout = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        <Sidebar />

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            {/* <!-- Topbar --> */}
            <Header />

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
              {/* <!-- Page Heading --> */}
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              </div>
              {/* <!-- Content Row --> */}
              {/* <TotalUserCard /> */}
              {/* <!-- Content Row --> */}
              <CurrentUserInfo data={data} />
              {data.user.userType === "0" && <Outlet />}
            </div>
            {/* <!-- /.container-fluid --> */}
          </div>
          {/* <!-- End of Main Content --> */}

          {/* <!-- Footer --> */}
          <Footer />
          {/* <!-- End of Footer --> */}
        </div>
        {/* <!-- End of Content Wrapper --> */}
      </div>
      {/* <!-- End of Page Wrapper --> */}

      {/* <!-- Scroll to Top Button--> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>

      {/* <!-- Logout Modal--> */}
      <LogoutModal />
    </>
  );
};

export default DashboardLayout;
