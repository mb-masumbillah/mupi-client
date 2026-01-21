// import { getCurrentUser } from "@/services/auth";
import { getCurrentUser } from "@/services/auth";
import { IUser } from "@/types/user";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserProviderValues | undefined>(
  undefined,
);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();

    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);


  //   useEffect(() => {
  //   const fetchProfile = async () => {
  //     const data = await getRefreshTokenToAccessToken();
  //     setProfile(data);
  //   };
  //   fetchProfile();
  // }, []);

  const userInfo = {
    user,
    isLoading,
    setUser,
    setIsLoading,
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
