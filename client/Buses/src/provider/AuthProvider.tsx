import { createContext, ReactNode, useState } from "react";
import { IUser } from "../interface/user";
import UseFetch from "../hook/UseFetch";
interface UserDto {
  email: string;
  password: string;
}
interface AuthContextType {
  user: IUser | null;
  login: (user: UserDto) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export default function AuthProvider({ children }: { children: ReactNode }) {
  
  const [user, setUser] = useState<IUser | null>(null);
  const { POST } = UseFetch("http://localhost:7979/auth/login");

  const login = async (user: UserDto): Promise<boolean> => {
    try {
      const res = await POST(user);
      if (!res || res.foundUser) {
        console.error("Invalid response:", res);
      }
      setUser(res.foundUser);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}
