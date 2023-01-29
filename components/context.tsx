import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

const AppProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState(null);

  return (
    // @ts-ignore
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
