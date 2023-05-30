import React from "react";
import { useRouteError } from "react-router-dom";
import PageContent from "../Components/PageContent";

const ErrorPage = () => {
  const error = useRouteError();
  let title = "An error Occoured!!";
  let message = "Something Went Wrong!!";
  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 404) {
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
