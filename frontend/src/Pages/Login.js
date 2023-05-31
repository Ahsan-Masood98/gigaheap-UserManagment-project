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

const Login = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Invalid Email"
        )
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[!@#$%^&*()-=_+{}[\]|;':",.<>/?])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-=_+{}[\]|;':",.<>/?]{8,}$/,
          `Password Must contain at least 8 charecters 1 upercase & lowercase leter & 1 special charecter`
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="container">
      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      {data && data.errors && (
                        <div>
                          {Object.values(data.errors).map((err) => (
                            <p key={err}>{err}</p>
                          ))}
                        </div>
                      )}
                      {data && data.message && <p>{data.message}</p>}
                    </div>
                    <Form method="post" action="/" className="user">
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
                      <div className="form-group">
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

                      {/* <Link
                        to={"/dashboard"}
                        className="btn btn-primary btn-user btn-block"
                      >
                        Login
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
                      <Link className="small" to={"/signup"}>
                        Create an Account!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const formData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("http://localhost:8080/login", {
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
  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);
  localStorage.setItem("id", resData.user.id);
  localStorage.setItem("userType", resData.user.userType);
  return redirect("/dashboard");
};
