import { User, UserContext } from '@/types/user';
import React, { createContext, useState } from 'react';

export const AppContext = createContext<UserContext>({ user: null, setUser: () => {} });

const AppProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
