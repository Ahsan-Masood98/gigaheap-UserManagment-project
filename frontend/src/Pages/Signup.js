/* eslint-disable no-useless-escape */
import React from "react";
import {
  Form,
  Link,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string()
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Invalid Email"
        )
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          `Password Must contain at least 8 charecters 1 upercase & lowercase leter & 1 special charecter`
        )
        .required("Required"),
      userType: Yup.string()
        .oneOf(["0", "1"], "Invalid User Type")
        .required("Required"),
    }),
  });
  return (
    <>
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* <!-- Nested Row within Card Body --> */}
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an Account!
                    </h1>
                    {data && data.errors && (
                      <div>
                        {Object.values(data.errors).map((err) => (
                          <p key={err}>{err}</p>
                        ))}
                      </div>
                    )}
                    {data && data.message && <p>{data.message}</p>}
                  </div>
                  <Form method="post" action="/signup" className="user">
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name</label>
                          <input
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                          />
                          {formik.touched.firstName &&
                            formik.errors.firstName && (
                              <div>{formik.errors.firstName}</div>
                            )}
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                          />
                          {formik.touched.lastName &&
                            formik.errors.lastName && (
                              <div>{formik.errors.lastName}</div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        className="form-control"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div>{formik.errors.email}</div>
                      )}
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          name="password"
                          className="form-control"
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <div>{formik.errors.password}</div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="userType">User Type</label>
                          <select
                            className="form-control"
                            id="userType"
                            name="userType"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userType}
                          >
                            <option value="">User Type</option>
                            <option value="1">User</option>
                            <option value="0">Admin</option>
                          </select>
                        </div>
                        {formik.touched.userType && formik.errors.userType ? (
                          <div>{formik.errors.userType}</div>
                        ) : null}
                      </div>
                    </div>
                    {/* <Link
                      to={"/login"}
                      className="btn btn-primary btn-user btn-block"
                    >
                      Register Account
                    </Link> */}

                    <button
                      className="btn btn-primary btn-user btn-block"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </Form>
                  <hr />

                  <div className="text-center">
                    <Link className="small" to="/">
                      Already have an account? Login!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const formData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    password: data.get("password"),
    userType: data.get("userType"),
    DT: new Date().toLocaleString(),
    isActive: true,
  };
  const response = await fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not register User." }, { status: 500 });
  }

  return redirect("/");
};

// export const action = async ({ request, params }) => {
//   const data = await request.formData();
//   const formData = {
//     firstName: data.get("firstName"),
//     lastName: data.get("lastName"),
//     email: data.get("email"),
//     password: data.get("password"),
//     userType: data.get("userType"),
//     DT: new Date().toLocaleString(),
//     isActive: true,
//   };
//   const response = await fetch(
//     "https://react-http-58c10-default-rtdb.firebaseio.com/users.json",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     }
//   );
//   if (!response.ok) {
//     throw json({ message: "Could not save User." }, { status: 500 });
//   }
//   return redirect("/login");
// };
