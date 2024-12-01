import { createContext, ReactNode, useEffect, useState } from "react";
import { IUser } from "../interface/UserType";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UseFetch from "../hook/UseFetch";

interface UserDTO {
  email: string;
  password: string;
}

interface AuthContextType {
  user: IUser | null;
  error: string | null;
  login: (user: UserDTO, urlPath: string) => Promise<boolean>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ Children }: { Children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { POST, VerifyToken } = UseFetch("http://localhost:5174");

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("auth_token");
    const tokenRole = Cookies.get("role");

    const verifyAndLogin = async () => {
      if (token) {
        try {
          const decodedToken = await VerifyToken();
          if (!decodedToken?.user?.email || !decodedToken?.user?.password) {
            throw new Error("Invalid token data");
          }

          const { email, password } = decodedToken.user;
          let success = false;
          try {
            const loginPath =
              tokenRole === "babysitter" ? "babysitter" : "parent";
            success = await login({ email, password }, loginPath);
          } catch (loginError) {
            console.error("Login error:", loginError);
            success = false;
          }

          if (!success) {
            handleLogout();
          }
        } catch (error) {
          console.error("Token verification error:", error);
          handleLogout();
        }
      } else {
        setUser(null);
      }
    };

    const handleLogout = () => {
      setUser(null);
      Cookies.remove("auth_token");
      Cookies.remove("role");
      navigate("/login");
    };

    verifyAndLogin();
  }, []);

  const clearError = () => setError(null);

  const login = async (
    userClient: UserDTO,
    urlPath: string
  ): Promise<boolean> => {
    try {
      clearError();

      // בניית ה-URL הנכון
      let endpoint = "auth/login";
      if (urlPath) {
        endpoint += `/${urlPath}`;
      }

      const response = await POST(endpoint, userClient);

      if (!response || !response.foundUser) {
        console.error("Invalid response:", response);
        throw new Error("Invalid response from server");
      }

      setUser(response.foundUser);

      // עדכון הקוקיז
      const role = urlPath === "babysitter" ? "babysitter" : "parent";
      Cookies.set("role", role);

      // ניווט
      navigate(`${urlPath}`);
      return true;
    } catch (error) {
      console.error("Login error details:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(`Login failed: ${errorMessage}`);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, clearError }}>
      {Children}
    </AuthContext.Provider>
  );
}