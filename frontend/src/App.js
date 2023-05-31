import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminDashboard, {
  loader as userDeatilLoader,
} from "./Pages/AdminDashboard";
import Login, { action as loginAction } from "./Pages/Login";
import Signup, { action as signUpAction } from "./Pages/Signup";
// import { loader as userDeatilLoader } from "./Components/UserDetail";
import DashboardLayout from "./Pages/DashboardLayout";
import EditUserDetail, {
  action as editUserAction,
} from "./Pages/EditUserDetail";
import { checkAuthLoader } from "./util/auth";
import ErrorPage from "./Pages/Error";
import { action as deleteUserAction } from "./Pages/DeleteUser";
// import UserContextProvider from "./context/UserAction";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      action: loginAction,
    },
    { path: "/signup", element: <Signup />, action: signUpAction },
    {
      path: "/dashboard",
      id: "uesrDetail",
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      loader: checkAuthLoader,
      children: [
        {
          path: "",
          element: <AdminDashboard />,
          loader: userDeatilLoader,
        },
        {
          path: "table",
          element: <EditUserDetail />,
          loader: userDeatilLoader,
          action: editUserAction,
        },
        {
          path: "table/:id",
          action: deleteUserAction,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
