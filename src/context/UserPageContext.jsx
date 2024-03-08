import { createContext, useState } from "react";

export const UserPageContext = createContext();

export function UserPageProvider({ children }) {
  const [usersPageId, setUsersPageId] = useState(null);
  const context = {
    usersPageId,
    setUsersPageId,
  };
  return (
    <UserPageContext.Provider value={context}>
      {children}
    </UserPageContext.Provider>
  );
}
