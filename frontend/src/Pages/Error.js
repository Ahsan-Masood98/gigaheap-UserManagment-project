import React from "react";
import { useRouteError } from "react-router-dom";
import PageContent from "../Components/PageContent";

const ErrorPage = () => {
  const error = useRouteError();
  console.log("error in Error Page ", error);
  let title = "An error Occoured!!";
  let message = "Something Went Wrong!!";
  if (error.response?.status === 500) {
    message = error.data.message;
  }
  if (error.response?.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }
  return (
    <div>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </div>
  );
};

export default ErrorPage;
