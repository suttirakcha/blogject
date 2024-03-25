import { ID, Models } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";

interface UserProviderProps {
  children: React.ReactNode
}

interface UserContextType {
  current: Models.Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children } : UserProviderProps) {
  const [user, setUser] = useState<Models.Session | null>(null);

  async function login(email: string, password: string) {
    const loggedIn = await account.createEmailSession(email, password);
    setUser(loggedIn);
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(email: string, password: string) {
    await account.create(ID.unique(), email, password);
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn: Models.User<Models.Preferences> = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const value: UserContextType = {
    current: user,
    login,
    logout,
    register
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
