import { createContext } from "react";
import { getAuthToken } from "../util/auth";

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
  const deleteUser = async (id) => {
    try {
      const token = getAuthToken();
      const response = await fetch("http://localhosr:8080/users/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
    } catch (error) {
      console.log("Error From removeFromFavourites ", error.messsage);
    }
  };
  const editUser = async (id) => {
    const token = getAuthToken();
    const response = await fetch("http://localhosr:8080/users/" + id, {
      method: "PTACH",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  const context = {
    deleteUser,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
