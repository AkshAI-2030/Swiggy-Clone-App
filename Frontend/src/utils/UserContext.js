import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "",
  setLoggedInUser: () => {},
});

export default UserContext;
